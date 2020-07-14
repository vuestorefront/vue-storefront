import { generateToken, AYC_WISHLIST_TOKEN } from '@vue-storefront/about-you/nuxt/helpers/utils/generateToken';

export const getWishlistToken = context => {
  let token = context.$cookies.get(AYC_WISHLIST_TOKEN);

  if (token) {
    return token;
  }

  token = generateToken();

  context.$cookies.set(AYC_WISHLIST_TOKEN, token);

  return token;
};
