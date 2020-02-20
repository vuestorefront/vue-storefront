import { getMe, createCart } from '@vue-storefront/commercetools-api';
import { enhanceProfile, enhanceCart } from './../helpers/internals';

const loadCurrentCart = async () => {
  const profileResponse = await getMe();

  if (profileResponse.data.me.activeCart) {
    const enhancedProfile = enhanceProfile(profileResponse);
    return enhancedProfile.data.me.activeCart;
  }

  const cartResponse = await createCart();

  const enhancedCart = enhanceCart(cartResponse);

  return enhancedCart.data.cart;
};

export default loadCurrentCart;
