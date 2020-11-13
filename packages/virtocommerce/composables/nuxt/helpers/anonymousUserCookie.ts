function generate4RandomChars() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function generateUUID() {
  return `${generate4RandomChars()}-${generate4RandomChars()}-${generate4RandomChars()}-${generate4RandomChars()}`;
}

  
export const getUserIdFromCookies = context => {
  let id = context.$cookies.get(VC_USER_ID);

  if (id) {
    return id;
  }

  id = generateUUID();

  context.$cookies.set(VC_USER_ID, id);

  return id;
};

export const VC_USER_ID = 'VC_USER_ID';


