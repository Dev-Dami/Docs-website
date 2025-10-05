# Roadmap

### Completed (v0.4)

- **High-performance bytecode VM**: 20+ specialized opcodes for common operations
- **Compiler optimizations**: Peephole optimization, constant deduplication, automatic optimization passes
- **Fast execution paths**: Optimized opcodes for constants (0, 1, true, false, null), loops, string operations
- **Memory optimizations**: Pre-allocated stacks, constant pooling, improved garbage collection
- User-defined functions with closures and return statements
- Enhanced time library with `now()`, `millis()`, `sleep()`
- Property access via dot notation for maps
- Advanced pretty printing with stable output
- Comprehensive error handling with line/column tracking

### Completed (v0.5)

- **Hybrid execution engine**: Smart VM/interpreter routing with performance tracking
- **Loop control flow**: `break` and `continue` statements with proper scoping
- **Increment/decrement operators**: Pre/post `++` and `--` with identifier support
- **Exception handling**: `try/catch` blocks with error variable binding
- **Performance optimizations**: Ultra-fast loops with sub-150ms execution
- **Memory improvements**: Object pooling and variable reuse patterns
- Array and map bracket indexing
- Expanded standard library with advanced `fmaths` module
- Modulo operator (`%`) support
- Enhanced identifier support (underscores allowed)
- **Function expressions**: Anonymous functions and lambda support
- **File extension change**: Now uses `.dy` and `.dx` extensions

### Future Enhancements

- `switch/case` statements
- File I/O functions
- Regular expressions
- Debugging tools
- User-defined modules
- Advanced VM optimizations
