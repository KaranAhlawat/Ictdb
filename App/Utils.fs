module App.Utils

open System

[<RequireQualifiedAccess>]
module Func =
    let from (fn: 'a -> 'b) = Func<'a, 'b>(fn)
