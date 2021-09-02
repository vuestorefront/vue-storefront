export interface StoreCredentials {
  storeId?: string;
  channelId?: string;
}

export function getStoreCredentials (store: string | undefined): StoreCredentials {
  const [storeId, channelId] = store?.split('/') ?? [];
  return { storeId, channelId };
}

export function getStoreId (store: string | undefined): StoreCredentials['storeId'] {
  return getStoreCredentials(store).storeId;
}

export function getChannelId (store: string | undefined): StoreCredentials['channelId'] {
  return getStoreCredentials(store).channelId;
}
