open Falco
open Microsoft.AspNetCore.Builder
open Microsoft.Extensions.Configuration
open Microsoft.Extensions.DependencyInjection
open App
open App.User.Service
open App.DataSource

let builder = WebApplication.CreateBuilder()

builder.Services.AddAntiforgery() |> ignore

builder.Services.AddSingleton<IConnFactory>(NpgsqlConnFactory(builder.Configuration.GetConnectionString("Docker")))
|> ignore

builder.Services.AddScoped<IUserRepo, UserRepoLive>() |> ignore
builder.Services.AddScoped<IUserService, UserServiceLive>() |> ignore

let app = builder.Build()

app.UseAntiforgery() |> ignore

app.UseRouting().UseFalco(Endpoints.all).Run(Response.ofPlainText "Not found")
