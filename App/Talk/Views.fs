module App.Talk.Views

open App.ViewHelpers
open Falco.Markup
open Falco.Security

let homepage =
    Layouts.root
        "ICTdb"
        [ Elem.div
              [ Attr.class' "homepage-top" ]
              [ Elem.button [] [ Elem.a [ Attr.href "/talk/new" ] [ Text.raw "Contribute a talk" ] ] ]
          Text.p "This where all the conferences go" ]

let newTalk token =
    Layouts.root
        "Contribute Talk"
        [ Elem.div
              []
              [ Text.h1 "New talk"
                Elem.form
                    [ Attr.methodPost ]
                    [ Elem.fieldset
                          []
                          [ Xsrf.antiforgeryInput token
                            Elem.label [ Attr.for' "title" ] [ Text.raw "Title" ]
                            Elem.input [ Attr.id "title"; Attr.name "title" ]
                            Elem.label [ Attr.for' "link" ] [ Text.raw "Link" ]
                            Elem.input [ Attr.id "link"; Attr.name "link" ] ]
                      Elem.button [ Attr.typeSubmit ] [ Text.raw "Add" ] ] ] ]
