module App.Endpoints

let all = List.concat [ User.Routes.routes; Talk.Routes.routes ]
