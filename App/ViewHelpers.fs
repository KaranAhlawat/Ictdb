module App.ViewHelpers

open Falco.Markup

module Layouts =
    let root title content =
        Templates.html5
            "en-us"
            [ Elem.title [] [ Text.raw title ]
              Elem.link
                [ Attr.rel "stylesheet"
                  Attr.href "/css/style.css" ]
              Elem.link
                  [ Attr.rel "stylesheet"
                    Attr.href "https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css" ] ]
            content
