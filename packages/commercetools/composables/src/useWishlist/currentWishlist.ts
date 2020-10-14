import { createMyShoppingList, getMyShoppingList } from '@vue-storefront/commercetools-api';

const loadCurrentShoppingList = async (customQueryFn = (wishlist = null) => ({ wishlist })) => {
  const { wishlist } = customQueryFn();
  const { data: profileData } = await getMyShoppingList({ customer: false });

  if (profileData.me.activeCart) {
    return profileData.me.activeCart;
  }

  const { data } = await createMyShoppingList({}, wishlist);

  return data.wishlist;
};

export default loadCurrentShoppingList;
