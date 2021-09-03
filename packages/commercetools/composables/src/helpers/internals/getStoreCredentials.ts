export interface StoreCredentials {
  storeKey?: string;
  channelId?: string;
}

export function getStoreCredentials (store: string | undefined): StoreCredentials {
  const [storeKey, channelId] = store?.split('/') ?? [];
  return { storeKey, channelId };
}

export function getStoreKey (store: string | undefined): StoreCredentials['storeKey'] {
  return getStoreCredentials(store).storeKey;
}

export function getChannelId (store: string | undefined): StoreCredentials['channelId'] {
  return getStoreCredentials(store).channelId;
}
