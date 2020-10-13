import { createMyShoppingList, getMyShoppingList } from '@vue-storefront/commercetools-api';

const loadCurrentShoppingList = async (customQueryFn = (user = null) => ({user })) => {
  const { user } = customQueryFn();
  const { data: profileData } = await getMyShoppingList({ customer: false }, user);

  if (profileData.me.activeCart) {
    return profileData.me.activeCart;
  }

  const { data } = await createMyShoppingList({}, wishlist);

  return data.wishlist;
};

export default loadCurrentShoppingList;
