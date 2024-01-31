/* eslint-disable no-useless-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

export const mockMultistoreConfig = () => ({
  fetchConfiguration: jest.fn(({ domain }) => {
    return {
      "localhost:3000": {
        baseSiteId: "localhost-electronics",
        catalogId: "localhost-electronicsProductCatalog",
        catalogVersion: "localhost-Online",
        defaultLanguage: "localhost-en",
        defaultCurrency: "localhost-USD",
      },
      "mydomain.io": {
        baseSiteId: "mydomain-electronics",
        catalogId: "mydomain-electronicsProductCatalog",
        catalogVersion: "mydomain-Online",
        defaultLanguage: "mydomain-en",
        defaultCurrency: "mydomain-USD",
      },
    } as any;
  }),

  mergeConfigurations: jest.fn(({ baseConfig, storeConfig }) => {
    return {
      ...baseConfig,
      api: {
        ...baseConfig.api,
        ...storeConfig,
      },
    } as any;
  }),

  cacheManagerFactory: jest.fn(() => {
    return {
      get(key) {
        return undefined;
      },
      set(key, value) {
        return null as any;
      },
    };
  }),
});
