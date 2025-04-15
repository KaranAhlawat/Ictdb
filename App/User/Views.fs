module App.User.Views

open Falco.Markup
open Falco.Security

let layout title content =
    Templates.html5
        "en-us"
        [ Elem.title [] [ Text.raw title ]
          Elem.link
              [ Attr.rel "stylesheet"
                Attr.href "https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css" ] ]
        content

let register token =
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
                            Elem.label [ Attr.for' "password" ] [ Text.raw "Password" ]
                            Elem.input [ Attr.id "password"; Attr.name "password"; Attr.typePassword ] ]
                      Elem.button [ Attr.typeSubmit ] [ Text.raw "Register" ] ] ] ]

let login token =
    let page = "Login"

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
                            Elem.label [ Attr.for' "password" ] [ Text.raw "Password" ]
                            Elem.input [ Attr.id "password"; Attr.name "password"; Attr.typePassword ] ]
                      Elem.button [ Attr.typeSubmit ] [ Text.raw "Login" ] ] ] ]
