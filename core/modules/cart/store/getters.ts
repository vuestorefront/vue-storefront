import { GetterTree } from 'vuex'
import sumBy from 'lodash-es/sumBy'
import i18n from '@vue-storefront/i18n'
import CartState from '../types/CartState'
import RootState from '@vue-storefront/core/types/RootState'
import AppliedCoupon from '../types/AppliedCoupon'
import { onlineHelper, isServer, calcItemsHmac } from '@vue-storefront/core/helpers'
import config from 'config'
import { Logger } from '@vue-storefront/core/lib/logger'

const getters: GetterTree<CartState, RootState> = {
  getCartToken (state) {
    return state.cartServerToken
  },
  getLastSyncDate (state) {
    return state.cartServerLastSyncDate
  },
  getLastTotalsSyncDate (state) {
    return state.cartServerLastTotalsSyncDate
  },
  getShippingMethod (state) {
    return state.shipping
  },
  getPaymentMethod (state) {
    return state.payment
  },
  getLastCartHash (state) {
    return state.cartItemsHash
  },
  getCurrentCartHash (state) {
    return calcItemsHmac(state.cartItems, state.cartServerToken)
  },
  isCartHashChanged (state, getters) {
    return getters.getCurrentCartHash !== state.cartItemsHash
  },
  isSyncRequired (state, getters) {
    return !state.cartItemsHash || (getters.getCurrentCartHash !== state.cartItemsHash) || !state.cartServerLastSyncDate // first load - never synced
  },
  isTotalsSyncRequired (state, getters) {
    return !state.cartItemsHash || (getters.getCurrentCartHash !== state.cartItemsHash) || !state.cartServerLastTotalsSyncDate // first load - never synced
  },
  isCartHashEmtpyOrChanged (state, getters) {
    return !state.cartItemsHash || (getters.getCurrentCartHash !== state.cartItemsHash)
  },
  getCartItems (state) {
    return state.cartItems
  },
  isTotalsSyncEnabled (state) {
    return config.cart.synchronize_totals && onlineHelper.isOnline && !isServer
  },
  isCartConnected (state) {
    return !!state.cartServerToken
  },
  isCartSyncEnabled (state) {
    return config.cart.synchronize && onlineHelper.isOnline && !isServer
  },
  getTotals (state) {
    if (state.platformTotalSegments && onlineHelper.isOnline) {
      return state.platformTotalSegments
    } else {
      let shipping = state.shipping instanceof Array ? state.shipping[0] : state.shipping
      let payment = state.payment instanceof Array ? state.payment[0] : state.payment
      const totalsArray = [
        {
          code: 'subtotalInclTax',
          title: i18n.t('Subtotal incl. tax'),
          value: sumBy(state.cartItems, (p) => {
            return p.qty * p.priceInclTax
          })
        },
        {
          code: 'grand_total',
          title: i18n.t('Grand total'),
          value: sumBy(state.cartItems, (p) => {
            return p.qty * p.priceInclTax + (shipping ? shipping.price_incl_tax : 0)
          })
        }
      ]
      if (payment) {
        totalsArray.push({
          code: 'payment',
          title: i18n.t(payment.title),
          value: payment.costInclTax
        })
      }
      if (shipping) {
        totalsArray.push({
          code: 'shipping',
          title: i18n.t(shipping.method_title),
          value: shipping.price_incl_tax
        })
      }
      return totalsArray
    }
  },
  getItemsTotalQuantity (state, getters, rootStore) {
    if (config.cart.minicartCountType === 'items') {
      return state.cartItems.length
    }

    return sumBy(state.cartItems, (p) => {
      return p.qty
    })
  },
  getCoupon (state): AppliedCoupon | false {
    if (!(state.platformTotals && state.platformTotals.hasOwnProperty('coupon_code'))) {
      return false
    }
    return {
      code: state.platformTotals.coupon_code,
      discount: state.platformTotals.discount_amount
    }
  },
  /** @deprecated */
  coupon (state) {
    Logger.error('The getter cart.coupon has been deprecated please change to cart.getters.getCoupon()')()
  },
  /** @deprecated */
  totalQuantity (state) {
    Logger.error('The getter cart.totalQuantity has been deprecated please change to cart.getters.getItemsTotalQuantity()')()
  },
  /** @deprecated */
  totals (state) {
    Logger.error('The getter cart.totals has been deprecated please change to cart.getters.getTotals()')()
  },
  isVirtualCart (state) {
    return state.cartItems.every((itm) => {
      return itm.type_id === 'downloadable' || itm.type_id === 'virtual' // check for downloadable & virtual products
    })
  }
}

export default getters
