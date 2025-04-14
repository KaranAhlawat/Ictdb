module App.User.Domain

open System

type UserOrigin =
    | Form
    | Google

type User =
    { Id: Guid
      ProviderId: string
      Username: string
      UserEmail: string
      UserPassword: string option
      Provider: UserOrigin
      CreatedAt: DateTime
      UpdatedAt: DateTime }
