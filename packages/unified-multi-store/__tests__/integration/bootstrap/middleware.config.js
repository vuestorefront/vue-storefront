module.exports = {
  integrations: {
    bootstraped: {
      location: "./__tests__/integration/bootstrap/server",
      configuration: {
        OAuth: {
          uri: "uri",
          clientId: "clientId",
          clientSecret: "clientSecret",
          tokenEndpoint: "tokenEndpoint",
          tokenRevokeEndpoint: "tokenRevokeEndpoint",
          cookieOptions: {
            "vsf-sap-token": { secure: true },
          },
        },
        api: {
          uri: "uri",
          baseSiteId: "apparel-uk",
          catalogId: "apparelProductCatalog",
          catalogVersion: "Online",
          defaultLanguage: "en",
          defaultCurrency: "GBP",
        },
      },
    },
  },
};
