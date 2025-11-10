import { GetterTree } from 'vuex'
import sumBy from 'lodash-es/sumBy'
import CartState from '../types/CartState'
import RootState from '@vue-storefront/core/types/RootState'
import AppliedCoupon from '../types/AppliedCoupon'
import { onlineHelper, isServer, calcItemsHmac, PriceHelper } from '@vue-storefront/core/helpers'
import { calculateTotals } from '@vue-storefront/core/modules/cart/helpers'
import config from 'config'

import CartItem from '../types/CartItem'
import getCartItemKey from '../helpers/get-cart-item-key.function'
import { IS_SHIPPING_METHODS_SYNCING, IS_CART_SYNCING, IS_TOTALS_SYNCING, IS_PAYMENT_METHODS_SYNCING, IS_COUPON_PROCESSING } from './getter-types'

const getters: GetterTree<CartState, RootState> = {
  getCartToken: state => state.cartServerToken,
  getLastSyncDate: state => state.cartServerLastSyncDate,
  getLastTotalsSyncDate: state => state.cartServerLastTotalsSyncDate,
  getShippingMethod: state => state.shipping,
  getPaymentMethod: state => state.payment,
  getLastCartHash: state => state.cartItemsHash,
  getCurrentCartHash: state => calcItemsHmac(state.cartItems, state.cartServerToken),
  isCartHashChanged: (state, getters) => getters.getCurrentCartHash !== state.cartItemsHash,
  isSyncRequired: (state, getters) => getters.isCartHashEmptyOrChanged || !state.cartServerLastSyncDate,
  isTotalsSyncRequired: (state, getters) => getters.isCartHashEmptyOrChanged || !state.cartServerLastTotalsSyncDate,
  isCartHashEmptyOrChanged: (state, getters) => !state.cartItemsHash || getters.isCartHashChanged,
  getCartItems: state => state.cartItems,
  isTotalsSyncEnabled: () => config.cart.synchronize_totals && onlineHelper.isOnline && !isServer,
  isCartConnected: state => !!state.cartServerToken,
  isCartSyncEnabled: () => config.cart.synchronize && onlineHelper.isOnline && !isServer,
  getFirstShippingMethod: state => state.shipping instanceof Array ? state.shipping[0] : state.shipping,
  getFirstPaymentMethod: state => state.payment instanceof Array ? state.payment[0] : state.payment,
  getTotals: ({ cartItems, platformTotalSegments }, getters) =>
    (platformTotalSegments && onlineHelper.isOnline) ? platformTotalSegments : calculateTotals(getters.getFirstShippingMethod, getters.getFirstPaymentMethod, cartItems),
  getItemsTotalQuantity: ({ cartItems }) => config.cart.minicartCountType === 'items' ? cartItems.length : sumBy(cartItems, p => p.qty),
  getCoupon: ({ platformTotals }): AppliedCoupon | false =>
    !(platformTotals && platformTotals.hasOwnProperty('coupon_code')) ? false : { code: platformTotals.coupon_code, discount: platformTotals.discount_amount },
  isVirtualCart: ({ cartItems }) => cartItems.length ? cartItems.every((item) => item.extension_attributes?.is_virtual) : false,
  canUpdateMethods: (state, getters) => getters.isCartSyncEnabled && getters.isCartConnected,
  canSyncTotals: (state, getters) => getters.isTotalsSyncEnabled && getters.isCartConnected,
  isCartEmpty: state => state.cartItems.length === 0,
  bypassCounter: state => state.connectBypassCount,
  getShippingMethodCode: state => state.shipping && state.shipping.method_code,
  getPaymentMethodCode: state => state.payment && state.payment.code,
  getIsAdding: state => state.isAddingToCart,
  getIsMicroCartOpen: state => state.isMicrocartOpen,
  isLocalDataLoaded: state => state.isLocalDataLoaded,
  localizedCartItemPriceDictionary: (state, getters) => {
    const _cartItemPriceDictionary = getters.cartItemPriceDictionary;
    const prices: Record<string, PriceHelper.ProductPrice> = {};
    const exchangeRate: number = state.exchangeRate;

    for (const key of Object.keys(_cartItemPriceDictionary)) {
      const price = _cartItemPriceDictionary[key];

      prices[key] = {
        regular: price.regular * exchangeRate,
        special: price.special === null
          ? null
          : price.special * exchangeRate
      }
    }

    return prices;
  },
  cartItemPriceDictionary: (
    state,
    getters
  ): Record<string, PriceHelper.ProductPrice> => {
    const cartItems: CartItem[] = getters['getCartItems'];
    const cartItemPrices: Record<string, PriceHelper.ProductPrice> = {};

    for (const cartItem of cartItems) {
      const cartItemKey = getCartItemKey(cartItem);

      cartItemPrices[cartItemKey] = PriceHelper.getCartItemPrice(
        cartItem,
        state.productDiscountedPrice
      );
    }

    return cartItemPrices;
  },
  getCartItemPrice: (state, getters): (cartItem: CartItem) => PriceHelper.ProductPrice => {
    return (cartItem: CartItem) => {
      const cartItemKey = getCartItemKey(cartItem);
      const price: PriceHelper.ProductPrice | undefined =
        cartItemKey
          ? getters['cartItemPriceDictionary'][cartItemKey]
          : undefined;

      if (price) {
        return price;
      }

      return PriceHelper.getCartItemPrice(
        cartItem,
        state.productDiscountedPrice
      )
    }
  },
  [IS_SHIPPING_METHODS_SYNCING]: (state) => state.isShippingMethodsSyncing,
  [IS_CART_SYNCING]: (state) => state.isCartSyncing,
  [IS_TOTALS_SYNCING]: (state) => state.isTotalsSyncing,
  [IS_PAYMENT_METHODS_SYNCING]: (state) => state.isPaymentMethodsSyncing,
  [IS_COUPON_PROCESSING]: (state) => state.isCouponProcessing
}

export default getters
