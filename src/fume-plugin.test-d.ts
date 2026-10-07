import { expectAssignable, expectNotAssignable, expectType } from 'tsd';
import type {
  Bundle,
  FumePluginJsonValue,
  FumePluginData,
  FumePluginBindings,
  FumePluginManifest,
  FumePluginVariableDefinition,
  FumePluginNativeDefinition,
  FumePluginMappingDefinition,
  FumePluginNativeFunction,
  FumePluginFunctionMap,
  FumePluginHost,
  FumePluginModule,
  FumePluginDeploymentConfig,
  FumePluginInstallationConfig,
  FumePluginHostError,
} from './index';

expectNotAssignable<FumePluginJsonValue>(undefined);
expectNotAssignable<FumePluginJsonValue>({ nested: [undefined] });
expectNotAssignable<FumePluginJsonValue>(() => 1);
expectAssignable<FumePluginData>({ missing: undefined });
expectNotAssignable<FumePluginBindings>({ callback: () => 1 });
expectAssignable<FumePluginVariableDefinition>({ localName: 'prefix', value: 'x' });
expectAssignable<FumePluginVariableDefinition>({ globalName: 'value', value: null });
expectNotAssignable<FumePluginVariableDefinition>({ value: 1 });
expectNotAssignable<FumePluginNativeDefinition>({ export: 'upper', signature: '<s:s>' });
expectAssignable<FumePluginNativeDefinition>({
  export: 'upper',
  signature: '<s:s>',
  globalName: 'upper',
});
expectAssignable<FumePluginMappingDefinition>({ id: 'private', expression: '$' });
expectAssignable<FumePluginManifest>({ apiVersion: 1, id: 'demo', version: '1.0.0' });
expectNotAssignable<FumePluginManifest>({ apiVersion: 2, id: 'demo', version: '1.0.0' });

const upper: FumePluginNativeFunction<[value: string], string> = (value) => value.toUpperCase();
expectAssignable<FumePluginFunctionMap>({ upper });
expectNotAssignable<FumePluginFunctionMap>({ invalid: () => () => 1 });
expectNotAssignable<FumePluginFunctionMap>({ invalid: (callback: () => void) => callback() });
expectNotAssignable<FumePluginFunctionMap>({
  invalid: (callback: () => void) => {
    callback();
    return 1;
  },
});
expectNotAssignable<FumePluginModule>({
  manifest: {
    apiVersion: 1,
    id: 'demo',
    version: '1.0.0',
    functions: [{ export: 'upper', globalName: 'upper', signature: '<s:s>' }],
  },
});
const plugin: FumePluginModule<{ prefix: string }, { upper: typeof upper }> = {
  manifest: { apiVersion: 1, id: 'demo', version: '1.0.0' },
  createFunctions: async (config) => ({ upper: (value) => config.prefix + value.toUpperCase() }),
};
declare const host: FumePluginHost;
expectType<Promise<FumePluginData>>(host.callMapping('read', undefined, { id: '123' }));
expectNotAssignable<Parameters<FumePluginHost['callMapping']>>(['read', () => 1]);
expectNotAssignable<Parameters<FumePluginHost['callMapping']>>([
  'read',
  null,
  { callback: () => 1 },
]);
expectNotAssignable<Parameters<NonNullable<typeof plugin.createFunctions>>>([{ prefix: 1 }, host]);
expectNotAssignable<Parameters<typeof upper>>([1]);
expectNotAssignable<Promise<string>>(host.callMapping('read'));
expectNotAssignable<FumePluginModule>({
  manifest: plugin.manifest,
  createFunctions: () => ({ invalid: () => new Date() }),
});
expectAssignable<FumePluginDeploymentConfig>({
  version: 1,
  workers: 1,
  maxQueue: 0,
  maxCallbacksPerInvocation: 1000,
  maxConcurrentCallbacksPerInvocation: 4,
  maxConcurrentCallbacks: 32,
  plugins: [
    { id: 'demo', path: './demo.cjs', mode: 'bundled', configEnv: { token: 'DEMO_TOKEN' } },
  ],
  rootAliases: [{ path: '/run', mappingId: 'existing' }],
});
expectNotAssignable<FumePluginDeploymentConfig>({ version: 2 });
expectNotAssignable<FumePluginInstallationConfig>({ id: 'demo', path: './demo.cjs', mode: 'esm' });
expectNotAssignable<FumePluginInstallationConfig>({
  id: 'demo',
  path: './demo.cjs',
  config: { token: undefined },
});
expectNotAssignable<FumePluginInstallationConfig>({
  id: 'demo',
  path: './demo.cjs',
  configEnv: { token: 1 },
});
declare const failure: FumePluginHostError;
interface InterfaceConfig {
  url: string;
  retries: number;
}
const interfacePlugin: FumePluginModule<InterfaceConfig> = {
  manifest: { apiVersion: 1, id: 'interface', version: '1.0.0' },
  createFunctions(config) {
    expectType<string>(config.url);
    expectType<number>(config.retries);
    return {};
  },
};
expectAssignable<FumePluginModule<InterfaceConfig>>(interfacePlugin);
expectType<string>(failure.message);
expectNotAssignable<FumePluginHostError>({ name: 'Error', message: 'safe', code: 'ARBITRARY' });
expectAssignable<Bundle>({
  resourceType: 'Bundle',
  type: 'transaction',
  entry: [
    {
      request: { method: 'PATCH', url: 'Patient/123', ifMatch: 'W/"opaque-version"' },
    },
  ],
});
