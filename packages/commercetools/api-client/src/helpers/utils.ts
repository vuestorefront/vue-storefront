export const isAnonymousSession = (token) => token?.scope?.includes('anonymous_id');
export const isUserSession = (token) => token?.scope?.includes('customer_id');
export const getAccessToken = (token) => token ? token.access_token : null;
export const getStoreKey = (store: string | undefined) => store
  ? ({ storeKey: store?.split('/')[0] })
  : {};
