module App.DataSource

open System
open System.Threading.Tasks
open App.Generated.Db.``public``
open Microsoft.Extensions.Configuration
open Microsoft.Extensions.DependencyInjection
open Npgsql
open SqlHydra.Query

type IConnFactory =
    abstract member OpenConn: unit -> NpgsqlConnection ValueTask

type NpgsqlConnFactory(connString: string) =
    let dataSource =
        let builder = NpgsqlDataSourceBuilder(connString)
        builder.MapEnum<user_origin>("public.user_origin") |> ignore
        builder.Build()

    interface IConnFactory with
        member _.OpenConn() = dataSource.OpenConnectionAsync()

module NpgsqlConnFactory =
    let make (sp: IServiceProvider) : IConnFactory =
        let config = sp.GetService<IConfiguration>()
        NpgsqlConnFactory(config.GetConnectionString("Docker"))

let openCtx conn () =
    let compiler = SqlKata.Compilers.PostgresCompiler()
    new QueryContext(conn, compiler)
