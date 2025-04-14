open System
open System.Reflection
open DbUp

[<EntryPoint>]
let main args =
    let connectionString =
        args
        |> Array.tryHead
        |> Option.defaultValue "Host=localhost;Port=5432;Username=ictdb;Password=ictdbpwd;Database=ictdb"

    let upgrader =
        DeployChanges.To
            .PostgresqlDatabase(connectionString)
            .WithScriptsEmbeddedInAssembly(Assembly.GetExecutingAssembly())
            .LogToConsole()
            .Build()

    let result = upgrader.PerformUpgrade()

    if result.Successful then
        Console.ForegroundColor <- ConsoleColor.Green
        Console.WriteLine("Success!")
        Console.ResetColor()
        0
    else
        Console.ForegroundColor <- ConsoleColor.Red
        Console.WriteLine(result.Error)
        Console.ResetColor()
#if DEBUG
        Console.ReadLine() |> ignore
#endif
        -1
