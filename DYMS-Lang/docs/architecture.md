# Architecture

### Execution Pipeline

1. **Lexer → Tokens**: [lexer/lexer.go](./lexer/lexer.go)
2. **Parser → AST**: [parser/parser.go](./parser/parser.go)
3. **Hybrid Runtime System**: [runtime/hybrid.go](./runtime/hybrid.go)
   - Smart routing between VM and interpreter based on code complexity
   - AST → Compiler → Bytecode → VM (optimized performance)
   - AST → Interpreter (flexible evaluation)
   - Performance tracking and adaptive execution

### Core Components

- **AST System**: Node definitions, pretty printing, function and import support
- **VM & Compiler**: High-performance stack-based VM with 20+ fast opcodes, peephole optimization, constant deduplication, call frame management
- **Runtime Environment**: Lexical scoping, dynamic value system, interpreter, pretty printing
- **Error System**: Line/column-aware parser and runtime errors
- **Module System**: Built-in libraries with aliasing support
