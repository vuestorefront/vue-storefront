import { Context } from '@vue-storefront/core';

const loadCurrentCart = async (context: Context, customQueryFn = (user = null, cart = null) => ({ cart, user })) => {
  const { user, cart } = customQueryFn();
  const { data: profileData } = await context.$ct.api.getMe({ customer: false }, user);

  if (profileData.me.activeCart) {
    return profileData.me.activeCart;
  }

  const { data } = await context.$ct.api.createCart({}, cart);

  return data.cart;
};

export default loadCurrentCart;
