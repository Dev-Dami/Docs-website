# Contributing to DYMS

DYMS is an open source project that welcomes contributions from developers of all skill levels.

## Getting Started

### Prerequisites

- Go 1.24 or higher
- Git for version control
- Basic familiarity with interpreters/compilers

### Development Setup

```bash
# Clone the repository
git clone https://github.com/Dev-Dami/DYMS-Lang
cd DYMS-Lang

# Test the interpreter
go run . test/01_basic_features.dy

# Run the REPL
go run .
```

## Areas for Contribution

### Language Features
- <span class="success">Standard library expansion</span>
- Error message improvements  
- Performance optimizations
- New control flow constructs

### Documentation
- Code examples and tutorials
- Architecture explanations
- API reference improvements
- Translation to other languages

### Tooling
- Editor plugins (VS Code, Vim, etc.)
- Debugger integration
- Build tools and package managers
- Testing frameworks

### Infrastructure
- CI/CD improvements
- Benchmarking suite
- Website enhancements
- Release automation

## Code Style

Follow these guidelines when contributing:

### Go Code
- Use `gofmt` for formatting
- Follow Go naming conventions
- Add comments for public functions
- Include tests for new features

### DYMS Code
- Use `let` by default, `var` when mutation needed
- Prefer descriptive function names
- Keep functions focused and small
- Add comments for complex logic

### Documentation
- Use clear, concise language
- Provide runnable code examples
- Test all code snippets
- Follow existing formatting patterns

## Submitting Changes

### Pull Request Process

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/new-feature`
3. **Make** your changes with clear commits
4. **Test** thoroughly with existing test suite
5. **Submit** a pull request with detailed description

### Commit Messages

Use clear, descriptive commit messages:

<div class="success-bg" style="padding: 1rem; margin: 1rem 0; border-radius: 8px;">
<span class="success">GOOD:</span>

- `Add support for hexadecimal number literals`
- `Fix memory leak in closure evaluation`
- `Improve error messages for undefined variables`
</div>

<div class="error-bg" style="padding: 1rem; margin: 1rem 0; border-radius: 8px;">
<span class="error">AVOID:</span>

- `Fix bug`
- `Update code`
- `Changes`
</div>

## Testing

### Running Tests

```bash
# Run language tests
go run . test/

# Run specific test file  
go run . test/05_functions.dy

# Test REPL functionality
go run .
```

### Writing Tests

Create test files in the `test/` directory:

```dyms
// test/new_feature.dy
// Test description: Array destructuring

let arr = [1, 2, 3]
let [a, b, c] = arr

println("a:", a)  // Should print 1
println("b:", b)  // Should print 2
println("c:", c)  // Should print 3
```

## Reporting Issues

### Bug Reports

Include the following information:

- DYMS version and platform
- Minimal code example that reproduces the issue
- Expected vs actual behavior
- Error messages or stack traces

### Feature Requests

Describe:

- The problem you're trying to solve
- Proposed solution or API design
- Use cases and examples
- Impact on existing code

## Development Guidelines

### Performance Considerations

- Profile before optimizing
- Prefer VM-optimized code paths for hot loops  
- Minimize allocations in critical paths
- Cache frequently accessed values

### Memory Management

- Clear large data structures when done
- Avoid circular references
- Use local variables when possible
- Consider object pooling for high-frequency allocations

### Error Handling

- Provide specific, actionable error messages
- Include context about what the user was trying to do
- Suggest corrections when possible
- Handle edge cases gracefully

## Community

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and community chat
- **Pull Requests**: Code reviews and collaboration

### Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help newcomers learn and contribute
- Maintain professional communication

## Recognition

Contributors are recognized in:

- Repository README
- Release notes
- Documentation credits
- Project website

## Questions?

- Check existing issues and discussions
- Read the architecture documentation
- Look at recent pull requests for examples
- Ask questions in GitHub Discussions

<span class="success">Thank you for contributing to DYMS!</span>