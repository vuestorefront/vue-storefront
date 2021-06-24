import * as types from '@vue-storefront/core/modules/cart/store/mutation-types'
import { Logger } from '@vue-storefront/core/lib/logger'
import config from 'config'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { CartService } from '@vue-storefront/core/data-resolver'
import {
  productsEquals,
  createDiffLog,
  notifications,
  createCartItemForUpdate
} from '@vue-storefront/core/modules/cart/helpers'
import CartItem from '@vue-storefront/core/modules/cart/types/CartItem';
import { cartHooksExecutors } from './../../hooks'

const mergeActions = {
  async updateClientItem ({ dispatch }, { clientItem, serverItem }) {
    const cartItem = clientItem === null ? await dispatch('getItem', serverItem) : clientItem

    if (!cartItem || typeof serverItem.item_id === 'undefined') return

    const product = {
      server_item_id: serverItem.item_id,
      sku: cartItem.sku,
      server_cart_id: serverItem.quote_id,
      prev_qty: cartItem.qty,
      product_option: serverItem.product_option,
      type_id: serverItem.product_type
    }

    await dispatch('updateItem', { product })
    EventBus.$emit('cart-after-itemchanged', { item: cartItem })
  },
  async updateServerItem ({ getters, rootGetters, commit, dispatch }, { clientItem, serverItem, updateIds, mergeQty }) {
    const diffLog = createDiffLog()
    const cartItem = createCartItemForUpdate(clientItem, serverItem, updateIds, mergeQty)
    const event = await CartService.updateItem(getters.getCartToken, cartItem)
    const wasUpdatedSuccessfully = event.resultCode === 200
    Logger.debug('Cart item server sync' + event, 'cart')()
    diffLog.pushServerResponse({ status: event.resultCode, sku: clientItem.sku, result: event })

    if (!wasUpdatedSuccessfully && !serverItem) {
      commit(types.CART_DEL_ITEM, { product: clientItem, removeByParentSku: false })
      return diffLog
    }

    if (!wasUpdatedSuccessfully && (clientItem.server_item_id || clientItem.item_id)) {
      await dispatch('restoreQuantity', { product: clientItem })
      return diffLog
    }

    if (!wasUpdatedSuccessfully) {
      Logger.warn('Removing product from cart', 'cart', clientItem)()
      commit(types.CART_DEL_NON_CONFIRMED_ITEM, { product: clientItem })
      return diffLog
    }

    if (!rootGetters['checkout/isUserInCheckout']) {
      const isThisNewItemAddedToTheCart = (!clientItem || !clientItem.server_item_id)
      diffLog.pushNotification(
        isThisNewItemAddedToTheCart ? notifications.productAddedToCart() : notifications.productQuantityUpdated()
      )
    }

    await dispatch('updateClientItem', { clientItem, serverItem: event.result })

    return diffLog
  },
  async synchronizeServerItem ({ dispatch }, { serverItem, clientItem, forceClientState, dryRun, mergeQty }) {
    const diffLog = createDiffLog()

    if (!serverItem) {
      Logger.warn('No server item with sku ' + clientItem.sku + ' on stock.', 'cart')()
      diffLog.pushServerParty({ sku: clientItem.sku, status: 'no-item' })

      if (dryRun) return diffLog
      if (forceClientState || !config.cart.serverSyncCanRemoveLocalItems) {
        const updateServerItemDiffLog = await dispatch('updateServerItem', { clientItem, serverItem, updateIds: false })
        return diffLog.merge(updateServerItemDiffLog)
      }

      await dispatch('removeItem', { product: clientItem })
      return diffLog
    }

    if (serverItem.qty !== clientItem.qty || mergeQty) {
      Logger.log('Wrong qty for ' + clientItem.sku, clientItem.qty, serverItem.qty)()
      diffLog.pushServerParty({ sku: clientItem.sku, status: 'wrong-qty', 'client-qty': clientItem.qty, 'server-qty': serverItem.qty })
      if (dryRun) return diffLog
      if (forceClientState || !config.cart.serverSyncCanModifyLocalItems) {
        const updateServerItemDiffLog = await dispatch('updateServerItem', { clientItem, serverItem, updateIds: true, mergeQty })

        return diffLog.merge(updateServerItemDiffLog)
      }

      await dispatch('updateItem', { product: serverItem })
    }

    return diffLog
  },
  async mergeClientItem ({ dispatch }, { clientItem, serverItems, forceClientState, dryRun, mergeQty }) {
    const serverItem = serverItems.find(itm => productsEquals(itm, clientItem))
    const diffLog = await dispatch('synchronizeServerItem', { serverItem, clientItem, forceClientState, dryRun, mergeQty })

    if (!diffLog.isEmpty()) return diffLog

    Logger.info('Server and client item with SKU ' + clientItem.sku + ' synced. Updating cart.', 'cart', 'cart')()
    if (!dryRun) {
      const product = {
        sku: clientItem.sku,
        server_cart_id: serverItem.quote_id,
        server_item_id: serverItem.item_id,
        product_option: serverItem.product_option,
        type_id: serverItem.product_type
      }

      await dispatch('updateItem', { product })
    }

    return diffLog
  },
  async mergeClientItems ({ dispatch }, { clientItems, serverItems, forceClientState, dryRun, mergeQty }) {
    const diffLog = createDiffLog()

    for (const clientItem of clientItems) {
      try {
        const mergeClientItemDiffLog = await dispatch('mergeClientItem', { clientItem, serverItems, forceClientState, dryRun, mergeQty })
        diffLog.merge(mergeClientItemDiffLog)
      } catch (e) {
        Logger.debug('Problem syncing clientItem', 'cart', clientItem)()
      }
    }

    return diffLog
  },
  async mergeServerItem ({ dispatch, getters }, { clientItems, serverItem, forceClientState, dryRun }) {
    const diffLog = createDiffLog()
    const clientItem = clientItems.find(itm => productsEquals(itm, serverItem))
    if (clientItem) return diffLog
    Logger.info('No client item for' + serverItem.sku, 'cart')()
    diffLog.pushClientParty({ sku: serverItem.sku, status: 'no-item' })
    if (dryRun) return diffLog

    if (forceClientState) {
      Logger.info('Removing product from cart', 'cart', serverItem)()
      Logger.log('Removing item' + serverItem.sku + serverItem.item_id, 'cart')()
      const cartItem = {
        sku: serverItem.sku,
        item_id: serverItem.item_id,
        quoteId: serverItem.quote_id
      } as any as CartItem

      const resp = await CartService.deleteItem(getters.getCartToken, cartItem)
      return diffLog.pushServerResponse({ status: resp.resultCode, sku: serverItem.sku, result: resp })
    }

    const productToAdd = await dispatch('getProductVariant', { serverItem })

    if (productToAdd) {
      await dispatch('addItem', { productToAdd, forceServerSilence: true })
      Logger.debug('Product variant for given serverItem has not found', 'cart', serverItem)()
    }

    return diffLog
  },
  async mergeServerItems ({ dispatch }, { serverItems, clientItems, forceClientState, dryRun }) {
    const diffLog = createDiffLog()
    const definedServerItems = serverItems.filter(serverItem => serverItem)

    for (const serverItem of definedServerItems) {
      try {
        const mergeServerItemDiffLog = await dispatch('mergeServerItem', { clientItems, serverItem, forceClientState, dryRun })
        diffLog.merge(mergeServerItemDiffLog)
      } catch (e) {
        Logger.debug('Problem syncing serverItem', 'cart', serverItem)()
      }
    }

    return diffLog
  },
  async updateTotalsAfterMerge ({ dispatch, getters, commit }, { clientItems, dryRun }) {
    if (dryRun) return

    if (getters.isTotalsSyncRequired && clientItems.length > 0) {
      await dispatch('syncTotals')
    }

    commit(types.CART_SET_ITEMS_HASH, getters.getCurrentCartHash)
  },
  async merge ({ getters, dispatch }, { serverItems, clientItems, dryRun = false, forceClientState = false, mergeQty = false }) {
    const hookResult = cartHooksExecutors.beforeSync({ clientItems, serverItems })

    const diffLog = createDiffLog()
    const mergeParameters = {
      clientItems: hookResult.clientItems,
      serverItems: hookResult.serverItems,
      forceClientState,
      dryRun,
      mergeQty
    }
    const mergeClientItemsDiffLog = await dispatch('mergeClientItems', mergeParameters)
    const mergeServerItemsDiffLog = await dispatch('mergeServerItems', mergeParameters)
    await dispatch('updateTotalsAfterMerge', { clientItems, dryRun })

    diffLog
      .merge(mergeClientItemsDiffLog)
      .merge(mergeServerItemsDiffLog)
      .pushClientParty({ status: getters.isCartHashChanged ? 'update-required' : 'no-changes' })
      .pushServerParty({ status: getters.isTotalsSyncRequired ? 'update-required' : 'no-changes' })

    EventBus.$emit('servercart-after-diff', { diffLog: diffLog, serverItems: hookResult.serverItems, clientItems: hookResult.clientItems, dryRun: dryRun })
    Logger.info('Client/Server cart synchronised ', 'cart', diffLog)()

    return diffLog
  }
}

export default mergeActions
