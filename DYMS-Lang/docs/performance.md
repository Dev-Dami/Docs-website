# Performance Guide

DYMS is designed to be fast out of the box with its hybrid execution engine, but understanding how it works can help you write even more efficient code. This guide covers performance characteristics, optimization techniques, and best practices.

## Hybrid Execution Engine

DYMS automatically chooses between two execution paths based on your code:

### VM Path (High Performance)
- **When**: Complex computations, loops, mathematical operations
- **How**: Code is compiled to bytecode and executed on a stack-based VM
- **Benefits**: ~10x faster than interpreter for compute-heavy code

<div class="code-playground">

```dyms
// This automatically uses the VM path
import "fmaths" as math

funct calculatePi(iterations) {
    var pi = 0.0
    for range(i, iterations) {
        let term = math.pow(-1, i) / (2 * i + 1)
        pi = pi + term
    }
    return pi * 4
}

let result = calculatePi(100000)  // VM handles this efficiently
println("π approximation:", result)
```

</div>

### Interpreter Path (High Flexibility)
- **When**: Dynamic operations, reflection, complex object manipulation
- **How**: Direct AST evaluation
- **Benefits**: More flexible, better for prototyping and dynamic code

<div class="code-playground">

```dyms
// This uses the interpreter path
funct createDynamicObject(props) {
    let obj = {}
    for range(i, props.length) {
        let prop = props[i]
        obj[prop.name] = prop.value  // Dynamic property creation
    }
    return obj
}

let user = createDynamicObject([
    {"name": "firstName", "value": "Alice"},
    {"name": "lastName", "value": "Smith"}
])
```

</div>

## Performance Characteristics

### Fast Operations

These operations are highly optimized:

<div class="code-playground">

```dyms
import "time" as t
import "fmaths" as math

// Arithmetic operations
let start = t.millis()
var sum = 0
for range(i, 1000000) {
    sum = sum + i * 2 - 1  // Fast arithmetic
}
println("Arithmetic:", t.millis() - start, "ms")

// Mathematical functions
start = t.millis()
for range(i, 100000) {
    let result = math.sqrt(i) + math.sin(i)  // Optimized math
}
println("Math functions:", t.millis() - start, "ms")

// Array access with numeric indices
let arr = [1, 2, 3, 4, 5]
start = t.millis()
for range(i, 100000) {
    let val = arr[i % arr.length]  // Fast array access
}
println("Array access:", t.millis() - start, "ms")
```

</div>

### Slower Operations

These operations require more overhead:

<div class="code-playground">

```dyms
import "time" as t

// String concatenation in loops
let start = t.millis()
var result = ""
for range(i, 1000) {  // Note: smaller loop due to overhead
    result = result + i  // Creates new string each time
}
println("String concat:", t.millis() - start, "ms")

// Dynamic property access
let obj = {"a": 1, "b": 2, "c": 3}
start = t.millis()
for range(i, 100000) {
    let key = ["a", "b", "c"][i % 3]
    let val = obj[key]  // Dynamic property lookup
}
println("Dynamic access:", t.millis() - start, "ms")
```

</div>

## Optimization Techniques

### 1. Prefer Numeric Operations

Mathematical operations are heavily optimized:

<div class="code-playground">

```dyms
// FAST - numeric operations
funct fastDistance(x1, y1, x2, y2) {
    let dx = x2 - x1
    let dy = y2 - y1
    return math.sqrt(dx * dx + dy * dy)
}

// SLOW - string operations
funct slowDistance(p1, p2) {
    let coords1 = p1.split(",")  // String parsing
    let coords2 = p2.split(",")
    // ... more string processing
}
```

</div>

### 2. Use Arrays for Sequential Data

Arrays with numeric indices are faster than object property access:

<div class="code-playground">

