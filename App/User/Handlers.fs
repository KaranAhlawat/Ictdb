module App.User.Handlers

open System
open Falco
open Services

open App.Generated.Db.``public``

type private UserRegistrationRequest = { Username: string; Password: string }

let private handleInvalid: HttpHandler =
    Response.withStatusCode 400 >> Response.ofEmpty

let handleRegisterView: HttpHandler = Response.ofHtmlCsrf Views.register

let handleLoginView: HttpHandler = Response.ofHtmlCsrf Views.login

let handleUserRegistration: HttpHandler =
    fun ctx ->
        task {
            let! form = Request.getFormSecure ctx
            let userService = ctx.Plug<UserService.T>()

            let user =
                form
                |> Option.map (fun f ->
                    let username = f.GetString "username"
                    let password = f.GetString "password"

                    { id = Guid()
                      provider_id = "ok"
                      username = username
                      user_email = username
                      user_password = Some password
                      provider = user_origin.form
                      created_at = DateTime.UtcNow
                      updated_at = DateTime.UtcNow })

            let guidTask = user |> Option.map userService.registerUser

            match guidTask with
            | None -> return! handleInvalid ctx
            | Some idTask ->
                let! id = idTask
                return! Response.ofJson id ctx
        }

let handleUserLogin: HttpHandler =
    fun ctx ->
        task {
            let userService = ctx.Plug<UserService.T>()

            let! user = userService.getUser (Guid.Parse("ac07881a-6851-44fa-af3f-dea3e9437d8a"))

            return!
                (match user with
                 | None -> handleInvalid
                 | Some value -> Response.ofJson value)
                    ctx
        }
