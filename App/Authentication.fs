module App.Authentication

open System.Security.Claims
open System.Text.Json
open System.Threading.Tasks
open App.Generated.Db.``public``
open App.Utils
open Falco
open Microsoft.AspNetCore.Authentication.Cookies
open Microsoft.AspNetCore.Http
open System.Linq


[<RequireQualifiedAccess>]
module CookieSession =
    let private scheme = CookieAuthenticationDefaults.AuthenticationScheme

    let authenticateResult onSuccess onFailure =
        Request.authenticate scheme (fun result -> if result.Succeeded then onSuccess result else onFailure)

    let authenticate onSuccess onFailure =
        Request.authenticate scheme (fun result -> if result.Succeeded then onSuccess else onFailure)

    let challengeTo uri =
        Response.challengeAndRedirect scheme uri

    let signIn claims ctx = Response.signIn scheme claims ctx

    let signOut ctx = Response.signOut scheme ctx

    let account (ctx: HttpContext) =
        let claim = ctx.User.Claims.First(Func.from (fun c -> c.Type = ClaimTypes.UserData))

        if isNull claim then
            None
        else
            let json = claim.Value
            Some(JsonSerializer.Deserialize<account> json)
