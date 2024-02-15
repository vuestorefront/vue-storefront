/* eslint-disable no-useless-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
export const mockMiddlewareConfig = () => {
  return {
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
  };
};
