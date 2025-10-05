# Language Overview

### Core Syntax

```dyms
let x = 10
var y = 20
const who = "DYMS"
let ok = true

if (x > 5) { println("x > 5") } else { println("x <= 5") }
for range(i, 10) {
    if (i == 5) { break }
    if (i % 2 == 0) { continue }
    println(i)
}
while (y > 0) { --y }
```

### Variables

DYMS has three keywords for declaring variables:

*   `let`: Declares a variable that cannot be reassigned. This is the most common way to declare variables.
*   `var`: Declares a mutable variable that can be reassigned.
*   `const`: Declares a constant variable that cannot be reassigned and must be initialized with a constant value.

### Data Structures

#### Arrays

Arrays are ordered collections of values. They can hold values of different types.

```dyms
let arr = [1, "two", true, [4, 5]]
println(arr)
```

#### Maps

Maps are collections of key-value pairs. The keys must be strings.

```dyms
let m = {"name": "DYMS", "version": 0.5, "stable": true}
println(m.name) // Access properties using dot notation
```

### Functions and Closures

Functions are first-class citizens in DYMS. They can be assigned to variables, passed as arguments, and returned from other functions.

```dyms
funct greet(name) {
    return "Hello, " + name + "!"
}

let message = greet("World")
println(message)
```

DYMS also supports closures, which are functions that capture their surrounding environment.

```dyms
funct makeCounter() {
    let count = 0
    funct increment() {
        ++count
        return count
    }
    return increment
}

let counter1 = makeCounter()
println(counter1()) // 1
println(counter1()) // 2

let counter2 = makeCounter()
println(counter2()) // 1
```

### Error Handling

DYMS supports `try/catch` blocks for handling errors.

```dyms
funct safeDivide(a, b) {
    try {
        if (b == 0) {
            return "Division by zero"
        }
        return a / b
    } catch(e) {
        println("An error occurred:", e)
        return null
    }
}

println(safeDivide(10, 2))
println(safeDivide(10, 0))
```

### Module System

```dyms
import "time" as t
import "fmaths" as math

let t0 = t.now()
let start = t.millis()

for range(i, 1000000) {}

let t1 = t.now()
println("Elapsed: " + (t1 - t0) + " seconds")
t.sleep(1.5)
```

### Math Library

```dyms
import "fmaths" as math

// Mathematical constants
println("π = " + math.pi())
println("e = " + math.e())

// Basic functions
println("sqrt(16) = " + math.sqrt(16))     // 4
println("pow(2, 8) = " + math.pow(2, 8))  // 256
```
