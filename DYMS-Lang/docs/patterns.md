# Code Patterns & Best Practices

This guide covers common patterns, idioms, and best practices when writing DYMS code. These patterns will help you write more maintainable, efficient, and idiomatic DYMS programs.

## Variable Declarations

### Prefer `let` over `var`

Use `let` by default unless you specifically need reassignment:

<div class="code-playground">

```dyms
// Good - immutable by default
let name = "Alice"
let users = ["Alice", "Bob", "Charlie"]
let config = {"debug": true, "port": 8080}

// Good - explicit mutability when needed
var counter = 0
var isRunning = true

// Avoid - unnecessary mutability
var userName = "Alice"  // This never changes
```

</div>

### Use `const` for True Constants

Reserve `const` for compile-time constants that will never change:

<div class="code-playground">

```dyms
// Good - mathematical constants
const PI = 3.14159265359
const E = 2.71828182846
const MAX_RETRIES = 3

// Good - configuration that's truly constant
const API_VERSION = "v1"
const DEFAULT_TIMEOUT = 30

// Avoid - runtime values
const currentTime = time.now()  // This changes each run
```

</div>

## Function Patterns

### Factory Functions for Object Creation

Use factory functions to create objects with methods:

<div class="code-playground">

```dyms
funct createUser(name, email) {
    let userData = {
        "name": name,
        "email": email,
        "created": time.now()
    }
    
    return {
        "getName": funct() { return userData.name },
        "getEmail": funct() { return userData.email },
        "getAge": funct() { return time.now() - userData.created },
        "updateEmail": funct(newEmail) {
            userData.email = newEmail
            return userData.email
        }
    }
}

// Usage
let user = createUser("Alice", "alice@example.com")
println(user.getName())
user.updateEmail("alice.new@example.com")
```

</div>

### Higher-Order Functions

Leverage first-class functions for powerful abstractions:

<div class="code-playground">

```dyms
// Generic retry logic
funct withRetry(operation, maxRetries) {
    return funct() {
        let attempts = 0
        while (attempts < maxRetries) {
            try {
                return operation()
            } catch(error) {
                ++attempts
                if (attempts >= maxRetries) {
                    return "Failed after " + maxRetries + " attempts"
                }
                println("Attempt", attempts, "failed, retrying...")
            }
        }
    }
}

// Usage
let unreliableTask = funct() {
    if (time.now() % 3 == 0) {  // Randomly fail
        return "Task failed"
    }
    return "Task succeeded"
}

let robustTask = withRetry(unreliableTask, 3)
println(robustTask())
```

</div>

### Partial Application Pattern

Create specialized functions from general ones:

<div class="code-playground">

```dyms
funct makeValidator(rule, message) {
    return funct(value) {
        if (rule(value)) {
            return {"valid": true, "value": value}
        }
        return {"valid": false, "error": message}
    }
}

// Create specific validators
let isEmail = makeValidator(
    funct(str) { return str.indexOf("@") > 0 },
    "Invalid email format"
)

let isPositive = makeValidator(
    funct(num) { return num > 0 },
    "Must be positive number"
)

// Usage
println(isEmail("alice@example.com"))  // Valid
println(isPositive(-5))                 // Invalid
```

</div>

## Error Handling Patterns

### Result Pattern

Instead of throwing exceptions, return result objects:

<div class="code-playground">

```dyms
funct safeParse(str) {
    try {
        let num = parseFloat(str)  // Hypothetical function
        return {"success": true, "value": num}
    } catch(error) {
        return {"success": false, "error": error}
    }
}

funct processNumber(str) {
    let result = safeParse(str)
    if (result.success) {
        return result.value * 2
    }
    return "Error: " + result.error
}

println(processNumber("42"))    // 84
println(processNumber("abc"))   // Error: ...
```

</div>

### Chain of Responsibility

Handle different error types gracefully:

<div class="code-playground">

