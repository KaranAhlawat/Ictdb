module App.User.Services

open System
open System.Threading.Tasks
open App.DataSource
open App.Generated.Db.``public``

open Microsoft.Extensions.DependencyInjection
open SqlHydra.Query
open App.Generated.Db.HydraBuilders

module UserRepo =
    type T =
        { insertUser: users -> Guid Task
          findUserById: Guid -> users option Task }

    module Live =
        let private insertUser (connFactory: IConnFactory) (user: users) : Guid Task =
            task {
                use! conn = connFactory.OpenConn()
                let ctx = openCtx conn

                return!
                    insertTask ctx {
                        for u in users do
                            entity user
                            getId u.id
                            excludeColumn u.created_at
                            excludeColumn u.updated_at
                    }
            }

        let private findUserById (connFactory: IConnFactory) (id: Guid) : users option Task =
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

        let live (connFactory: IConnFactory) : T =
            { insertUser = insertUser connFactory
              findUserById = findUserById connFactory }

        let fromDI (sp: IServiceProvider) = sp.GetService<IConnFactory>() |> live

module UserService =
    type T =
        { getUser: Guid -> users Option Task
          registerUser: users -> Guid Task }

    module Live =
        let private getUser (repo: UserRepo.T) (id: Guid) : users option Task = task { return! repo.findUserById id }

        let private registerUser (repo: UserRepo.T) (user: users) : Guid Task = task { return! repo.insertUser user }

        let live repo =
            { getUser = getUser repo
              registerUser = registerUser repo }

        let fromDI (sp: IServiceProvider) = sp.GetService<UserRepo.T>() |> live
