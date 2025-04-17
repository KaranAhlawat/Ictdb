module App.Talk.Persistence

open App.DataSource
open App.Generated.Db.``public``
open SqlHydra.Query

[<RequireQualifiedAccess>]
module TalkRepo =
    let Add ctxf talkDetails =
        task {
            return!
                insertTask ctxf.openCtx {
                    for t in talk do
                        entity talkDetails
                        getId t.id
                        excludeColumn t.created_at
                        excludeColumn t.updated_at
                }
        }
