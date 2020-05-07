import { generateToken } from '~/helpers/utils/generateToken';

const AYC_CART_TOKEN = 'vsf-ayc-cart-token';

export const getCartToken = context => {
  let token = context.$cookies.get(AYC_CART_TOKEN);

  if (token) {
    return token;
  }

  token = generateToken();

  context.$cookies.set(AYC_CART_TOKEN, token);

  return token;
};
