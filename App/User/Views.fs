module App.User.Views

open System.Security.Claims
open Falco.Markup
open Falco.Security

type Errors =
    | InvalidCredentials
    | Unknown

module Errors =
    let ofString str =
        match str with
        | "invalid_creds" -> InvalidCredentials
        | _ -> Unknown

    let text =
        function
        | InvalidCredentials -> "Invalid credentials"
        | Unknown -> "Something went wrong"

let layout title content =
    Templates.html5
        "en-us"
        [ Elem.title [] [ Text.raw title ]
          Elem.link
              [ Attr.rel "stylesheet"
                Attr.href "https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css" ] ]
        content

let userAccount (account: ClaimsPrincipal) =
    let page = "Account"

    layout page [ Elem.div [] [ Text.h1 page; Elem.span [] [ Text.raw account.Identity.Name ] ] ]

let register error token =
    let page = "Register"

    layout
        page
        [ Elem.div
              []
              [ Text.h1 page
                Elem.form
                    [ Attr.methodPost ]
                    [ Elem.fieldset
                          []
                          [ Xsrf.antiforgeryInput token
                            Elem.label [ Attr.for' "username" ] [ Text.raw "Username" ]
                            Elem.input [ Attr.id "username"; Attr.name "username" ]
                            Elem.label [ Attr.for' "email" ] [ Text.raw "Email" ]
                            Elem.input [ Attr.id "email"; Attr.name "email"; Attr.typeEmail ]
                            Elem.label [ Attr.for' "password" ] [ Text.raw "Password" ]
                            Elem.input [ Attr.id "password"; Attr.name "password"; Attr.typePassword ]
                            Elem.label [ Attr.for' "confirm-password" ] [ Text.raw "Confirm Password" ]
                            Elem.input [ Attr.id "confirm-password"; Attr.name "confirm-password"; Attr.typePassword ] ]
                      Elem.button [ Attr.typeSubmit ] [ Text.raw "Register" ] ] ] ]

let login error token =
    let page = "Login"

    let errorSpan =
        error
        |> Option.map Errors.ofString
        |> Option.map Errors.text
        |> Option.map (fun r -> [ Elem.span [ Attr.style "color: red" ] [ Text.raw r ] ])
        |> Option.defaultValue []

    let formBody =
        List.append
            errorSpan
            [ Elem.fieldset
                  []
                  [ Xsrf.antiforgeryInput token
                    Elem.label [ Attr.for' "username" ] [ Text.raw "Username" ]
                    Elem.input [ Attr.id "username"; Attr.name "username" ]
                    Elem.label [ Attr.for' "password" ] [ Text.raw "Password" ]
                    Elem.input [ Attr.id "password"; Attr.name "password"; Attr.typePassword ] ]
              Elem.button [ Attr.typeSubmit ] [ Text.raw "Login" ] ]

    layout page [ Elem.div [] [ Text.h1 page; Elem.form [ Attr.methodPost ] formBody ] ]
