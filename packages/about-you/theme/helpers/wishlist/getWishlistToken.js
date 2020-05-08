import { generateToken } from '~/helpers/utils/generateToken';

const AYC_WISHLIST_TOKEN = 'vsf-ayc-cart-token';

export const getWishlistToken = context => {
  let token = context.$cookies.get(AYC_WISHLIST_TOKEN);

  if (token) {
    return token;
  }

  token = generateToken();

  context.$cookies.set(AYC_WISHLIST_TOKEN, token);

  return token;
};
