module App.User.Persistence

open App.DataSource

open SqlHydra.Query
open App.Generated.Db.``public``
open App.Generated.Db.HydraBuilders

[<RequireQualifiedAccess>]
module UserRepo =
    let Add ctxf details =
        task {
            return!
                insertTask ctxf.openCtx {
                    for a in account do
                        entity details
                        getId a.id
                        excludeColumn a.created_at
                        excludeColumn a.updated_at
                }
        }

    let OfId ctxf id =
        task {
            return!
                selectTask ctxf.openCtx {
                    for a in account do
                        where (a.id = id)
                        select a
                        tryHead
                }
        }

    let OfUsername ctxf username =
        task {
            return!
                selectTask ctxf.openCtx {
                    for a in account do
                        where (a.username = username)
                        select a
                        tryHead
                }
        }

    let Remove ctxf id =
        task {
            let! count =
                deleteTask ctxf.openCtx {
                    for a in account do
                        where (a.id = id)
                }

            return count = 1
        }
