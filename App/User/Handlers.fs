module App.User.Handlers

open System
open Falco
open Service

type UserRegistrationRequest = { Username: string; Password: string }

let private handleInvalid = Response.withStatusCode 400 >> Response.ofEmpty

let handleRegisterView: HttpHandler = Response.ofHtmlCsrf Views.register

let handleLoginView: HttpHandler = Response.ofHtmlCsrf Views.login

let handleUserRegistration: HttpHandler =
    fun ctx ->
        task {
            let! form = Request.getFormSecure ctx

            return!
                (match form with
                 | Some f ->
                     let password = f.GetString "password"
                     Response.ofJson password

                 | None -> handleInvalid)
                    ctx
        }

let handleUserLogin: HttpHandler =
    fun ctx ->
        task {
            let userService = ctx.Plug<IUserService>()

            let! user = userService.GetUser(Guid.Parse("ac07881a-6851-44fa-af3f-dea3e9437d8a"))

            return!
                (match user with
                 | Some value -> Response.ofJson value.UserEmail
                 | None -> handleInvalid)
                    ctx
        }
