# Features

## Variables

- `let` — immutable by default
- `var` — mutable
- `const` — immutable with strict enforcement

## Data Types

- Number (float64), String, Boolean, Array (heterogeneous), Map (string keys)

## Functions

- User-defined: `funct name(params) { body }`
- Supports closures and lexical environment capture
- `return value`
- Automatic null-padding for missing arguments

## Module System

- `import "module" as alias`
- Built-in `time` library: `now()`, `millis()`, `sleep()`
- Built-in `fmaths` library: advanced math functions

## Operators

- Arithmetic: `+ - * / %`
- Comparison: `== != < <= > >=`
- Logical: `&& ||`
- Increment/Decrement: `++var, var++, --var, var--`
- String concatenation with automatic type conversion

## Control Flow

- Conditional: `if/else`
- Loops: `while` and `for range(i, N)` with `break` and `continue`
- Exception handling: `try/catch`

## Advanced Features

- Hybrid execution engine: Smart routing between VM and interpreter
- High-performance bytecode VM: 20+ optimized opcodes
- Compiler optimizations: peephole, constant folding, dead code elimination
- Ultra-fast loops, memory optimization
- Property access via dot notation for maps
- String escaping: `\n, \t, \r\n, \\, \"`
- Single-line comments: `//`
