import type { FumePluginModule, FumePluginNativeFunction } from '@outburn/types';

type Functions = { upper: FumePluginNativeFunction<[value: string], string> };

export const plugin: FumePluginModule<{ prefix: string }, Functions> = {
  manifest: {
    apiVersion: 1,
    id: 'demo',
    version: '1.0.0',
    functions: [{ export: 'upper', globalName: 'demoUpper', signature: '<s:s>' }],
    mappings: [{ id: 'read', localName: 'read', expression: '$' }],
  },
  createFunctions: (config, host) => ({
    upper: async (value) => {
      const result = await host.callMapping('read', value);
      if (typeof result !== 'string') throw new Error('Expected string data');
      return config.prefix + result.toUpperCase();
    },
  }),
};
