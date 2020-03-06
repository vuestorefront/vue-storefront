import { GoogleTagManagerState } from '../types/GoogleTagManagerState'
import { GetterTree } from 'vuex'

export const getters: GetterTree<GoogleTagManagerState, any> = {
  product_list: state => state.product_list,
  product_current: state => state.product_current,
  product_click: state => state.product_click,
  product_wishlist: state => state.product_wishlist,
  product_compare: state => state.product_compare,
  cart: state => state.cart,
  checkout: state => state.checkout,
  checkout_option: state => state.checkout_option,
  order_details: state => state.order_details,
  promo_click: state => state.promo_click,
  promo_view: state => state.promo_view
}
