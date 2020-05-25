function generate4RandomChars() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function generateUUID() {
  return `${generate4RandomChars()}-${generate4RandomChars()}-${generate4RandomChars()}-${generate4RandomChars()}`;
}

export function generateToken() {
  return `${generateUUID()}-${(new Date()).getTime()}`;
}
