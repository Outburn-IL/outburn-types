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

## FUME Plugin Authoring

The type-only plugin contract needs no runtime SDK or private engine package:

```typescript
import type { FumePluginModule } from '@outburn/types';

const plugin: FumePluginModule<{}, { upper: (value: string) => string }> = {
  manifest: {
    apiVersion: 1,
    id: 'demo',
    version: '1.0.0',
    functions: [{ export: 'upper', globalName: 'demoUpper', signature: '<s:s>' }]
  },
  createFunctions: () => ({ upper: value => value.toUpperCase() })
};
export = plugin;
```

JavaScript authors can use the same contract without a runtime import:

```javascript
/** @type {import('@outburn/types').FumePluginModule} */
module.exports = {
  manifest: {
    apiVersion: 1, id: 'demo', version: '1.0.0',
    functions: [{ export: 'upper', localName: 'upper', signature: '<s:s>' }]
  },
  createFunctions: () => ({
    /** @param {string} value */
    upper: value => value.toUpperCase()
  })
};
```

`FumePluginJsonValue` is strict JSON for manifests and configuration.
`FumePluginData` includes undefined for native inputs, results and mapping calls.
Variable and native declarations require a local or global exposure; mappings may
remain private. A module declaring native functions must supply `createFunctions`.
The host has only `callMapping(localName, input?, bindings?)`, returning data that
the author must narrow. Concrete native argument tuples and results remain typed.

Deployment types include installation mode, config/environment references, root
aliases and operational limits. Omitted settings are resolved by the Enterprise
runtime: one worker, concurrency 8, queue 128, payload 1048576 bytes, depth 64,
callback limits 1000/4/32, heap 128 MiB, startup 30000 ms, shutdown 5000 ms and
installation timeout 5000 ms. Installations default enabled and bundled; arrays
default empty. These declarations do not validate signature strings, semantic
versions, routes, finite numbers, cycles, plain prototypes or numeric limits.
The runtime validates those constraints; types do not provide a sandbox.

`FumePluginHostError` is an error shape with a closed `FumePluginErrorCode`, not a
runtime error class. `Bundle.entry[].request.ifMatch` supports version-guarded
transaction requests without asserting target-server PATCH support.

The standalone `examples/plugin-authoring` fixture checks TypeScript and
JavaScript with only these public declarations and TypeScript. Its paths setting
uses the local built declarations for repository validation; remove that setting
and install the published version containing these types when using it separately.

### Author and operator contract

The runtime feature targets Enterprise 3.3.0+. Use a published declarations release
that includes these contracts; the server and declarations versions are separate.
See the [Enterprise author guide](https://fume.health/docs/enterprise/plugins/authoring)
and [complete manifest reference](https://fume.health/docs/enterprise/plugins/manifest).

Exposure fields are independent: `localName` is own-installation callable scope,
`globalName` is ordinary evaluation scope, `mappingRoute` is an explicit read-only
HTTP Mapping exposure, and `rootRoute` is execution only. A private mapping ID is
not implicitly callable or a host callback target. `host.callMapping` permits only
an own mapping's declared local name during an active native invocation. Omitted
or undefined host-call input inherits active input; null is explicit. Await all
callbacks, narrow their data results, and never call a native function from a
callback mapping. Factories cannot call the host during initialization.

Check the standalone fixture with `npm run test:authoring`. Type checking
does not replace real startup/signature/data validation or artifact-specific
runtime tests. The generic `FumePluginNativeFunction` argument tuple preserves
concrete arguments; the host deliberately does not infer a clinical result schema.

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
