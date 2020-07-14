import { generateToken, AYC_CART_TOKEN } from '@vue-storefront/about-you/nuxt/helpers/utils/generateToken';

export const getCartToken = context => {
  let token = context.$cookies.get(AYC_CART_TOKEN);

  if (token) {
    return token;
  }

  token = generateToken();

  context.$cookies.set(AYC_CART_TOKEN, token);

  return token;
};
