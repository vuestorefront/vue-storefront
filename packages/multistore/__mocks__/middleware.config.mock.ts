/* eslint-disable no-useless-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { mockMultistoreConfig } from "./multistore.config.mock";

const multistore = mockMultistoreConfig();

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
    multistore,
  };
};
