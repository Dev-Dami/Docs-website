# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This repository contains documentation for the DYMS (Dynamic Yet Minimal System) programming language, a Go-based interpreter with a hybrid execution engine. The documentation is built using MkDocs with Material theme and includes a Python-based Pygments lexer for syntax highlighting.

## Common Development Commands

### Documentation Site (MkDocs)

```bash
# Serve documentation locally (from DYMS-Lang directory)
cd DYMS-Lang
mkdocs serve

# Build documentation site
mkdocs build

# Deploy to GitHub Pages (if configured)
mkdocs gh-deploy
```

### DYMS Language Interpreter

```bash
# Run a DYMS script directly
cd DYMS-Lang
go run . script.dy

# Run the REPL (interactive mode)
go run .

# Run specific test files
go run . test/01_basic_features.dy
go run . test/21_simple_test.dy
```

### Pygments Lexer Development

```bash
# Install the lexer for development
cd DYMS-Lang
pip install -e .

# Build distribution
python setup.py bdist_wheel
```

## Architecture Overview

### Documentation Structure
- **MkDocs Configuration**: `DYMS-Lang/mkdocs.yml` defines the site structure, theme, and navigation
- **Content**: All documentation lives in `DYMS-Lang/docs/` with markdown files
- **Generated Site**: Built site outputs to `DYMS-Lang/site/`
- **Syntax Highlighting**: Custom Pygments lexer in `DYMS-Lang/dyms_lexer/dyms_lexer.py`

### DYMS Language Architecture (as documented)
The DYMS interpreter follows a pipeline architecture:

1. **Lexer** → Tokens (`lexer/lexer.go`)
2. **Parser** → AST (`parser/parser.go`) 
3. **Hybrid Runtime** (`runtime/hybrid.go`) with smart routing between:
   - **VM Path**: AST → Compiler → Bytecode → Stack-based VM (performance-optimized)
   - **Interpreter Path**: AST → Direct interpretation (flexibility-focused)

**Core Components:**
- **AST System**: Node definitions, pretty printing, function/import support
- **VM & Compiler**: Stack-based VM with 20+ opcodes, peephole optimization, constant deduplication
- **Runtime Environment**: Lexical scoping, dynamic values, error handling
- **Module System**: Built-in libraries (`time`, `fmaths`) with aliasing support

### Key Language Features
- **Variables**: `let` (immutable), `var` (mutable), `const` (strict immutable)
- **Types**: Numbers (float64), Strings, Booleans, Arrays (heterogeneous), Maps (string keys)
- **Functions**: First-class with closure support (`funct name(params) { body }`)
- **Control Flow**: `if/else`, `while`, `for range(i, N)`, `try/catch`
- **Module System**: `import "module" as alias` with built-in libraries

## Development Guidelines

### Documentation Updates
- All content changes should be made to markdown files in `DYMS-Lang/docs/`
- Test changes locally with `mkdocs serve` before committing
- The navigation structure is defined in `mkdocs.yml` - update when adding new pages

### Syntax Highlighting
- DYMS lexer supports `.dy` and `.dx` file extensions
- Keywords: `let`, `var`, `const`, `if`, `else`, `for`, `while`, `funct`, etc.
- Built-ins: `println`, `printf`, `systemout`, `pretty`, etc.
- Update `dyms_lexer.py` when language syntax changes

### Testing DYMS Code Examples
- All code examples in documentation should be valid DYMS syntax
- Test examples using: `go run . example.dy` (from DYMS-Lang directory)
- Use the REPL (`go run .`) for quick syntax verification

## File Structure Context

```
DYMS-Lang/                    # Main language documentation
├── mkdocs.yml               # MkDocs configuration
├── docs/                    # All documentation content
│   ├── index.md            # Homepage
│   ├── quick_start.md      # Installation & first script
│   ├── cli_usage.md        # Command-line interface
│   ├── language_overview.md # Core syntax & features
│   ├── architecture.md     # Technical architecture
│   └── ...                 # Other documentation pages
├── dyms_lexer/             # Python Pygments lexer
│   └── dyms_lexer.py       # Syntax highlighting for DYMS
├── setup.py                # Lexer installation script
└── site/                   # Generated documentation site
```