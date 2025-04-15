open Falco
open Microsoft.AspNetCore.Builder
open App

let app =
    WebApplication.CreateBuilder() |> Setup.configureBuilder |> Setup.configureApp

app.Run(Response.ofPlainText "Not found")
