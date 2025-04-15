module App.User.Services

open System
open System.Threading.Tasks

open App.Generated.Db.``public``
open App.User.Persistence

type UserService =
    { RegisterUser: users -> Guid Task
      GetUser: Guid -> users option Task }

module UserService =
    let registerUser insertUser user : Guid Task = insertUser user

    let getUser findById id : users option Task = findById id

    module Live =
        let mk (ur: UserRepo) =
            { GetUser = getUser ur.whereId
              RegisterUser = registerUser ur.add }
