module App.User.Handlers

open System
open App.DataSource
open App.User.Persistence
open App.User.Services
open App.Utils
open Falco

open App.Generated.Db.``public``

let handleRegisterView: HttpHandler =
    Request.mapQuery
        (fun q ->
            let error = q.TryGetString "error"
            Views.register error)
        Response.ofHtmlCsrf

let handleLoginView: HttpHandler =
    Request.mapQuery
        (fun q ->
            let error = q.TryGetString "error"
            Views.login error)
        Response.ofHtmlCsrf

let handleUserRegistration: HttpHandler =
    fun ctx ->
        task {
            let ctxf = ctx.Plug<CtxFactory>()

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
                        Some
                            { id = Guid()
                              provider_id = DateTime.UtcNow.ToString("o")
                              username = username
                              user_email = email
                              user_password = Some password
                              provider = account_type.form
                              created_at = DateTime.UtcNow
                              updated_at = DateTime.UtcNow })

            let! id = user |> TaskOption.traverse (UserRepo.Live.Add ctxf)

            match id with
            | Some id -> return! Response.ofJson id ctx
            | None -> return! Response.redirectTemporarily "/user/register?error=unknown" ctx
        }

let handleUserLogin: HttpHandler =
    fun ctx ->
        task {
            let ctxf = ctx.Plug<CtxFactory>()

            let! form = Request.getFormSecure ctx

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
                let! user = UserRepo.Live.OfUsername ctxf credentials.Username
                let valid = UserService.ValidateCredentials user credentials

                return!
                    match valid with
                    | InvalidCreds -> Response.redirectTemporarily "/user/login?error=invalid_creds" ctx
                    | Valid value -> Response.ofJson value ctx
        }
