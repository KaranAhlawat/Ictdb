module App.User.Service

#nowarn 3391

open System
open System.Threading.Tasks
open App.DataSource
open App.Generated.Db.``public``
open Domain

open SqlHydra.Query
open App.Generated.Db.HydraBuilders

type IUserRepo =
    abstract member FindUserById: Guid -> Task<users option>
    abstract member InsertUser: users -> Task<Guid>

module UserRepoT =
    let insertUser (user: users) (connFactory: IConnFactory) : Task<Guid> =
        task {
            use! conn = connFactory.OpenConn()
            let ctx = openCtx conn

            return!
                insertTask ctx {
                    for u in users do
                        entity
                            { provider = user_origin.form
                              provider_id = "okay"
                              user_email = "mama"
                              user_password = Some "huh"
                              username = "okay2"

                              id = new Guid()
                              created_at = DateTime.Now
                              updated_at = DateTime.Now }

                        getId u.id
                        excludeColumn u.created_at
                        excludeColumn u.updated_at
                }
        }

    let findUserById (id: Guid) (connFactory: IConnFactory) : Task<users option> =
        task {
            use! conn = connFactory.OpenConn()
            let ctx = openCtx conn

            return!
                selectTask ctx {
                    for u in users do
                        where (u.id = id)
                        select u
                        tryHead
                }
        }

type UserRepoLive(connFactory: IConnFactory) =
    interface IUserRepo with
        member _.InsertUser user =
            task {
                use! conn = connFactory.OpenConn()
                let ctx = openCtx conn

                return!
                    insertTask ctx {
                        for u in users do
                            entity
                                { provider = user_origin.form
                                  provider_id = "okay"
                                  user_email = "mama"
                                  user_password = Some "huh"
                                  username = "okay2"

                                  id = new Guid()
                                  created_at = DateTime.Now
                                  updated_at = DateTime.Now }

                            getId u.id
                            excludeColumn u.created_at
                            excludeColumn u.updated_at
                    }
            }

        member _.FindUserById id =
            task {
                use! conn = connFactory.OpenConn()
                let ctx = openCtx conn

                return!
                    selectTask ctx {
                        for u in users do
                            where (u.id = id)
                            select u
                            tryHead
                    }
            }

type IUserService =
    abstract member GetUser: Guid -> Task<User option>

type UserServiceLive(userRepo: IUserRepo) =
    interface IUserService with
        member _.GetUser id =
            task {
                let! dbUser = userRepo.FindUserById id

                return
                    Option.map
                        (fun u ->
                            { Id = u.id
                              CreatedAt = u.created_at
                              UpdatedAt = u.updated_at
                              Provider =
                                match u.provider with
                                | user_origin.form -> Form
                                | user_origin.google -> Google
                                | _ -> raise (ArgumentException "Invalid provider retrieved from database")
                              ProviderId = u.provider_id
                              UserEmail = u.user_email
                              Username = u.username
                              UserPassword = u.user_password })
                        dbUser
            }