```dyms
// ✅ Fast - array-based approach
let positions = [[0, 0], [1, 2], [3, 4]]

funct updatePositions(positions, deltaX, deltaY) {
    for range(i, positions.length) {
        positions[i][0] = positions[i][0] + deltaX  // Fast numeric access
        positions[i][1] = positions[i][1] + deltaY
    }
}

// ❌ Slower - object-based approach  
let entities = [
    {"x": 0, "y": 0},
    {"x": 1, "y": 2},
    {"x": 3, "y": 4}
]

funct updateEntities(entities, deltaX, deltaY) {
    for range(i, entities.length) {
        entities[i].x = entities[i].x + deltaX  // Property lookup overhead
        entities[i].y = entities[i].y + deltaY
    }
}
```

</div>

### 3. Minimize String Operations in Loops

Build strings efficiently:

<div class="code-playground">

```dyms
// ✅ Fast - build array first, then join
funct buildReport(data) {
    let lines = []
    for range(i, data.length) {
        lines[i] = "Item " + i + ": " + data[i]
    }
    return lines.join("\\n")  // Single join operation
}

// ❌ Slow - concatenate in loop
funct slowBuildReport(data) {
    var report = ""
    for range(i, data.length) {
        report = report + "Item " + i + ": " + data[i] + "\\n"  // Creates new string each iteration
    }
    return report
}
```

</div>

### 4. Cache Function Results

Avoid recalculating expensive operations:

<div class="code-playground">

```dyms
// Memoization for expensive functions
funct memoize(fn) {
    let cache = {}
    return funct(arg) {
        let key = "" + arg
        if (cache[key] != null) {
            return cache[key]
        }
        let result = fn(arg)
        cache[key] = result
        return result
    }
}

// Expensive calculation
let expensiveFunction = memoize(funct(n) {
    var result = 0
    for range(i, n * 1000) {
        result = result + math.sqrt(i)
    }
    return result
})

// First call is slow, subsequent calls are instant
println(expensiveFunction(100))  // Calculated
println(expensiveFunction(100))  // Cached
```

</div>

### 5. Use Local Variables

Access to local variables is faster than property access:

<div class="code-playground">

```dyms
import "fmaths" as math

// ✅ Fast - cache frequently used values
funct optimizedCalculation(config, data) {
    let threshold = config.threshold  // Cache property access
    let multiplier = config.multiplier
    
    var result = 0
    for range(i, data.length) {
        if (data[i] > threshold) {  // Use cached value
            result = result + data[i] * multiplier
        }
    }
    return result
}

// ❌ Slower - repeated property access
funct unoptimizedCalculation(config, data) {
    var result = 0
    for range(i, data.length) {
        if (data[i] > config.threshold) {  // Property access each iteration
            result = result + data[i] * config.multiplier
        }
    }
    return result
}
```

</div>

## Memory Optimization

### Avoid Memory Leaks

DYMS has automatic garbage collection, but you can help:

<div class="code-playground">

```dyms
// ✅ Good - clean references when done
funct processLargeDataset(data) {
    let processor = createProcessor()
    let results = processor.process(data)
    
    // Clear large objects when done
    processor = null
    data = null
    
    return results
}

// ✅ Good - use local scope
funct calculateStats(numbers) {
    // These variables are automatically cleaned up
    var sum = 0
    var max = numbers[0]
    var min = numbers[0]
    
    for range(i, numbers.length) {
        let num = numbers[i]
        sum = sum + num
        if (num > max) max = num
        if (num < min) min = num
    }
    
    return {"sum": sum, "avg": sum / numbers.length, "max": max, "min": min}
}
```

</div>

### Reuse Objects When Possible

<div class="code-playground">

```dyms
// ✅ Efficient - reuse result objects
let resultPool = []

funct getResult() {
    if (resultPool.length > 0) {
        return resultPool.pop()  // Reuse existing object
    }
    return {"value": 0, "status": "ok"}  // Create new if needed
}

funct releaseResult(result) {
    result.value = 0      // Reset state
    result.status = "ok"
    resultPool[resultPool.length] = result  // Return to pool
}

// Usage
let result = getResult()
result.value = 42
result.status = "processed"
// ... use result ...
releaseResult(result)  // Return for reuse
```

