module App.User.Services

open App.Generated.Db.``public``
open BCrypt.Net

type Credentials = { Username: string; Password: string }

type ValidationResult =
    | InvalidCreds
    | Valid of account

module UserService =
    let ValidateCredentials user creds : ValidationResult =
        match user with
        | Some u when
            u.user_password
            |> Option.exists (fun pass -> BCrypt.EnhancedVerify(creds.Password, pass))
            ->
            Valid u
        | _ -> InvalidCreds
