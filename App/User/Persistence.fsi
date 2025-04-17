module App.User.Persistence

open System
open System.Threading.Tasks
open App.DataSource
open App.Generated.Db.``public``

[<RequireQualifiedAccess>]
module UserRepo =
    val Add: CtxFactory -> account -> Guid Task
    val OfId: CtxFactory -> Guid -> account option Task
    val OfUsername: CtxFactory -> string -> account option Task
    val Remove: CtxFactory -> Guid -> bool Task
