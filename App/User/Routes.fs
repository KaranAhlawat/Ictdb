module App.User.Routes

open Falco
open Falco.Routing
open App.DataSource
open App.User.Persistence
open App.User.Services
open BCrypt.Net

// Dumb composition roots
let GetUserLogout: HttpHandler = Handlers.handleUserLogout

let GetAccountView = Handlers.handleAccountView

let GetLoginView = Handlers.handleLoginView

let GetRegisterView = Handlers.handleRegisterView

let PostUserRegister: HttpHandler =
    fun ctx ->
        let f = ctx.Plug<CtxFactory>()
        Handlers.handleUserRegistration (UserRepo.Add f) BCrypt.EnhancedHashPassword ctx

let PostUserLogin: HttpHandler =
    fun ctx ->
        let f = ctx.Plug<CtxFactory>()
        Handlers.handleUserLogin (UserRepo.OfUsername f) (UserService.ValidateCredentials BCrypt.EnhancedVerify) ctx


let routes =
    [ all "/user/register" [ GET, GetRegisterView; POST, PostUserRegister ]
      all "/user/login" [ GET, GetLoginView; POST, PostUserLogin ]
      get "/user/logout" GetUserLogout
      get "/user/account" GetAccountView ]
