module App.Talk.Handlers

open System
open App.Authentication
open App.Generated.Db.``public``
open App.Utils
open Falco

let handleHomepageView: HttpHandler =
    let success = Response.ofHtml Views.homepage
    let failure = CookieSession.challengeTo "/"
    CookieSession.authenticate success failure

let handleNewTalkPage: HttpHandler =
    CookieSession.authenticate (Response.ofHtmlCsrf Views.newTalk) (CookieSession.challengeTo "/")

let handleCreateNewTalk save : HttpHandler =
    fun ctx ->
        task {
            let! form = Request.getFormSecure ctx
            let acc = CookieSession.account ctx

            let! res =
                form
                |> Option.bind (fun f ->
                    let title = f.GetString "title"
                    let link = f.GetString "link"

                    acc
                    |> Option.map (fun a ->
                        { id = Guid()
                          account_id = a.id
                          name = title
                          link = link
                          description = None
                          organizer = None
                          speaker = None
                          tags = None
                          created_at = DateTime.Now
                          updated_at = DateTime.Now }))
                |> TaskOption.traverse (fun t ->
                    task {
                        let! _ = save t
                        return t
                    })

            match res with
            | None -> return! Response.redirectTemporarily "/talk/new?error=bad_req" ctx
            | Some _ -> return! Response.redirectTemporarily "/" ctx
        }
