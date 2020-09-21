import { createCart, getMe } from '@vue-storefront/commercetools-api';

const loadCurrentCart = async (customQueryFn = (user = null, cart = null) => ({ cart, user })) => {
  const { user, cart } = customQueryFn();
  const { data: profileData } = await getMe({ customer: true }, user);
  if (profileData.me.activeCart) return profileData.me.activeCart;
  const { data } = await createCart({}, cart);
  return data.cart;
};

export default loadCurrentCart;
