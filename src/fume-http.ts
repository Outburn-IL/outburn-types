/**
 * FUME HTTP API response shapes used by FUME server(s) and clients.
 *
 * These types are intended for sharing between:
 * - server implementations (fume-community, fume)
 * - client applications (e.g. fume-mapping-designer)
 */

export type DiagnosticLevel =
  | 'fatal'
  | 'invalid'
  | 'error'
  | 'warning'
  | 'notice'
  | 'info'
  | 'debug';

export type DiagnosticEntry = {
  code?: string;
  message?: string;
  position?: number | string;
  start?: number | string;
  line?: number | string;
  fhirParent?: string;
  fhirElement?: string;
  severity: number;
  level: DiagnosticLevel;
  timestamp: number;
};

/**
 * Verbose evaluation report returned when the HTTP query param `?verbose=true|1`
 * is enabled.
 */
export type EvaluateVerboseReport = {
  ok: boolean;
  status: number;
  result: unknown;
  diagnostics: {
    error: DiagnosticEntry[];
    warning: DiagnosticEntry[];
    debug: DiagnosticEntry[];
  };
  executionId: string;
};

/**
 * Legacy (non-verbose) evaluation error payload returned by the FUME HTTP API.
 *
 * Notes:
 * - Values may be empty strings when not known.
 * - Some fields may be numbers or strings depending on origin.
 */
export type FumeHttpEvaluationError = {
  __isFumeError: true;
  __isFlashError: boolean;
  message: string;
  code: string;
  name: string;
  value: string;
  token: string;
  cause: string;
  line: number | string;
  start: number | string;
  position: number | string;
};
