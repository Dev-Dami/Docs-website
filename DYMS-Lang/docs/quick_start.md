# Quick Start: Your First DYMS Script

Welcome to DYMS! This guide will walk you through writing and running your first script. We'll cover the basics of setting up your environment, writing a "Hello, World!" program, and running it using the DYMS interpreter.

## 1. Prerequisites

Before you begin, make sure you have Go (version 1.24 or higher) installed on your system. You can check your Go version by running:

```sh
go version
```

## 2. "Hello, World!"

Let's start with the classic "Hello, World!" program. Create a new file named `hello.dy` and add the following code:

```dyms
// Your first DYMS script!
println("Hello, World!");
```

This script uses the built-in `println` function to print the string "Hello, World!" to the console.

## 3. Running Your Script

You can run your script directly using `go run`:

```sh
go run .\main.go hello.dy
```

You should see the following output:

```
[println]: Hello, World!
```

## 4. Using the REPL (Read-Eval-Print Loop)

DYMS also comes with a REPL, which is a great way to experiment with the language. To start the REPL, run the interpreter without any arguments:

```sh
go run .\main.go
```

You'll be greeted with the DYMS prompt. You can type in any valid DYMS code and see the result immediately:

```
DYMS > let message = "Hello from the REPL!";
DYMS > println(message);
[println]: Hello from the REPL!
```

## 5. What's Next?

Congratulations! You've written and executed your first DYMS script. You're now ready to explore the language further. Here are some suggestions for what to do next:

*   Dive into the **[Language Overview](language_overview.md)** to learn more about DYMS syntax and features.
*   Check out the **[Demos](demos.md)** to see more examples of what you can do with DYMS.
*   Explore the **[Standard Library](standard_library.md)** to discover the built-in functions and modules available to you.