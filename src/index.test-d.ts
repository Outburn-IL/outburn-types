import { expectAssignable, expectNotAssignable } from 'tsd';
import {
  FhirVersion,
  FhirVersionMinor,
  FhirRelease,
  Logger,
  FhirPackageIdentifier,
  JsonValue,
  Resource,
  Bundle,
  CapabilityStatement,
  FhirExtensionInstance,
  ElementConstraint,
  SlicingDiscriminator,
  ElementDefinitionSlicing,
  ElementDefinitionBinding,
  ElementDefinitionType,
  ElementDefinition,
} from './index';

// Test FhirVersion - assignable to the union type
const fhirVersion1: FhirVersion = '3.0.2';
expectAssignable<FhirVersion>(fhirVersion1);

const fhirVersion2: FhirVersion = '4.0.1';
expectAssignable<FhirVersion>(fhirVersion2);

const fhirVersion3: FhirVersion = 'R4';
expectAssignable<FhirVersion>(fhirVersion3);

// Invalid values should not be assignable
expectNotAssignable<FhirVersion>('invalid');
expectNotAssignable<FhirVersion>('6.0.0');

// Test FhirVersionMinor
const minorVersion: FhirVersionMinor = '4.0';
expectAssignable<FhirVersionMinor>(minorVersion);
expectNotAssignable<FhirVersionMinor>('4.0.1');

// Test FhirRelease
const release: FhirRelease = 'R4';
expectAssignable<FhirRelease>(release);
expectNotAssignable<FhirRelease>('R6');

// Test Logger interface
const logger: Logger = {
  info: () => {},
  warn: () => {},
  error: () => {},
};
expectAssignable<Logger>(logger);

// Logger with debug method
const loggerWithDebug: Logger = {
  debug: () => {},
  info: () => {},
  warn: () => {},
  error: () => {},
};
expectAssignable<Logger>(loggerWithDebug);

// Test FhirPackageIdentifier
const packageWithVersion: FhirPackageIdentifier = {
  id: 'hl7.fhir.r4.core',
  version: '4.0.1',
};
expectAssignable<FhirPackageIdentifier>(packageWithVersion);

// Package without version (for "latest")
const packageLatest: FhirPackageIdentifier = {
  id: 'hl7.fhir.r4.core',
};
expectAssignable<FhirPackageIdentifier>(packageLatest);

// Test JsonValue
const jsonString: JsonValue = 'test';
expectAssignable<JsonValue>(jsonString);

const jsonNumber: JsonValue = 42;
expectAssignable<JsonValue>(jsonNumber);

const jsonBoolean: JsonValue = true;
expectAssignable<JsonValue>(jsonBoolean);

const jsonNull: JsonValue = null;
expectAssignable<JsonValue>(jsonNull);

const jsonUndefined: JsonValue = undefined;
expectAssignable<JsonValue>(jsonUndefined);

const jsonArray: JsonValue = [1, 'test', true, null];
expectAssignable<JsonValue>(jsonArray);

const jsonObject: JsonValue = { key: 'value', nested: { foo: 'bar' } };
expectAssignable<JsonValue>(jsonObject);

// Test Resource
const resource: Resource = {
  resourceType: 'Patient',
  id: '123',
  name: [{ family: 'Doe', given: ['John'] }],
};
expectAssignable<Resource>(resource);

// Test Bundle
const bundle: Bundle = {
  resourceType: 'Bundle',
  type: 'searchset',
  total: 1,
  entry: [
    {
      fullUrl: 'http://example.com/Patient/123',
      resource: {
        resourceType: 'Patient',
        id: '123',
      },
    },
  ],
};
expectAssignable<Bundle>(bundle);

// Test Bundle with type parameter
const patientBundle: Bundle<Resource> = {
  resourceType: 'Bundle',
  type: 'searchset',
  entry: [
    {
      resource: {
        resourceType: 'Patient',
        id: '123',
      },
    },
  ],
};
expectAssignable<Bundle<Resource>>(patientBundle);

// Test CapabilityStatement
const capabilityStatement: CapabilityStatement = {
  resourceType: 'CapabilityStatement',
  status: 'active',
  date: '2025-12-13',
  kind: 'instance',
  fhirVersion: '4.0.1',
  format: ['json', 'xml'],
  rest: [
    {
      mode: 'server',
      resource: [
        {
          type: 'Patient',
          interaction: [{ code: 'read' }, { code: 'search-type' }],
          searchParam: [
            {
              name: 'identifier',
              type: 'token',
              documentation: 'Search by identifier',
            },
          ],
        },
      ],
    },
  ],
};
expectAssignable<CapabilityStatement>(capabilityStatement);

// Test FhirExtensionInstance
const extension: FhirExtensionInstance = {
  url: 'http://example.com/extension',
  valueString: 'test',
};
expectAssignable<FhirExtensionInstance>(extension);

// Test ElementConstraint
const constraint: ElementConstraint = {
  source: 'http://hl7.org/fhir/StructureDefinition/Extension',
  xpath: 'f:Extension',
  key: 'ext-1',
  severity: 'error',
};
expectAssignable<ElementConstraint>(constraint);

// Test SlicingDiscriminator
const discriminator: SlicingDiscriminator = {
  type: 'value',
  path: 'url',
};
expectAssignable<SlicingDiscriminator>(discriminator);

expectNotAssignable<SlicingDiscriminator>({
  type: 'invalid',
  path: 'url',
});

// Test ElementDefinitionSlicing
const slicing: ElementDefinitionSlicing = {
  discriminator: [{ type: 'value', path: 'url' }],
  rules: 'open',
  description: 'Slice by extension URL',
  ordered: false,
};
expectAssignable<ElementDefinitionSlicing>(slicing);

// Test ElementDefinitionBinding
const binding: ElementDefinitionBinding = {
  strength: 'required',
  valueSet: 'http://example.com/ValueSet/example',
};
expectAssignable<ElementDefinitionBinding>(binding);

expectNotAssignable<ElementDefinitionBinding>({
  strength: 'invalid',
  valueSet: 'http://example.com/ValueSet/example',
});

// Test ElementDefinitionType
const elementType: ElementDefinitionType = {
  code: 'string',
  profile: ['http://hl7.org/fhir/StructureDefinition/string'],
  targetProfile: ['http://hl7.org/fhir/StructureDefinition/Patient'],
  extension: { customProperty: 'value' },
};
expectAssignable<ElementDefinitionType>(elementType);

// Test ElementDefinition
const elementDefinition: ElementDefinition = {
  id: 'Extension.value[x]',
  path: 'Extension.value[x]',
  min: 0,
  max: '1',
  type: [{ code: 'string' }, { code: 'integer' }],
  short: 'Value of extension',
  definition: 'The value of the extension',
  extension: [
    {
      url: 'http://example.com/extension',
      valueString: 'test',
    },
  ],
};
expectAssignable<ElementDefinition>(elementDefinition);

// Test ElementDefinition with slicing
const slicedElement: ElementDefinition = {
  id: 'Extension.extension',
  path: 'Extension.extension',
  slicing: {
    discriminator: [{ type: 'value', path: 'url' }],
    rules: 'open',
  },
  min: 0,
  max: '*',
};
expectAssignable<ElementDefinition>(slicedElement);

// Test ElementDefinition with binding
const boundElement: ElementDefinition = {
  id: 'Patient.gender',
  path: 'Patient.gender',
  binding: {
    strength: 'required',
    valueSet: 'http://hl7.org/fhir/ValueSet/administrative-gender',
  },
  min: 0,
  max: '1',
};
expectAssignable<ElementDefinition>(boundElement);
