import { createCart, getMe } from '@vue-storefront/commercetools-api';

const loadCurrentCart = async (context, customQueryFn = (user = null, cart = null) => ({ cart, user })) => {
  const { user, cart } = customQueryFn();
  const { data: profileData } = await getMe(context, { customer: false }, user);

  if (profileData.me.activeCart) {
    return profileData.me.activeCart;
  }

  const { data } = await createCart(context, cart);

  return data.cart;
};

export default loadCurrentCart;
