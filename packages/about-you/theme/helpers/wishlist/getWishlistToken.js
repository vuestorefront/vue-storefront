export const getWishlistToken = context => {
  // eslint-disable-next-line
  const { generateToken } = require('@vue-storefront/about-you-theme/helpers/utils/generateToken');
  const AYC_WISHLIST_TOKEN = 'vsf-ayc-wishlist-token';
  let token = context.$cookies.get(AYC_WISHLIST_TOKEN);

  if (token) {
    return token;
  }

  token = generateToken();

  context.$cookies.set(AYC_WISHLIST_TOKEN, token);

  return token;
};
