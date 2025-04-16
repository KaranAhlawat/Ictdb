module App.User.Services

open App.Generated.Db.``public``

type Credentials = { Username: string; Password: string }

type ValidationResult =
    | InvalidCreds
    | Valid of account

module UserService =
    let ValidateCredentials user creds : ValidationResult =
        match user with
        | Some u when u.user_password = Some creds.Password -> Valid u
        | _ -> InvalidCreds
