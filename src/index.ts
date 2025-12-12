/**
 * Supported FHIR version formats including full versions, minor versions, and release names
 */
export type FhirVersion =
  | '3.0.2'
  | '4.0.1'
  | '4.3.0'
  | '5.0.0'
  | '3.0'
  | '4.0'
  | '4.3'
  | '5.0'
  | 'R3'
  | 'STU3'
  | 'R4'
  | 'R4B'
  | 'R5';

/**
 * FHIR minor version numbers
 */
export type FhirVersionMinor = '3.0' | '4.0' | '4.3' | '5.0';

/**
 * FHIR release names
 */
export type FhirRelease = 'R3' | 'STU3' | 'R4' | 'R4B' | 'R5';

/**
 * Logger interface for structured logging
 */
export interface Logger {
  /**
   * Log debug messages (optional)
   */
  debug?(...args: unknown[]): void;
  /**
   * Log informational messages
   */
  info(...args: unknown[]): void;
  /**
   * Log warning messages
   */
  warn(...args: unknown[]): void;
  /**
   * Log error messages
   */
  error(...args: unknown[]): void;
}

/**
 * Identifier for a FHIR package from the registry
 */
export interface FhirPackageIdentifier {
  /**
   * Package ID, e.g. "hl7.fhir.r4.core"
   */
  id: string;
  /**
   * Package version, e.g. "4.0.1"; optional for "latest"
   */
  version?: string;
}

/**
 * JSON-compatible value type for FHIR resources
 */
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | JsonValue[]
  | { [key: string]: JsonValue };

/**
 * Base FHIR Resource interface
 */
export interface Resource {
  resourceType: string;
  id?: string;
  [key: string]: JsonValue;
}

/**
 * FHIR Bundle resource containing multiple resources
 */
export interface Bundle<T extends Resource = Resource> extends Resource {
  resourceType: 'Bundle';
  type: string;
  total?: number;
  link?: {
    relation: string;
    url: string;
  }[];
  entry?: {
    fullUrl?: string;
    resource?: T;
    search?: {
      mode?: string;
      score?: number;
    };
    request?: {
      method: string;
      url: string;
    };
    response?: {
      status: string;
      location?: string;
      etag?: string;
      lastModified?: string;
    };
  }[];
}

/**
 * FHIR CapabilityStatement resource describing server capabilities
 */
export interface CapabilityStatement extends Resource {
  resourceType: 'CapabilityStatement';
  status: string;
  date: string;
  kind: string;
  fhirVersion?: string;
  format: string[];
  rest?: {
    mode: string;
    resource?: {
      type: string;
      interaction?: {
        code: string;
      }[];
      searchParam?: {
        name: string;
        type: string;
        documentation?: string;
      }[];
    }[];
  }[];
}

/**
 * FHIR Extension instance
 */
export type FhirExtensionInstance = { 
  url: string; 
  [key: string]: unknown
};

/**
 * Element constraint definition
 */
export type ElementConstraint = { 
  source?: string;
  xpath?: string;
  [key: string]: unknown
};

/**
 * Slicing discriminator for ElementDefinition
 */
export interface SlicingDiscriminator {
  type: 'value' | 'exists' | 'pattern' | 'type' | 'profile';
  path: string;
}

/**
 * Slicing definition for ElementDefinition
 */
export interface ElementDefinitionSlicing {
  discriminator: SlicingDiscriminator[];
  rules: 'closed' | 'open' | 'openAtEnd';
  description?: string;
  ordered?: boolean;
}

/**
 * Value set binding for ElementDefinition
 */
export interface ElementDefinitionBinding {
  strength: 'required' | 'extensible' | 'preferred' | 'example';
  valueSet?: string;              // Canonical URL of the ValueSet
}

/**
 * Type definition for ElementDefinition
 */
export interface ElementDefinitionType {
  code: string;                   // e.g., 'string', 'CodeableConcept', 'Quantity', etc.
  profile?: string[];             // URLs of constrained profiles
  targetProfile?: string[];       // For references, allowed target profiles
  extension?: unknown;            // Extensions for the type (e.g., FHIRPath type)
}

/**
 * FHIR ElementDefinition interface representing a single element in a StructureDefinition
 */
export interface ElementDefinition {
  id: string;                     // e.g., 'Extension.value[x]'
  path: string;                   // e.g., 'Extension.value[x]'
  
  extension?: FhirExtensionInstance[]; // Extensions for this element
  min?: number;                   // Cardinality minimum
  max?: string;                   // Cardinality maximum (e.g., '1', '*')
  type?: ElementDefinitionType[]; // Possible types for this element (for polymorphics)
  slicing?: ElementDefinitionSlicing; // Slicing definition if applicable
  sliceName?: string;             // If this element is a slice
  
  fixedUri?: string;              // Fixed value (if constrained)
  binding?: ElementDefinitionBinding; // Value set binding for coded types
  
  // Other common constraint-related fields:
  short?: string;
  definition?: string;            // markdown
  comment?: string;               // markdown
  requirements?: string;          // markdown
  meaningWhenMissing?: string;    // markdown
  
  contentReference?: string;      // Reference to another element definition
  constraint?: ElementConstraint[]; // Constraints on this element
  
  // Placeholder for additional optional fields:
  [key: string]: unknown;
}

export * from './package';

