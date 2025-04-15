open Falco
open Microsoft.AspNetCore.Builder
open App

let app = WebApplication.CreateBuilder() |> Setup.configureApp

app.Run(Response.ofPlainText "Not found")
