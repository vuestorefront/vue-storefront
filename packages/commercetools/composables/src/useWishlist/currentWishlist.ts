import { createMyShoppingList, getMe } from '@vue-storefront/commercetools-api';

const loadCurrentShoppingList = async (customQueryFn = (user = null, wishlist = null) => ({ user, wishlist })) => {
  const { user, wishlist } = customQueryFn();
  const { data: profileData } = await getMe({ customer: false }, user);

  if (profileData.me.shoppingList) {
    return profileData.me.shoppingList;
  }

  const { data } = await createMyShoppingList({}, wishlist);

  return data.wishlist;
};

export default loadCurrentShoppingList;
