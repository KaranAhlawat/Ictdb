module App.User.Persistence

open System
open System.Threading.Tasks
open App.DataSource

open SqlHydra.Query
open App.Generated.Db.``public``
open App.Generated.Db.HydraBuilders

type UserRepo =
    { add: users -> Guid Task
      whereId: Guid -> users option Task
      remove: Guid -> bool Task }

module UserRepo =
    module Live =
        let mk (f: CtxFactory) =
            { add =
                fun user ->
                    task {
                        return!
                            insertTask f.openCtx {
                                for u in users do
                                    entity user
                                    getId u.id
                                    excludeColumn u.created_at
                                    excludeColumn u.updated_at
                            }
                    }

              whereId =
                fun id ->
                    task {
                        return!
                            selectTask f.openCtx {
                                for u in users do
                                    where (u.id = id)
                                    select u
                                    tryHead
                            }
                    }

              remove =
                fun id ->
                    task {
                        let! count =
                            deleteTask f.openCtx {
                                for u in users do
                                    where (u.id = id)
                            }

                        return count = 1
                    } }
