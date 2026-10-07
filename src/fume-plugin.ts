import type { JsonValue } from './index';

export type FumePluginJsonValue =
  | string
  | number
  | boolean
  | null
  | FumePluginJsonValue[]
  | { [key: string]: FumePluginJsonValue };

export type FumePluginData = JsonValue;
export type FumePluginBindings = Record<string, FumePluginData>;

type Exposure =
  | { localName: string; globalName?: string }
  | { localName?: string; globalName: string };

export type FumePluginVariableDefinition = Exposure & {
  value: FumePluginJsonValue;
};

export type FumePluginNativeDefinition = Exposure & {
  export: string;
  signature: string;
};

export interface FumePluginMappingDefinition {
  id: string;
  expression: string;
  signature?: string;
  localName?: string;
  globalName?: string;
  mappingRoute?: string;
  rootRoute?: string;
  inheritGlobals?: boolean;
}

export interface FumePluginManifest {
  apiVersion: 1;
  id: string;
  version: string;
  variables?: FumePluginVariableDefinition[];
  functions?: FumePluginNativeDefinition[];
  mappings?: FumePluginMappingDefinition[];
}

export type FumePluginNativeFunction<
  TArgs extends FumePluginData[] = FumePluginData[],
  TResult extends FumePluginData = FumePluginData,
> = (...args: TArgs) => TResult | Promise<TResult>;

export type FumePluginFunctionMap = Record<
  string,
  { invoke(...args: FumePluginData[]): FumePluginData | Promise<FumePluginData> }['invoke']
>;

export interface FumePluginHost {
  callMapping(
    localName: string,
    input?: FumePluginData,
    bindings?: FumePluginBindings
  ): Promise<FumePluginData>;
}

export type FumePluginModule<
  TConfig extends { [Key in keyof TConfig]: FumePluginJsonValue } = Record<string, FumePluginJsonValue>,
  TFunctions extends FumePluginFunctionMap = FumePluginFunctionMap,
> =
  | {
      manifest: FumePluginManifest & { functions?: [] };
      createFunctions?: FumePluginFactory<TConfig, TFunctions>;
    }
  | {
      manifest: FumePluginManifest;
      createFunctions: FumePluginFactory<TConfig, TFunctions>;
    };

type FumePluginFactory<TConfig, TFunctions> = (
  config: TConfig,
  host: FumePluginHost
) => TFunctions | Promise<TFunctions>;

export interface FumePluginInstallationConfig {
  id: string;
  path: string;
  enabled?: boolean;
  mode?: 'bundled' | 'unbundled';
  timeoutMs?: number;
  config?: Record<string, FumePluginJsonValue>;
  configEnv?: Record<string, string>;
}

export interface FumePluginRootAlias {
  path: string;
  mappingId: string;
}

export interface FumePluginDeploymentConfig {
  version: 1;
  workers?: number;
  maxConcurrencyPerWorker?: number;
  maxQueue?: number;
  maxPayloadBytes?: number;
  maxDepth?: number;
  maxCallbacksPerInvocation?: number;
  maxConcurrentCallbacksPerInvocation?: number;
  maxConcurrentCallbacks?: number;
  workerHeapMb?: number;
  startupTimeoutMs?: number;
  shutdownTimeoutMs?: number;
  plugins?: FumePluginInstallationConfig[];
  rootAliases?: FumePluginRootAlias[];
}

export type FumePluginErrorCode =
  | 'PLUGIN_CONFIG_INVALID'
  | 'PLUGIN_SIGNATURE_INVALID'
  | 'PLUGIN_DATA_INVALID'
  | 'PLUGIN_PAYLOAD_TOO_LARGE'
  | 'PLUGIN_QUEUE_FULL'
  | 'PLUGIN_TIMEOUT'
  | 'PLUGIN_WORKER_UNAVAILABLE'
  | 'PLUGIN_EXECUTION_FAILED'
  | 'PLUGIN_CALL_INACTIVE'
  | 'PLUGIN_MAPPING_NOT_ALLOWED'
  | 'PLUGIN_MAPPING_FAILED'
  | 'PLUGIN_REENTRANCY_FORBIDDEN'
  | 'PLUGIN_CALLBACK_LIMIT'
  | 'PLUGIN_CALLBACKS_PENDING';

export interface FumePluginHostError extends Error {
  code: FumePluginErrorCode;
}
