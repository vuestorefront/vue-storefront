import { createCart, getMe } from '@vue-storefront/commercetools-api';

const loadCurrentCart = async ({ cart, user }) => {
  if (user) {
    const { data: profileData } = await getMe(user);
    if (profileData.me.activeCart) return profileData.me.activeCart;
  }
  if (cart) {
    const { data } = await createCart(cart);
    return data.cart;
  }
};

export default loadCurrentCart;
