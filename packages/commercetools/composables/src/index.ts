/* istanbul ignore file */

import useCategory from './useCategory';
import useProduct from './useProduct';
import useCart from './useCart';
import useCheckout from './useCheckout';
import useUser from './useUser';
import useUserOrders from './useUserOrders';
import { useReview } from './useReview';
import useFacet from './useFacet';
import useUserShipping from './useUserShipping';
import useUserBilling from './useUserBilling';
import { setWishlist, useWishlist } from './useWishlist';
import { createApiClient } from '@vue-storefront/commercetools-api';
import { track, integrationPluginFactory } from '@vue-storefront/core';

track('VSFCommercetools');

const integrationPlugin = integrationPluginFactory(createApiClient);

export {
  integrationPlugin,
  useCategory,
  useProduct,
  useCart,
  useCheckout,
  useUser,
  useUserOrders,
  useUserBilling,
  useWishlist,
  useUserShipping,
  setWishlist,
  useReview,
  useFacet
};

export * from './getters';
