import { ActionTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState';
import ProductAlertState from '../types/ProductAlertState'
import ProductAlertService from '../data-resolver/ProductAlertService'
import * as types from './mutation-types'

const actions: ActionTree<ProductAlertState, RootState> = {
  async addProductStockAlert ({ commit, rootGetters }, productId): Promise<boolean> {
    const addProduct = await ProductAlertService.addProductStockAlert(productId)
    if (addProduct) {
      commit(types.ICMAA_PRODUCT_ALERT_ADD_PRODUCT, productId)
    }

    return addProduct
  },
  async fetchProductStockAlerts ({ commit, rootGetters }): Promise<string[]> {
    const productIds = await ProductAlertService.listProductStockAlerts()
    if (productIds) {
      commit(types.ICMAA_PRODUCT_ALERT_SET_PRODUCTS, productIds)
    }

    return productIds as string[] || []
  },
  clearProductStockAlerts ({ commit }): void {
    commit(types.ICMAA_PRODUCT_ALERT_CLR_PRODUCT)
  }
}

export default actions
