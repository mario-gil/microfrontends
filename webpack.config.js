const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'shell',

  remotes: {
    "transactions": "http://localhost:4201/remoteEntry.js",
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto',
    }),
    '@bank/shared-data': {
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto'
    }
  },
});
