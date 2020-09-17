import { createCart, getMe } from '@vue-storefront/commercetools-api';

const loadCurrentCart = async (customQuery) => {
  const { data: profileData } = await getMe(customQuery);
  if (profileData.me.activeCart) return profileData.me.activeCart;
  const { data } = await createCart(customQuery);
  return data.cart;
};

export default loadCurrentCart;
