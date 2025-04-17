module App.DataSource

open System.Threading.Tasks
open App.Generated.Db.``public``
open Npgsql
open SqlHydra.Query

type CtxFactory = { openCtx: unit -> QueryContext Task }

module NpgsqlCtxFactory =
    let make connString : CtxFactory =
        let dataSource =
            let builder = NpgsqlDataSourceBuilder(connString)
            builder.MapEnum<account_type>("public.account_type") |> ignore
            builder.Build()

        let compiler = SqlKata.Compilers.PostgresCompiler()

        let openCtx () =
            task {
                let! conn = dataSource.OpenConnectionAsync()

                let ctx = new QueryContext(conn, compiler)
#if DEBUG
                ctx.Logger <- printfn "SQL: %O"
#endif

                return ctx
            }

        { openCtx = openCtx }
