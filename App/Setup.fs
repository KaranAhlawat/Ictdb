module App.Setup

open Falco
open App.DataSource
open App.User.Services
open App.Utils
open Microsoft.AspNetCore.Builder
open Microsoft.Extensions.DependencyInjection

let configureBuilder (builder: WebApplicationBuilder) =
    builder.Services.AddAntiforgery() |> ignore

    builder.Services.AddSingleton<IConnFactory>(Func.from (NpgsqlConnFactory.make))
    |> ignore

    builder.Services.AddSingleton<UserRepo.T>(Func.from (UserRepo.Live.fromDI))
    |> ignore

    builder.Services.AddScoped<UserService.T>(Func.from (UserService.Live.fromDI))
    |> ignore

    builder.Build()

let configureApp (app: WebApplication) =
    app.UseAntiforgery() |> ignore
    app.UseRouting() |> ignore
    app.UseFalco(Endpoints.all) |> ignore

    app
