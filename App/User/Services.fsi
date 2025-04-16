module App.User.Services

open App.Generated.Db.``public``

type Credentials = { Username: string; Password: string }

type ValidationResult =
    | InvalidCreds
    | Valid of account

[<RequireQualifiedAccess>]
module UserService =
    val ValidateCredentials: (string * string -> bool) -> account option -> Credentials -> ValidationResult