```dyms
funct createErrorHandler() {
    let handlers = []
    
    return {
        "register": funct(condition, handler) {
            handlers[handlers.length] = {"condition": condition, "handler": handler}
        },
        
        "handle": funct(error) {
            for range(i, handlers.length) {
                let h = handlers[i]
                if (h.condition(error)) {
                    return h.handler(error)
                }
            }
            return "Unhandled error: " + error
        }
    }
}

let errorHandler = createErrorHandler()
errorHandler.register(
    funct(e) { return e.indexOf("network") >= 0 },
    funct(e) { return "Network issue - please check connection" }
)
errorHandler.register(
    funct(e) { return e.indexOf("timeout") >= 0 },
    funct(e) { return "Request timed out - please try again" }
)

println(errorHandler.handle("network connection failed"))
```

</div>

## Data Structure Patterns

### Builder Pattern for Complex Objects

Build complex objects step by step:

<div class="code-playground">

```dyms
funct createQueryBuilder() {
    let query = {
        "table": "",
        "fields": [],
        "conditions": [],
        "limit": 0
    }
    
    return {
        "from": funct(tableName) {
            query.table = tableName
            return this  // Enable chaining
        },
        
        "select": funct(fields) {
            query.fields = fields
            return this
        },
        
        "where": funct(condition) {
            query.conditions[query.conditions.length] = condition
            return this
        },
        
        "limitTo": funct(count) {
            query.limit = count
            return this
        },
        
        "build": funct() {
            let sql = "SELECT " + query.fields.join(", ")
            sql = sql + " FROM " + query.table
            if (query.conditions.length > 0) {
                sql = sql + " WHERE " + query.conditions.join(" AND ")
            }
            if (query.limit > 0) {
                sql = sql + " LIMIT " + query.limit
            }
            return sql
        }
    }
}

// Usage
let sql = createQueryBuilder()
    .from("users")
    .select(["name", "email"])
    .where("age > 18")
    .where("active = true")
    .limitTo(10)
    .build()
    
println(sql)
```

</div>

### Array Processing Patterns

Work with arrays efficiently:

<div class="code-playground">

```dyms
// Map-like function
funct mapArray(array, transform) {
    let result = []
    for range(i, array.length) {
        result[i] = transform(array[i])
    }
    return result
}

// Filter-like function
funct filterArray(array, predicate) {
    let result = []
    let resultIndex = 0
    for range(i, array.length) {
        if (predicate(array[i])) {
            result[resultIndex] = array[i]
            ++resultIndex
        }
    }
    return result
}

// Usage
let numbers = [1, 2, 3, 4, 5]
let doubled = mapArray(numbers, funct(n) { return n * 2 })
let evens = filterArray(numbers, funct(n) { return n % 2 == 0 })

println("Doubled:", doubled)  // [2, 4, 6, 8, 10]
println("Evens:", evens)      // [2, 4]
```

</div>

## Module Patterns

### Namespace Pattern

Organize related functions in objects:

<div class="code-playground">

```dyms
// Create a math utilities namespace
let MathUtils = {
    "clamp": funct(value, min, max) {
        if (value < min) return min
        if (value > max) return max
        return value
    },
    
    "lerp": funct(start, end, factor) {
        return start + (end - start) * factor
    },
    
    "distance": funct(x1, y1, x2, y2) {
        let dx = x2 - x1
        let dy = y2 - y1
        return math.sqrt(dx * dx + dy * dy)
    }
}

// Usage
println("Clamped:", MathUtils.clamp(15, 0, 10))  // 10
println("Lerp:", MathUtils.lerp(0, 100, 0.5))    // 50
```

</div>

### Module Initialization Pattern

Set up modules with configuration:

<div class="code-playground">

