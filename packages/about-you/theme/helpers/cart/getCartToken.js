export const getCartToken = context => {
  // eslint-disable-next-line no-use-before-define
  const { generateToken } = require('@vue-storefront/about-you-theme/helpers/utils/generateToken');
  const AYC_CART_TOKEN = 'vsf-ayc-cart-token';
  let token = context.$cookies.get(AYC_CART_TOKEN);

  if (token) {
    return token;
  }

  token = generateToken();

  context.$cookies.set(AYC_CART_TOKEN, token);

  return token;
};
