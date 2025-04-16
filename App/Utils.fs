module App.Utils

open Falco
open System
open Microsoft.AspNetCore.Http
open Microsoft.Extensions.Logging

[<RequireQualifiedAccess>]
module Func =
    let from (fn: 'a -> 'b) = Func<'a, 'b>(fn)

[<RequireQualifiedAccess>]
module Logger =
    type T =
        | Named of string
        | Default

    let get kind (ctx: HttpContext) =
        let factory = ctx.Plug<ILoggerFactory>()

        match kind with
        | Named name -> factory.CreateLogger name
        | Default -> factory.CreateLogger "App.Utils.Default"

[<RequireQualifiedAccess>]
module TaskOption =
    let traverse fn opt =
        match opt with
        | None -> task { return None }
        | Some x ->
            task {
                let! x' = fn x
                return Some x'
            }