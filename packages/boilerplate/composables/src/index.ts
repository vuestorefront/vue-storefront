/* istanbul ignore file */

import useCart from './useCart';
import useCategory from './useCategory';
import useCheckout from './useCheckout';
import useContent from './useContent';
import useFacet from './useFacet';
import useProduct from './useProduct';
import useReview from './useReview';
import useUser from './useUser';
import useUserBilling from './useUserBilling';
import useUserOrders from './useUserOrders';
import useUserShipping from './useUserShipping';
import useWishlist from './useWishlist';
import { createApiClient } from '@vue-storefront/boilerplate-api';
import { integrationPluginFactory } from '@vue-storefront/core';

const integrationPlugin = integrationPluginFactory(createApiClient);

export {
  integrationPlugin,
  useCart,
  useCategory,
  useCheckout,
  useContent,
  useFacet,
  useProduct,
  useReview,
  useUser,
  useUserBilling,
  useUserOrders,
  useUserShipping,
  useWishlist
};

export * from './getters';
