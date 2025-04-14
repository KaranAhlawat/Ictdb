module App.DataSource

open System.Threading.Tasks
open App.Generated.Db.``public``
open Npgsql
open SqlHydra.Query

type IConnFactory =
    abstract member OpenConn: unit -> ValueTask<NpgsqlConnection>

type NpgsqlConnFactory(connString: string) =
    let dataSource =
        let builder = NpgsqlDataSourceBuilder(connString)
        builder.MapEnum<user_origin>("public.user_origin") |> ignore
        builder.Build()

    interface IConnFactory with
        member _.OpenConn() = dataSource.OpenConnectionAsync()

let openCtx conn () =
    let compiler = SqlKata.Compilers.PostgresCompiler()
    new QueryContext(conn, compiler)
