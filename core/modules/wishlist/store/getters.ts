import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import WishlistState from '../types/WishlistState'

const getters: GetterTree<WishlistState, RootState> = {
  isOnWishlist: state => product =>
    state.items.some(p => p.sku === product.sku),
  isWishlistLoaded: state => state.loaded,
  getWishlistItemsCount: state => state.items.length
}

export default getters
