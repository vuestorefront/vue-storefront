/* eslint-disable @typescript-eslint/no-unused-vars */
import { mockMultistoreConfig } from "../../__mocks__/multistore.config.mock";
import { fetchConfigWithCache } from "../../src/cache/fetchConfigWithCache";

describe("[MultiStoreExtension] fetchConfigWithCache utility function", () => {
  const multistore = mockMultistoreConfig();
  const FETCH_RESPONSE = {
    "mydomain.io": {
      baseSiteId: "electronics",
      catalogId: "electronicsProductCatalog",
      catalogVersion: "Online",
      defaultLanguage: "en",
      defaultCurrency: "USD",
    },
  };
  const cacheManager = {
    get: jest.fn(),
    set: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("gets configuration from cache", async () => {
    const [domain, storeConfig] = Object.entries(FETCH_RESPONSE)[0];
    cacheManager.get.mockReturnValue(storeConfig);

    const res = await fetchConfigWithCache({
      cacheManager,
      domain,
      multistore,
    });

    expect(cacheManager.get).toBeCalledWith(domain);
    expect(multistore.fetchConfiguration).not.toBeCalled();
    expect(res).toEqual(storeConfig);
  });

  it("fetches new configuration there is no cache, and caches it", async () => {
    multistore.fetchConfiguration.mockReturnValue(FETCH_RESPONSE);
    const [domain, storeConfig] = Object.entries(FETCH_RESPONSE)[0];

    const res = await fetchConfigWithCache({
      cacheManager,
      domain,
      multistore,
    });

    expect(res).toEqual(storeConfig);
    expect(cacheManager.set).toBeCalledWith(domain, storeConfig);
  });
});
