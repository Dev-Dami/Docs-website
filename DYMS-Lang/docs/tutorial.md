# Interactive DYMS Tutorial

Welcome to the hands-on DYMS tutorial! This guide will take you from zero to productive in about 15 minutes. Each step builds on the previous one, so we recommend following along in order.

!!! tip "Follow Along"
    Open your terminal and try each example as we go. The best way to learn DYMS is by writing DYMS code!

## Step 1: Your First Program

Let's start with the classic "Hello, World!" program. Create a file called `hello.dy`:

<div class="code-playground">

```dyms
// hello.dy - Your first DYMS program
println("Hello, World!")
```

</div>

<div class="terminal">
go run . hello.dy
</div>

**Output:**
```
[println]: Hello, World!
```

!!! success "Checkpoint"
    <span class="success">SUCCESS:</span> You've successfully run your first DYMS program!

---

## Step 2: Variables and Data Types

DYMS has three ways to declare variables. Let's explore them:

<div class="code-playground">

```dyms
// variables.dy - Understanding DYMS variables
let name = "Alice"        // Immutable - cannot be reassigned
var age = 25             // Mutable - can be reassigned
const PI = 3.14159       // Constant - truly immutable

println("Name:", name)
println("Age:", age)
println("Pi:", PI)

// This works - var can be reassigned
age = 26
println("New age:", age)

// This would cause an error:
// name = "Bob"  // Error! let variables cannot be reassigned
```

</div>

**Try it yourself**: What happens if you uncomment the last line?

!!! info "Variable Types"
    - `let`: Immutable reference (most common)
    - `var`: Mutable variable
    - `const`: Compile-time constant

---

## Step 3: Data Structures

DYMS supports arrays and maps (objects) with a clean syntax:

<div class="code-playground">

```dyms
// data_structures.dy - Arrays and Maps
let numbers = [1, 2, 3, 4, 5]
let mixed = [1, "hello", true, [1, 2]]  // Arrays can hold any types

let person = {
    "name": "Bob",
    "age": 30,
    "active": true
}

println("Numbers:", numbers)
println("Mixed array:", mixed)
println("Person:", person)

// Access map properties with dot notation
println("Person's name:", person.name)
println("Person's age:", person.age)
```

</div>

!!! tip "Flexible Types"
    DYMS is dynamically typed - arrays and maps can contain any combination of types!

---

## Step 4: Control Flow

Let's add some logic to our programs:

<div class="code-playground">

```dyms
// control_flow.dy - Conditions and loops
let temperature = 22

if (temperature > 25) {
    println("It's hot!")
} else if (temperature < 15) {
    println("It's cold!")
} else {
    println("Perfect weather!")
}

// For loops with range
println("Counting to 5:")
for range(i, 5) {
    println("Count:", i)
}

// While loops
let countdown = 3
while (countdown > 0) {
    println("Countdown:", countdown)
    --countdown
}
println("Blast off!")
```

</div>

!!! note "Loop Control"
    Use `break` to exit loops early and `continue` to skip to the next iteration.

---

## Step 5: Functions and Closures

Functions are first-class citizens in DYMS:

<div class="code-playground">

```dyms
// functions.dy - Function definition and usage
funct greet(name) {
    return "Hello, " + name + "!"
}

funct add(a, b) {
    return a + b
}

println(greet("World"))
println("2 + 3 =", add(2, 3))

// Closures - functions that capture their environment
funct makeMultiplier(factor) {
    return funct(number) {
        return number * factor
    }
}

let double = makeMultiplier(2)
let triple = makeMultiplier(3)

println("Double 5:", double(5))  // 10
println("Triple 4:", triple(4))  // 12
```

</div>

!!! magic "Closures"
    Closures are powerful - they remember the environment where they were created!

---

## Step 6: Working with Modules

DYMS comes with useful built-in modules:

<div class="code-playground">

