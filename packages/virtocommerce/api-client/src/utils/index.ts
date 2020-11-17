export function generate4RandomChars() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

export function generateUUID() {
  return `${generate4RandomChars()}-${generate4RandomChars()}-${generate4RandomChars()}-${generate4RandomChars()}`;
}

export const VC_USER_ID = 'VC_USER_ID';
export const VC_AUTH_TOKEN = 'VC_AUTH_TOKEN';
