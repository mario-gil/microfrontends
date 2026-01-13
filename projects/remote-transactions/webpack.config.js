const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'transactions',

  exposes: {
    './TransactionsModule': './projects/remote-transactions/src/app/transactions.module.ts',
    './TransactionsRoutes': './projects/remote-transactions/src/app/transactions.routes.ts'
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: false,
      requiredVersion: 'auto'
    }),
  },
});
