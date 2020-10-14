import { createMyShoppingList, getMe } from '@vue-storefront/commercetools-api';

const loadCurrentShoppingList = async (customQueryFn = (user = null, wishlist = null) => ({ user, wishlist })) => {
  const { user, wishlist } = customQueryFn();
  const { data: profileData } = await getMe({ customer: false }, user);

  if (profileData.me.wishlist) {
    return profileData.me.wishlist;
  }

  const { data } = await createMyShoppingList({}, wishlist);

  return data.wishlist;
};

export default loadCurrentShoppingList;
