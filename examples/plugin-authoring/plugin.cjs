/** @type {import('@outburn/types').FumePluginModule} */
module.exports = {
  manifest: {
    apiVersion: 1,
    id: 'demo',
    version: '1.0.0',
    functions: [{ export: 'upper', globalName: 'demoUpper', signature: '<s:s>' }],
  },
  createFunctions: () => ({
    /** @param {string} value */
    upper: (value) => value.toUpperCase(),
  }),
};
