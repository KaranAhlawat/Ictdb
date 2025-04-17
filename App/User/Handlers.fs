module App.User.Handlers

open System
open System.Security.Claims
open System.Text.Json
open System.Threading.Tasks
open App.Authentication
open App.User.Services
open App.Utils
open Falco

open App.Generated.Db.``public``
open Microsoft.AspNetCore.Authentication.Cookies

let handleRegisterView: HttpHandler =
    let proceed =
        Request.mapQuery
            (fun q ->
                let error = q.TryGetString "error"
                Views.register error)
            Response.ofHtmlCsrf

    CookieSession.authenticate (Response.redirectTemporarily "/user/account") proceed

let handleLoginView: HttpHandler =
    let proceed =
        Request.mapQuery
            (fun q ->
                let error = q.TryGetString "error"
                Views.login error)
            Response.ofHtmlCsrf

    CookieSession.authenticate (Response.redirectTemporarily "/user/account") proceed

let handleAccountView: HttpHandler =
    let success ctx =
        let account = CookieSession.account ctx

        match account with
        | None -> CookieSession.challengeTo "/user/account" ctx
        | Some value -> Response.ofHtml (Views.userAccount value) ctx

    CookieSession.authenticate success (CookieSession.challengeTo "/user/account")

let handleUserRegistration save hasher : HttpHandler =
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
                        let hashedPass = hasher password

                        Some
                            { id = Guid.Empty
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
                        let! id = save u
                        return { u with id = id }
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

let handleUserLogin find verify : HttpHandler =
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
    let redirect = Response.redirectTemporarily "/user/login"

    let success ctx =
        task {
            do! CookieSession.signOut ctx
            return! redirect ctx
        }
        :> Task // Not sure why it doesn't compile without this

    CookieSession.authenticate success redirect