```dyms
funct createLogger(config) {
    let settings = {
        "level": config.level || "INFO",
        "prefix": config.prefix || "[LOG]",
        "timestamp": config.timestamp || true
    }
    
    return {
        "info": funct(message) {
            if (settings.level == "DEBUG" || settings.level == "INFO") {
                let output = settings.prefix + " "
                if (settings.timestamp) {
                    output = output + "[" + time.now() + "] "
                }
                println(output + message)
            }
        },
        
        "debug": funct(message) {
            if (settings.level == "DEBUG") {
                println("[DEBUG] " + message)
            }
        },
        
        "configure": funct(newConfig) {
            // Update settings
            if (newConfig.level) settings.level = newConfig.level
            if (newConfig.prefix) settings.prefix = newConfig.prefix
        }
    }
}

let logger = createLogger({"level": "DEBUG", "prefix": "[APP]"})
logger.info("Application started")
logger.debug("Debug information")
```

</div>

## Performance Patterns

### Memoization

Cache expensive function results:

<div class="code-playground">

```dyms
funct memoize(fn) {
    let cache = {}
    
    return funct(arg) {
        let key = "" + arg  // Convert to string key
        if (cache[key] != null) {
            return cache[key]
        }
        
        let result = fn(arg)
        cache[key] = result
        return result
    }
}

// Expensive function (fibonacci)
let fibonacci = memoize(funct(n) {
    if (n <= 1) return n
    // This would be slow without memoization
    return fibonacci(n - 1) + fibonacci(n - 2)
})

println("Fib(10):", fibonacci(10))  // Fast after first call
```

</div>

### Lazy Evaluation

Defer expensive computations:

<div class="code-playground">

```dyms
funct createLazy(factory) {
    let cached = null
    let computed = false
    
    return {
        "get": funct() {
            if (!computed) {
                cached = factory()
                computed = true
            }
            return cached
        },
        
        "reset": funct() {
            cached = null
            computed = false
        }
    }
}

let expensiveData = createLazy(funct() {
    println("Computing expensive data...")
    // Simulate expensive computation
    let result = []
    for range(i, 1000) {
        result[i] = math.sqrt(i)
    }
    return result
})

// Only computed when needed
println("First access:", expensiveData.get().length)  // Computes here
println("Second access:", expensiveData.get().length) // Uses cache
```

</div>

## Testing Patterns

### Simple Assertion Framework

Build a basic testing framework:

<div class="code-playground">

```dyms
funct createTester(suiteName) {
    let tests = []
    let passed = 0
    let failed = 0
    
    return {
        "test": funct(name, testFn) {
            tests[tests.length] = {"name": name, "fn": testFn}
        },
        
        "run": funct() {
            println("Running test suite:", suiteName)
            println("=" * 40)
            
            for range(i, tests.length) {
                let test = tests[i]
                try {
                    test.fn()
                    println("✓ " + test.name)
                    ++passed
                } catch(error) {
                    println("✗ " + test.name + " - " + error)
                    ++failed
                }
            }
            
            println("\nResults:", passed, "passed,", failed, "failed")
        }
    }
}

let suite = createTester("Math Functions")

suite.test("Addition works", funct() {
    if (2 + 2 != 4) {
        return "Expected 4, got " + (2 + 2)
    }
})

suite.test("Division by zero", funct() {
    if (10 / 0 == 0) {
        return "Division by zero should not equal 0"
    }
})

suite.run()
```

</div>

---

## Style Guidelines

### Naming Conventions

- **Functions**: Use camelCase: `getUserData()`, `calculateTotal()`
- **Variables**: Use camelCase: `userName`, `totalCount`
- **Constants**: Use UPPER_CASE: `MAX_RETRIES`, `API_KEY`
- **Factory functions**: Prefix with "create": `createUser()`, `createLogger()`

### Code Organization

- Group related functions together
- Use consistent indentation (2 or 4 spaces)
- Add comments for complex logic
- Keep functions focused on a single responsibility
- Prefer composition over complex inheritance patterns

### Error Messages

Write helpful error messages:

```dyms
// Good - specific and actionable
if (age < 0) {
    return "Age must be a positive number, got: " + age
}

// Avoid - vague and unhelpful  
if (age < 0) {
    return "Invalid age"
}
```

These patterns will help you write more maintainable and idiomatic DYMS code. Remember, the best pattern is often the simplest one that solves your problem clearly and correctly!