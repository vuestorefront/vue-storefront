import * as types from '@vue-storefront/core/modules/cart/store/mutation-types'
import { Logger } from '@vue-storefront/core/lib/logger'
import { isServer } from '@vue-storefront/core/helpers'
import config from 'config'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { CartService } from '@vue-storefront/core/data-resolver'
import { createDiffLog } from '@vue-storefront/core/modules/cart/helpers'
import i18n from '@vue-storefront/i18n'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { cartHooksExecutors } from '../../hooks'

const synchronizeActions = {
  async load ({ commit, dispatch }, { forceClientState = false }: {forceClientState?: boolean} = {}) {
    if (isServer) return

    dispatch('setDefaultCheckoutMethods')
    const storedItems = await StorageManager.get('cart').getItem('current-cart')
    commit(types.CART_LOAD_CART, storedItems)
    dispatch('synchronizeCart', { forceClientState })

    cartHooksExecutors.afterLoad(storedItems)
  },
  syncCartWhenLocalStorageChange ({ commit }, { items }) {
    commit(types.CART_LOAD_CART, items)
  },
  async synchronizeCart ({ commit, dispatch }, { forceClientState }) {
    const { synchronize, serverMergeByDefault } = config.cart
    if (!synchronize) return
    const cartStorage = StorageManager.get('cart')
    const token = await cartStorage.getItem('current-cart-token')
    const hash = await cartStorage.getItem('current-cart-hash')

    if (hash) {
      commit(types.CART_SET_ITEMS_HASH, hash)
      Logger.info('Cart hash received from cache.', 'cache', hash)()
    }
    if (token) {
      commit(types.CART_LOAD_CART_SERVER_TOKEN, token)
      Logger.info('Cart token received from cache.', 'cache', token)()
      Logger.info('Syncing cart with the server.', 'cart')()
      dispatch('sync', { forceClientState, dryRun: !serverMergeByDefault })
    }
    await dispatch('create')
  },
  /** @deprecated backward compatibility only */
  async serverPull ({ dispatch }, { forceClientState = false, dryRun = false }) {
    Logger.warn('The "cart/serverPull" action is deprecated and will not be supported with the Vue Storefront 1.11', 'cart')()
    return dispatch('sync', { forceClientState, dryRun })
  },
  async sync ({ getters, rootGetters, commit, dispatch, state }, { forceClientState = false, dryRun = false, mergeQty = false, forceSync = false }) {
    const shouldUpdateClientState = rootGetters['checkout/isUserInCheckout'] || forceClientState
    const { getCartItems, canUpdateMethods, isSyncRequired, bypassCounter } = getters
    if ((!canUpdateMethods || !isSyncRequired) && !forceSync) return createDiffLog()
    commit(types.CART_SET_SYNC)
    const { result, resultCode } = await CartService.getItems()
    const { serverItems, clientItems } = cartHooksExecutors.beforeSync({ clientItems: getCartItems, serverItems: result })

    if (resultCode === 200) {
      const diffLog = await dispatch('merge', {
        dryRun,
        serverItems,
        clientItems,
        forceClientState: shouldUpdateClientState,
        mergeQty
      })
      cartHooksExecutors.afterSync(diffLog)
      return diffLog
    }

    if (bypassCounter < config.queues.maxCartBypassAttempts) {
      Logger.log('Bypassing with guest cart' + bypassCounter, 'cart')()
      commit(types.CART_UPDATE_BYPASS_COUNTER, { counter: 1 })
      await dispatch('connect', { guestCart: true })
    }

    Logger.error(result, 'cart')
    cartHooksExecutors.afterSync(result)
    commit(types.CART_SET_ITEMS_HASH, getters.getCurrentCartHash)
    return createDiffLog()
  },
  async stockSync ({ dispatch, commit, getters }, stockTask) {
    const product = { sku: stockTask.product_sku }

    const cartItem = await dispatch('getItem', { product })

    if (!cartItem || stockTask.result.code === 'ENOTFOUND') return

    if (!stockTask.result.is_in_stock) {
      if (!config.stock.allowOutOfStockInCart && !config.cart.synchronize) {
        Logger.log('Removing product from cart' + stockTask.product_sku, 'stock')()
        commit(types.CART_DEL_ITEM, { product: { sku: stockTask.product_sku } }, { root: true })
        return
      }

      dispatch('updateItem', {
        product: { errors: { stock: i18n.t('Out of the stock!') }, sku: stockTask.product_sku, is_in_stock: false }
      })

      return
    }

    dispatch('updateItem', {
      product: { info: { stock: i18n.t('In stock!') }, sku: stockTask.product_sku, is_in_stock: true }
    })
    EventBus.$emit('cart-after-itemchanged', { item: cartItem })
    commit(types.CART_SET_ITEMS_HASH, getters.getCurrentCartHash)
  }
}

export default synchronizeActions
