module App.Setup

open System
open Falco
open App.DataSource
open Microsoft.AspNetCore.Authentication.Cookies
open Microsoft.AspNetCore.Builder
open Microsoft.Extensions.Configuration
open Microsoft.Extensions.DependencyInjection

let configureApp (builder: WebApplicationBuilder) =

    // Configure services, repositories, any other infra and endpoints
    let connString = builder.Configuration.GetConnectionString "Docker"

    let contextFactory = NpgsqlCtxFactory.make connString

    // Add any ASP.NET stuff
    builder.Services.AddSingleton<CtxFactory>(contextFactory) |> ignore
    builder.Services.AddAntiforgery() |> ignore

    builder.Services
        .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
        .AddCookie(fun opts ->
            opts.Cookie.MaxAge <- TimeSpan.FromHours(1)
            opts.LoginPath <- "/user/login")
    |> ignore

    let app = builder.Build()

    app.UseHttpsRedirection() |> ignore
    app.UseStaticFiles() |> ignore
    app.UseAntiforgery() |> ignore
    app.UseAuthentication() |> ignore
    app.UseRouting() |> ignore
    app.UseFalco(Endpoints.all) |> ignore

    app
