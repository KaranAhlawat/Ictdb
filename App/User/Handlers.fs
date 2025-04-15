module App.User.Handlers

open System
open System.Threading.Tasks
open App.Utils
open Falco

open App.Generated.Db.``public``
open Microsoft.Extensions.Logging

type private UserRegistrationRequest = { Username: string; Password: string }

let private handleInvalid: HttpHandler =
    Response.withStatusCode 400 >> Response.ofEmpty

let handleRegisterView: HttpHandler = Response.ofHtmlCsrf Views.register

let handleLoginView: HttpHandler = Response.ofHtmlCsrf Views.login

let handleUserRegistration registerUser : HttpHandler =
    fun ctx ->
        task {
            let! form = Request.getFormSecure ctx

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

            let guidTask = Option.map registerUser user

            match guidTask with
            | None -> return! handleInvalid ctx
            | Some idTask ->
                let! id = idTask
                return! Response.ofJson id ctx
        }

let handleUserLogin (findUser: Guid -> users option Task) : HttpHandler =
    fun ctx ->
        let id = "ac07881a-6851-44fa-af3f-dea3e9437d8a"
        let logger = ctx |> Logger.get (Logger.Named "handleUserLogin")

        task {
            logger.LogInformation("Finding user for ID {ID}", id)

            let! user = Guid.Parse id |> findUser

            logger.LogInformation("Found {User}", user)

            return!
                (match user with
                 | None -> handleInvalid
                 | Some value -> Response.ofJson value)
                    ctx
        }
