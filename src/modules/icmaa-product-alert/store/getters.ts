import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import Product from '@vue-storefront/core/modules/catalog/types/Product'
import ProductAlert from '../types/ProductAlertState'

const getters: GetterTree<ProductAlert, RootState> = {
  getStockItems: (state): string[] => state.stock,
  hasSubscribedToStockItem: (state) => (productId): boolean => state.stock.includes(productId),
  getChildProductIdByCurrentProductOption: (state, getters, RootState, rootGetters) =>
    (option: { type: string, id: string }): string|boolean => {
      const confChildren = rootGetters['product/getCurrentProduct'].configurable_children
      const childProduct = confChildren.find(c => c[option.type] === option.id)
      if (childProduct) {
        return childProduct.id
      }
      return false
    },
  isOptionSubscribedToStock: (state, getters) => (option): boolean => {
    const product = getters.getChildProductIdByCurrentProductOption(option)
    if (!product) {
      return false
    }

    return getters.hasSubscribedToStockItem(product)
  },
  getProducts: (state): Product[] => state.product,
  getParentProductByStockItem: (state, getters) => (stockId: string): Product =>
    getters.getProducts.find(p => p.configurable_children.find(c => c.id === stockId))
}

export default getters
