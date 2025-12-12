# Contributing to @outburn/types

Thank you for your interest in contributing!

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Make your changes in the `src/` directory
4. Run tests: `npm test`
5. Run linter: `npm run lint`
6. Format code: `npm run format`
7. Build: `npm run build`

## Pull Request Process

1. Ensure all tests pass and code is formatted
2. Update README.md if adding new types
3. Update version in package.json following semver
4. Create a pull request with a clear description

## Type Testing

Type-only packages should have type tests using `tsd` to ensure types work as expected. Add tests in `src/index.test-d.ts`.
