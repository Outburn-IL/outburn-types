# @outburn/types

TypeScript type definitions for Outburn FHIR tools.

## Installation

```bash
npm install @outburn/types
```

## Usage

```typescript
import { FhirVersion, FhirPackageIdentifier, Logger } from '@outburn/types';

// Use FHIR version types
const version: FhirVersion = '4.0.1';

// Define a FHIR package
const package: FhirPackageIdentifier = {
  id: 'hl7.fhir.r4.core',
  version: '4.0.1'
};

// Implement a logger
const logger: Logger = {
  info: (...args) => console.log(...args),
  warn: (...args) => console.warn(...args),
  error: (...args) => console.error(...args),
};
```

## Types

### `FhirVersion`
Supported FHIR version formats including full versions (e.g., `'4.0.1'`), minor versions (e.g., `'4.0'`), and release names (e.g., `'R4'`).

### `FhirVersionMinor`
FHIR minor version numbers: `'3.0'`, `'4.0'`, `'4.3'`, `'5.0'`

### `FhirRelease`
FHIR release names: `'R3'`, `'STU3'`, `'R4'`, `'R4B'`, `'R5'`

### `Logger`
Logger interface with standard logging methods. The `debug` method is optional.

### `FhirPackageIdentifier`
Identifier for a FHIR package from the registry, with an `id` and optional `version`.

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run type tests
npm test

# Lint
npm run lint

# Format
npm run format
```

## License

MIT
