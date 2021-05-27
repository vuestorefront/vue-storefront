import { Context } from '@vue-storefront/core';

const loadCurrentCart = async (context: Context, customQuery) => {
  const { data: profileData } = await context.$ct.api.getMe({ customer: false }, customQuery);

  if (profileData.me.activeCart) {
    return profileData.me.activeCart;
  }

  const { data } = await context.$ct.api.createCart({}, customQuery);

  return data.cart;
};

export default loadCurrentCart;
