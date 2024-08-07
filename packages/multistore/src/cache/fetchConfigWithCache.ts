import { FetchConfigWithCacheParams } from "../types";

/**
 * Returns cached configuration or fetches and caches new configuration if cache is not valid.
 */
export const fetchConfigWithCache = async ({
  cacheManager,
  domain,
  multistore,
}: FetchConfigWithCacheParams) => {
  const cachedConfiguration = await cacheManager.get(domain);

  if (cachedConfiguration) {
    return cachedConfiguration;
  }

  const fetchedConfiguration = await multistore.fetchConfiguration({ domain });

  Object.entries(fetchedConfiguration).forEach(
    ([configDomain, domainConfiguration]) => {
      cacheManager.set(configDomain, domainConfiguration);
    }
  );

  return fetchedConfiguration[domain];
};
