module App.User.Routes

open App.User.Services
open Falco
open Falco.Routing

let routes (userService: UserService) =
    [ all
          "/user/register"
          [ GET, Handlers.handleRegisterView
            POST, Handlers.handleUserRegistration userService.RegisterUser ]
      all
          "/user/login"
          [ GET, Handlers.handleLoginView
            POST, Handlers.handleUserLogin userService.GetUser ] ]
