
const loadCurrentCart = async (api, customQueryFn = (user = null, cart = null) => ({ cart, user })) => {
  const { user, cart } = customQueryFn();
  const { data: profileData } = await api.getMe({ customer: false }, user);

  if (profileData.me.activeCart) {
    return profileData.me.activeCart;
  }

  const { data } = await api.createCart(cart);

  return data.cart;
};

export default loadCurrentCart;
