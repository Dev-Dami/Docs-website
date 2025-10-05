# About DYMS

**DYMS (Dynamic Yet Minimal System Interpreter)** is a lightweight, embeddable scripting language interpreter built in Go.  
It’s designed to balance **simplicity**, **performance**, and **extensibility**, making it ideal for embedding in applications, rapid prototyping, or exploring language/runtime design.

---

## Why DYMS?

DYMS was created with the goal of providing:

- A **minimal yet expressive syntax** for scripting
- A **hybrid runtime** that intelligently chooses between interpretation and bytecode VM execution
- **High performance loops and operations** with optimized opcodes
- **Easy extensibility** with modules and user-defined functions
- **Robust error handling** with clear, line-aware reporting

It takes inspiration from lightweight languages like **Lua** and **Wren**, while borrowing ideas from **Crafting Interpreters**, **SICP**, and the **Dragon Book**.

---

## Key Highlights

- **Simple Core Language**: Variables, functions, arrays, maps, loops, conditionals
- **Execution Engine**: Hybrid interpreter + high-performance VM
- **Standard Modules**: Time and advanced math (`fmaths`)
- **Pretty Printing**: Inline and multi-line formats with sorted output
- **Safe & Friendly**: Exception handling (`try/catch`), strict `const`, and clear error messages

---

## Status

- Current Version: **Demo 0.5**
- License: **MIT**
- Requirements: **Go ≥ 1.24**
- Project is **under active development**, with focus on:
  - Improving performance and optimizations
  - Expanding the standard library
  - Adding more language features (switch, regex, file I/O)

---

## Inspiration & Philosophy

DYMS embraces the principle of being **dynamic yet minimal**:

- Dynamic enough to handle real scripting needs (closures, maps, math, modules)
- Minimal enough to remain small, understandable, and easy to embed

It aims to provide a **practical scripting layer** while staying approachable for developers who want to **study, extend, or customize** an interpreter.

---

© 2025 DYMS. Licensed under the [MIT License](./LICENSE).
