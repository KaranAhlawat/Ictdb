module App.Authentication

open Falco
open Microsoft.AspNetCore.Authentication.Cookies


[<RequireQualifiedAccess>]
module CookieSession =
    let private scheme = CookieAuthenticationDefaults.AuthenticationScheme

    let authenticate f = Request.authenticate scheme f

    let challengeTo uri =
        Response.challengeAndRedirect scheme uri

    let signIn claims ctx = Response.signIn scheme claims ctx

    let signOut ctx = Response.signOut scheme ctx