</div>

## Benchmarking Your Code

Use the time module to measure performance:

<div class="code-playground">

```dyms
import "time" as t

funct benchmark(name, fn, iterations) {
    let start = t.millis()
    
    for range(i, iterations) {
        fn()
    }
    
    let elapsed = t.millis() - start
    let perOp = elapsed / iterations
    
    println(name + ":")
    println("  Total:", elapsed, "ms")
    println("  Per operation:", perOp, "ms")
    println("  Operations/sec:", 1000 / perOp)
    println()
}

// Compare different approaches
let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

benchmark("Array sum (for loop)", funct() {
    var sum = 0
    for range(i, data.length) {
        sum = sum + data[i]
    }
}, 10000)

benchmark("Array sum (while loop)", funct() {
    var sum = 0
    var i = 0
    while (i < data.length) {
        sum = sum + data[i]
        ++i
    }
}, 10000)
```

</div>

## Performance Tips Summary

<div class="success-bg" style="padding: 1rem; margin: 1rem 0; border-radius: 8px;">
<h3 class="success">DO THIS</h3>

- Use numeric operations when possible
- Cache frequently accessed properties
- Prefer arrays for sequential data
- Use local variables for loop calculations
- Minimize string concatenation in loops
- Take advantage of DYMS's automatic optimization
</div>

<div class="error-bg" style="padding: 1rem; margin: 1rem 0; border-radius: 8px;">
<h3 class="error">AVOID THIS</h3>

- Excessive string concatenation in loops
- Repeated property lookups in tight loops
- Creating many temporary objects
- Deep nested object access
- Complex string parsing in performance-critical code
</div>

### Profile and Measure
- Use `time.millis()` to measure execution time
- Test with realistic data sizes
- Compare different approaches
- Focus optimization on the slowest parts

Remember: **Premature optimization is the root of all evil**. Write clear, correct code first, then optimize the parts that actually matter for your application's performance!

## Real-World Performance Example

Here's a practical example showing DYMS performance in action:

<div class="code-playground">

```dyms
import "time" as t
import "fmaths" as math

// Simulate a particle physics calculation
funct simulateParticles(numParticles, steps) {
    // Use arrays for better performance
    let positions = []
    let velocities = []
    
    // Initialize particles
    for range(i, numParticles) {
        positions[i] = [math.random() * 100, math.random() * 100]
        velocities[i] = [math.random() * 2 - 1, math.random() * 2 - 1]
    }
    
    let start = t.millis()
    
    // Simulation loop - this will use VM optimization
    for range(step, steps) {
        for range(i, numParticles) {
            // Update positions (fast numeric operations)
            positions[i][0] = positions[i][0] + velocities[i][0]
            positions[i][1] = positions[i][1] + velocities[i][1]
            
            // Boundary checking
            if (positions[i][0] < 0 || positions[i][0] > 100) {
                velocities[i][0] = -velocities[i][0]
            }
            if (positions[i][1] < 0 || positions[i][1] > 100) {
                velocities[i][1] = -velocities[i][1]
            }
        }
    }
    
    let elapsed = t.millis() - start
    let particleUpdates = numParticles * steps
    
    println("Simulated", particleUpdates, "particle updates in", elapsed, "ms")
    println("Performance:", particleUpdates / elapsed * 1000, "updates/second")
    
    return positions
}

// Run simulation
simulateParticles(1000, 100)  // 100,000 particle updates
```

</div>

This example demonstrates DYMS's performance strengths: the tight numeric loops will automatically be optimized by the VM, giving you excellent performance for computational tasks while maintaining the simplicity of scripting language syntax.