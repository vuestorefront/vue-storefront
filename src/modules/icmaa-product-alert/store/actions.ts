import { ActionTree } from 'vuex'
import { entities } from 'config'
import RootState from '@vue-storefront/core/types/RootState'
import Product from '@vue-storefront/core/modules/catalog/types/Product'
import ProductAlertState from '../types/ProductAlertState'
import ProductAlertService from '../data-resolver/ProductAlertService'
import * as types from './mutation-types'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'

const actions: ActionTree<ProductAlertState, RootState> = {
  async addProductStockAlert ({ commit }, productId: string): Promise<boolean> {
    const addProduct = await ProductAlertService.addProductStockAlert(productId)
    if (addProduct) {
      commit(types.ICMAA_PRODUCT_ALERT_ADD_STOCK, productId)
    }

    return addProduct
  },
  async fetchProductStockAlerts ({ commit }): Promise<string[]> {
    const productIds = await ProductAlertService.listProductStockAlerts()
    if (productIds) {
      commit(types.ICMAA_PRODUCT_ALERT_SET_STOCK, productIds)
    }

    return productIds as string[] || []
  },
  async removeProductStockAlert ({ commit, getters }, productId: string): Promise<boolean> {
    const product = await ProductAlertService.removeProductStockAlert(productId)
    if (product) {
      commit(types.ICMAA_PRODUCT_ALERT_RMV_STOCK, productId)

      const parentId = getters.getParentProductByStockItem(productId).id
      const hasSameParent = getters.getStockItems.filter(i => parentId === getters.getParentProductByStockItem(i).id)
      if (hasSameParent.length < 1) {
        commit(types.ICMAA_PRODUCT_ALERT_RMV_PRODUCTS_DATA, parentId)
      }
    }

    return true
  },
  clearProductStockAlerts ({ commit }): void {
    commit(types.ICMAA_PRODUCT_ALERT_CLR_STOCK)
  },
  async fetchParentProductsByStockIds ({ commit, dispatch }, productId: string[]): Promise<Product[]> {
    let query = new SearchQuery()
    query.applyFilter({key: 'configurable_children.id', value: { 'eq': productId }})

    let { includeFields, excludeFields } = entities.productList
    excludeFields = excludeFields.filter(f => f !== 'configurable_options')
    includeFields.push('configurable_options.*')

    return dispatch('product/findProducts', { query, includeFields, excludeFields }, { root: true })
      .then(products => {
        commit(types.ICMAA_PRODUCT_ALERT_SET_PRODUCTS_DATA, products.items)
        return products.items
      })
  }
}

export default actions
