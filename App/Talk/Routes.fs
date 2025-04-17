module App.Talk.Routes

open App.DataSource
open App.Talk.Persistence
open Falco
open Falco.Routing

let GetHomepageView = Handlers.handleHomepageView
let GetNewTalkView = Handlers.handleNewTalkPage

let PostCreateNewTalk: HttpHandler =
    fun ctx ->
        let f = ctx.Plug<CtxFactory>()
        Handlers.handleCreateNewTalk (TalkRepo.Add f) ctx

let routes =
    [ get "/" GetHomepageView
      all "/talk/new" [ GET, GetNewTalkView; POST, PostCreateNewTalk ] ]
