module App.User.Services

open App.Generated.Db.``public``

type Credentials = { Username: string; Password: string }

type ValidationResult =
    | InvalidCreds
    | Valid of account

module UserService =
    let ValidateCredentials verifier user creds : ValidationResult =
        match user with
        | Some u when u.user_password |> Option.exists (fun pass -> verifier (creds.Password, pass)) -> Valid u
        | _ -> InvalidCreds
