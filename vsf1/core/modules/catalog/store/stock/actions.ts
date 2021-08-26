import { ActionTree } from 'vuex'
import * as stockMutationTypes from '@vue-storefront/core/modules/catalog/store/stock/mutation-types'
import RootState from '@vue-storefront/core/types/RootState'
import StockState from '../../types/StockState'
import config from 'config'
import { StockService } from '@vue-storefront/core/data-resolver'
import { getStatus, getProductInfos } from '@vue-storefront/core/modules/catalog/helpers/stock'
import { Logger } from '@vue-storefront/core/lib/logger'

const actions: ActionTree<StockState, RootState> = {
  async queueCheck ({ dispatch }, { product }) {
    const checkStatus = {
      qty: product.stock ? product.stock.qty : 0,
      status: getStatus(product, 'ok')
    }

    if (config.stock.synchronize) {
      const task = await StockService.queueCheck(product.sku, 'cart/stockSync')

      // @ts-ignore
      Logger.debug(`Stock quantity checked for ${task.product_sku}, response time: ${task.transmited_at - task.created_at} ms`, 'stock')()

      return {
        ...checkStatus,
        onlineCheckTaskId: task.task_id
      }
    }

    return {
      ...checkStatus,
      status: getStatus(product, 'volatile')
    }
  },
  async check (context, { product }) {
    if (config.stock.synchronize) {
      const { result, task_id } = await StockService.check(product.sku)

      return {
        qty: result ? result.qty : 0,
        status: getStatus(result, 'ok'),
        isManageStock: result.manage_stock,
        onlineCheckTaskId: task_id
      }
    }

    return {
      qty: product.stock ? product.stock.qty : 0,
      status: getStatus(product, 'volatile')
    }
  },
  async list ({ commit }, { skus }) {
    if (!config.stock.synchronize) return

    const task = await StockService.list(skus)

    if (task.resultCode === 200) {
      const productInfos = getProductInfos(task.result)

      for (const productInfo of productInfos) {
        commit(stockMutationTypes.SET_STOCK_CACHE_PRODUCT, {
          productId: productInfo.product_id,
          productInfo
        })
      }
    }

    return task
  },
  clearCache ({ commit }) {
    commit(stockMutationTypes.SET_STOCK_CACHE, {})
  }
}

export default actions