```dyms
// modules.dy - Using built-in modules
import "time" as t
import "fmaths" as math

// Time operations
let start = t.now()
println("Current time:", start)

// Math operations
println("π =", math.pi())
println("e =", math.e())
println("√16 =", math.sqrt(16))
println("2^8 =", math.pow(2, 8))
println("sin(π/2) =", math.sin(math.pi() / 2))

// Performance timing
for range(i, 1000000) {
    // Simulate some work
    let dummy = math.sqrt(i)
}

let end = t.now()
println("Operation took", end - start, "seconds")

// Sleep for demonstration
println("Sleeping for 1 second...")
t.sleep(1)
println("Done!")
```

</div>

!!! info "Available Modules"
    - `time`: Time operations, sleeping, performance measurement
    - `fmaths`: Advanced mathematical functions and constants

---

## Step 7: Error Handling

Handle errors gracefully with try/catch:

<div class="code-playground">

```dyms
// error_handling.dy - Graceful error handling
funct safeDivide(a, b) {
    try {
        if (b == 0) {
            return "Cannot divide by zero"
        }
        return a / b
    } catch(error) {
        println("An error occurred:", error)
        return null
    }
}

println("10 ÷ 2 =", safeDivide(10, 2))
println("10 ÷ 0 =", safeDivide(10, 0))

// Another example with potential errors
funct processArray(arr) {
    try {
        let result = 0
        for range(i, 5) {
            result = result + arr[i]  // Might go out of bounds
        }
        return result
    } catch(error) {
        return "Array processing failed: " + error
    }
}

let shortArray = [1, 2, 3]
println("Processing result:", processArray(shortArray))
```

</div>

---

## Step 8: Putting It All Together

Let's create a more substantial program that combines everything we've learned:

<div class="code-playground">

```dyms
// calculator.dy - A simple calculator program
import "fmaths" as math

funct createCalculator() {
    let history = []
    
    return {
        "add": funct(a, b) {
            let result = a + b
            history[history.length] = "Added " + a + " + " + b + " = " + result
            return result
        },
        
        "multiply": funct(a, b) {
            let result = a * b  
            history[history.length] = "Multiplied " + a + " × " + b + " = " + result
            return result
        },
        
        "power": funct(base, exp) {
            let result = math.pow(base, exp)
            history[history.length] = "Calculated " + base + "^" + exp + " = " + result
            return result
        },
        
        "getHistory": funct() {
            return history
        }
    }
}

// Use the calculator
let calc = createCalculator()

println("Calculator Demo:")
println("5 + 3 =", calc.add(5, 3))
println("4 × 7 =", calc.multiply(4, 7))  
println("2^8 =", calc.power(2, 8))

println("\nCalculation History:")
let history = calc.getHistory()
for range(i, history.length) {
    println("-", history[i])
}
```

</div>

!!! success "Congratulations!"
    <span class="success">COMPLETED:</span> You've finished the DYMS tutorial! You now know:
    
    - Variable declarations (`let`, `var`, `const`)
    - Data structures (arrays, maps)
    - Control flow (if/else, loops)
    - Functions and closures
    - Module system
    - Error handling
    - Complex program organization

---

## Next Steps

Now that you've mastered the basics, here's where to go next:

### **Explore More Examples**
Check out the [Demos](demos.md) page for real-world DYMS programs and patterns.

### **Deep Dive into Language Features**
Read the complete [Language Overview](language_overview.md) for advanced topics.

### **Understand the Architecture**
Learn how DYMS works under the hood in the [Architecture](architecture.md) section.

### **Build Something Cool**
Start your own DYMS project! Some ideas:
- A CLI tool for file processing
- An automation script for repetitive tasks  
- A text-based game
- A data analysis script

### **Get Help**
- Check the [Standard Library](standard_library.md) reference
- Browse the [Project Structure](project_structure.md) guide
- Explore the [Command-Line Usage](cli_usage.md) options

---

## Practice Exercises

Ready to test your skills? Try these challenges:

!!! question "Beginner Challenge"
    Write a program that calculates compound interest given principal, rate, and time.

!!! question "Intermediate Challenge"  
    Create a word counter that reads text and reports the most frequent words.

!!! question "Advanced Challenge"
    Build a simple task scheduler that can add, list, and remove tasks with due dates.

<span class="success">Happy coding with DYMS!</span>
