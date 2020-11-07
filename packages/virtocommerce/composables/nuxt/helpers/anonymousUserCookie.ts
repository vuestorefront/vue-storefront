function generate4RandomChars() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function generateUUID() {
  return `${generate4RandomChars()}-${generate4RandomChars()}-${generate4RandomChars()}-${generate4RandomChars()}`;
}

  
export const getAnonymousUserId = context => {
  let id = context.$cookies.get(ANONYMOUS_USER_ID_COOKIE);

  if (id) {
    return id;
  }

  id = generateUUID();

  context.$cookies.set(ANONYMOUS_USER_ID_COOKIE, id);

  return id;
};

export const ANONYMOUS_USER_ID_COOKIE = 'VC_ANONYMOUS_USER_ID';


