export const isAnonymousSession = (token) => token && token.scope && token.scope.includes('anonymous_id');
export const isUserSession = (token) => token && token.scope && token.scope.includes('customer_id');
export const getAccessToken = (token) => token ? token.access_token : null;
