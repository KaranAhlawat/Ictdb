module App.User.Handlers

open System
open System.Security.Claims
open System.Text.Json
open App.Authentication
open App.User.Services
open App.Utils
open Falco

open App.Generated.Db.``public``
open Microsoft.AspNetCore.Authentication.Cookies

let handleRegisterView: HttpHandler =
    CookieSession.authenticate (fun result ->
        if result.Succeeded then
            Response.redirectTemporarily "/user/account"
        else
            Request.mapQuery
                (fun q ->
                    let error = q.TryGetString "error"
                    Views.register error)
                Response.ofHtmlCsrf)

let handleLoginView: HttpHandler =
    CookieSession.authenticate (fun result ->
        if result.Succeeded then
            Response.redirectTemporarily "/user/account"
        else
            Request.mapQuery
                (fun q ->
                    let error = q.TryGetString "error"
                    Views.login error)
                Response.ofHtmlCsrf)

let handleAccountView: HttpHandler =
    CookieSession.authenticate (fun result ctx ->
        if result.Succeeded then
            let account = CookieSession.account ctx

            match account with
            | None -> CookieSession.challengeTo "/user/account" ctx
            | Some value -> Response.ofHtml (Views.userAccount value) ctx
        else
            CookieSession.challengeTo "/user/account" ctx)

let handleUserRegistration save hash: HttpHandler =
    fun ctx ->
        task {
            let! form = Request.getFormSecure ctx

            let user =
                form
                |> Option.bind (fun f ->
                    let username = f.GetString "username"
                    let email = f.GetString "email"
                    let password = f.GetString "password"
                    let confirmPass = f.GetString "confirm-password"

                    let confirmed =
                        String.Compare(password, confirmPass, StringComparison.OrdinalIgnoreCase)

                    if confirmed <> 0 then
                        None
                    else
                        let hashedPass = hash password

                        Some
                            { id = Guid()
                              provider_id = DateTime.UtcNow.ToString "o"
                              username = username
                              user_email = email
                              user_password = Some hashedPass
                              provider = account_type.form
                              created_at = DateTime.UtcNow
                              updated_at = DateTime.UtcNow })

            let! account =
                user
                |> TaskOption.traverse (fun u ->
                    task {
                        let! _ = save u
                        return u
                    })

            match account with
            | Some account ->
                let json = JsonSerializer.Serialize account

                let claims =
                    [ Claim(ClaimTypes.Name, account.username)
                      Claim(ClaimTypes.Email, account.user_email)
                      Claim(ClaimTypes.UserData, json) ]

                let identity =
                    ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme)

                let claims = ClaimsPrincipal(identity)

                do! CookieSession.signIn claims ctx

                return! Response.redirectTemporarily "/user/account" ctx
            | None -> return! Response.redirectTemporarily "/user/register?error=unknown" ctx
        }

let handleUserLogin find verify: HttpHandler =
    fun ctx ->
        task {
            let! form = Request.getFormSecure ctx
            let q = Request.getQuery ctx
            let returnUri = q.TryGetString "returnUrl"

            let credentials =
                form
                |> Option.map (fun f ->

                    let username = f.GetString "username"
                    let password = f.GetString "password"

                    { Username = username
                      Password = password })

            match credentials with
            | None -> return! Response.redirectTemporarily "/user/login" ctx
            | Some credentials ->
                let! user = find credentials.Username
                let valid = verify user credentials

                match valid with
                | InvalidCreds -> return! Response.redirectTemporarily "/user/login?error=invalid_creds" ctx
                | Valid account ->
                    let json = JsonSerializer.Serialize account

                    let claims =
                        [ Claim(ClaimTypes.Name, account.username)
                          Claim(ClaimTypes.Email, account.user_email)
                          Claim(ClaimTypes.UserData, json) ]

                    let identity =
                        ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme)

                    let claims = ClaimsPrincipal(identity)

                    do! CookieSession.signIn claims ctx

                    return! Response.redirectTemporarily (Option.defaultValue "/user/account" returnUri) ctx
        }

let handleUserLogout: HttpHandler =
    CookieSession.authenticate (fun result ctx ->
        task {
            if result.Succeeded then
                do! CookieSession.signOut ctx
            else
                ()

            return! Response.redirectTemporarily "/user/login" ctx
        })
