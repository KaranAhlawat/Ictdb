module App.User.Routes

open App.User.Services
open Falco
open Falco.Routing

let routes =
    [ all "/user/register" [ GET, Handlers.handleRegisterView; POST, Handlers.handleUserRegistration ]
      all "/user/login" [ GET, Handlers.handleLoginView; POST, Handlers.handleUserLogin ]
      get "/user/logout" Handlers.handleUserLogout
      get "/user/account" Handlers.handleAccountView ]
