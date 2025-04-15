module App.Setup

open App.User.Persistence
open App.User.Services
open Falco
open App.DataSource
open Microsoft.AspNetCore.Builder
open Microsoft.Extensions.Configuration
open Microsoft.Extensions.DependencyInjection

let configureApp (builder: WebApplicationBuilder) =

    let connString = builder.Configuration.GetConnectionString "Docker"

    let ctxf = NpgsqlCtxFactory.make connString

    let userRepo = UserRepo.Live.mk ctxf
    let userService = UserService.Live.mk userRepo

    let endpoints = Endpoints.all userService

    builder.Services.AddAntiforgery() |> ignore

    let app = builder.Build()

    app.UseHttpsRedirection() |> ignore
    app.UseAntiforgery() |> ignore
    app.UseRouting() |> ignore
    app.UseFalco(endpoints) |> ignore

    app
