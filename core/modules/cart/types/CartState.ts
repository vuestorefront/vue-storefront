import { ProductDiscountedPrice } from '@vue-storefront/core/modules/catalog';

export default interface CartState {
  isMicrocartOpen: boolean,
  itemsAfterPlatformTotals: any,
  platformTotals: any,
  platformTotalSegments: any,
  cartIsLoaded: boolean,
  cartServerToken: string,
  shipping: any,
  payment: any,
  cartItemsHash: string,
  cartServerLastSyncDate: number,
  cartServerLastTotalsSyncDate: number,
  cartItems: any[],
  connectBypassCount: number,
  isAddingToCart: boolean,
  isLocalDataLoaded: boolean,
  productDiscountedPrice: Record<string, ProductDiscountedPrice>,
  isShippingMethodsSyncing: boolean,
  isCartSyncing: boolean,
  isTotalsSyncing: boolean,
  isPaymentMethodsSyncing: boolean,
  isCouponProcessing: boolean,
  exchangeRate: number
}
