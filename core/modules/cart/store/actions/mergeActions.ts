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
import productChecksum from '@vue-storefront/core/modules/cart/helpers/productChecksum';
import { SearchQuery } from 'storefront-query-builder'
import { getProductOptions } from 'src/modules/shared'

import { cartHooksExecutors } from './../../hooks'
import ServerItem from '../../types/Servertem'
import { DiffLog } from '../../helpers/createDiffLog'
import { isClientItemHasRequiredServerItemFields } from '../../helpers/is-client-item-has-required-server-item-fields.function'
import {updateClientItemProductData} from '../../helpers/update-client-item-product-data.function';

async function loadServerItemsProducts(serverItems: any[], dispatch) {
  const productSearchQuery = new SearchQuery()
      .applyFilter(
        {
          key: 'sku',
          value: {
            'in': serverItems.map((item) => item.sku)
          }
        }
      );

    await dispatch(
      'product/findProducts',
      {
        query: productSearchQuery,
        size: serverItems.length
      },
      {
        root: true
      }
    )
}

const mergeActions = {
  async updateClientItem({ dispatch }, { clientItem, serverItem }) {
    const cartItem = clientItem === null ? await dispatch('getItem', serverItem) : clientItem

    if (!cartItem || typeof serverItem.item_id === 'undefined') return

    const product: ServerItem = {
      server_item_id: serverItem.item_id,
      sku: cartItem.sku,
      server_cart_id: serverItem.quote_id,
      prev_qty: cartItem.qty,
      product_option: getProductOptions(serverItem),
      type_id: serverItem.product_type
    }

    EventBus.$emit('cart-prepare-item-product', { product, serverItem });

    const productWithChecksum = { ...product, checksum: productChecksum(product) };

    await dispatch('updateItem', { product: productWithChecksum })
    EventBus.$emit('cart-after-itemchanged', { item: cartItem })
  },
  async updateClientItemProductData({dispatch, rootGetters}, clientItem) {
    const product = rootGetters['product/getProductBySkuDictionary'][clientItem.sku];
    const clientItemWithProductData = updateClientItemProductData(clientItem, product);

    await dispatch('updateItem', { product: clientItemWithProductData })

    EventBus.$emit('cart-after-itemchanged', { item: clientItemWithProductData })
    return clientItemWithProductData;
  },
  async processUpdateServerItemResponse(
    { commit, dispatch, rootGetters },
    {
      clientItem,
      serverItem,
      diffLog,
      resultCode,
      result
    }: {
      clientItem: CartItem,
      serverItem: ServerItem | undefined,
      diffLog: DiffLog,
      resultCode: number,
      result: any
    }
  ) {
    const wasUpdatedSuccessfully = resultCode === 200

    diffLog.pushServerResponse({
      status: resultCode,
      sku: clientItem.sku,
      result: result
    })

    if (resultCode === 404) {
      return diffLog;
    }

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

    await dispatch('updateClientItem', { clientItem, serverItem: result })

    return diffLog;
  },
  async updateServerItem({ getters, dispatch }, { clientItem, serverItem, updateIds, mergeQty }) {
    let diffLog = createDiffLog()
    const cartItem = createCartItemForUpdate(clientItem, serverItem, updateIds, mergeQty)

    try {
      const updateItemTask = await CartService.updateItem(getters.getCartToken, cartItem)

      Logger.debug('Cart item server sync' + updateItemTask, 'cart')()

      diffLog = await dispatch(
        'processUpdateServerItemResponse',
        {
          clientItem,
          serverItem,
          diffLog,
          resultCode: updateItemTask.resultCode,
          result: updateItemTask.result
        }
      )
    } catch (error) {
      diffLog = await dispatch(
        'processUpdateServerItemResponse',
        {
          clientItem,
          serverItem,
          diffLog,
          resultCode: 500,
          result: undefined
        }
      )
    }

    return diffLog
  },
  async synchronizeServerItem({ commit, dispatch }, { serverItem, clientItem, forceClientState, dryRun, mergeQty, forceUpdateServerItem }) {
    const diffLog = createDiffLog()

    if (!serverItem) {
      Logger.warn('No server item with sku ' + clientItem.sku + ' on stock.', 'cart')()
      diffLog.pushServerParty({ sku: clientItem.sku, status: 'no-item' })

      if (dryRun) return diffLog
      if (forceClientState || !config.cart.serverSyncCanRemoveLocalItems) {
        const updateServerItemDiffLog = await dispatch('updateServerItem', { clientItem, serverItem, updateIds: false })
        return diffLog.merge(updateServerItemDiffLog)
      }

      commit(types.CART_DEL_ITEM, { product: clientItem, removeByParentSku: false });
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

    if (forceUpdateServerItem) {
      const updateServerItemDiffLog = await dispatch('updateServerItem', { clientItem, serverItem, updateIds: true, mergeQty })

      return diffLog.merge(updateServerItemDiffLog)
    }

    return diffLog
  },
  async mergeClientItem({ dispatch }, { clientItem, serverItems, forceClientState, dryRun, mergeQty, forceUpdateServerItem }) {
    const serverItem = serverItems.find(itm => productsEquals(itm, clientItem))
    const diffLog = await dispatch('synchronizeServerItem', { serverItem, clientItem, forceClientState, dryRun, mergeQty, forceUpdateServerItem })

    if (!diffLog.isEmpty()) return diffLog

    Logger.info('Server and client item with SKU ' + clientItem.sku + ' synced. Updating cart.', 'cart', 'cart')()
    if (!dryRun) {
      const product = {
        sku: clientItem.sku,
        server_cart_id: serverItem.quote_id,
        server_item_id: serverItem.item_id,
        product_option: getProductOptions(serverItem),
        type_id: serverItem.product_type
      }

      await dispatch('updateItem', { product })
    }

    return diffLog
  },
  async mergeClientItems({ dispatch }, { clientItems, serverItems, forceClientState, dryRun, mergeQty, forceUpdateServerItem }) {
    const diffLog = createDiffLog()

    for (const clientItem of clientItems) {
      try {
        const mergeClientItemDiffLog = await dispatch('mergeClientItem', { clientItem, serverItems, forceClientState, dryRun, mergeQty, forceUpdateServerItem })
        diffLog.merge(mergeClientItemDiffLog)

        if (diffLog.hasNotFoundServerResponse()) {
          return diffLog;
        }
      } catch (e) {
        Logger.debug('Problem syncing clientItem', 'cart', clientItem)()
      }
    }

    return diffLog
  },
  async mergeServerItem({ dispatch, getters }, { clientItems, serverItem, forceClientState, dryRun, forceUpdateServerItem }) {
    const diffLog = createDiffLog()
    let clientItem: CartItem | undefined = clientItems.find(itm => productsEquals(itm, serverItem))

    if (clientItem) {
      clientItem = await dispatch('updateClientItemProductData', clientItem);

      if (!forceClientState && !forceUpdateServerItem) {
        await dispatch('updateClientItem', {clientItem, serverItem});
        return diffLog;
      }
    }

    if (
      clientItem &&
      isClientItemHasRequiredServerItemFields(clientItem)
    ) return diffLog

    if (
      clientItem &&
      !isClientItemHasRequiredServerItemFields(clientItem)
    ) {
      await dispatch('updateClientItem', {clientItem, serverItem});
      return diffLog;
    }

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
      EventBus.$emit('cart-prepare-item-product', { product: productToAdd, serverItem });

      await dispatch('addItem', { productToAdd, forceServerSilence: true })
      Logger.debug('Product variant for given serverItem has not found', 'cart', serverItem)()
    }

    return diffLog
  },
  async mergeServerItems({ dispatch }, { serverItems, clientItems, forceClientState, dryRun, forceUpdateServerItem }) {
    const diffLog = createDiffLog()
    const definedServerItems = serverItems.filter(serverItem => serverItem)

    await loadServerItemsProducts(definedServerItems, dispatch);

    for (const serverItem of definedServerItems) {
      try {
        const mergeServerItemDiffLog = await dispatch('mergeServerItem', { clientItems, serverItem, forceClientState, dryRun, forceUpdateServerItem })
        diffLog.merge(mergeServerItemDiffLog)
      } catch (e) {
        Logger.debug('Problem syncing serverItem', 'cart', serverItem)()
      }
    }

    return diffLog
  },
  async updateTotalsAfterMerge({ dispatch, getters, commit }, { clientItems, dryRun }) {
    if (dryRun) return

    if (getters.isTotalsSyncRequired && clientItems.length > 0) {
      await dispatch('syncTotals')
    }

    commit(types.CART_SET_ITEMS_HASH, getters.getCurrentCartHash)
  },
  async merge({ getters, dispatch }, { serverItems, clientItems, dryRun = false, forceClientState = false, mergeQty = false, forceUpdateServerItem = false }) {
    const hookResult = cartHooksExecutors.beforeSync({ clientItems, serverItems })

    const diffLog = createDiffLog()
    const mergeParameters = {
      clientItems: hookResult.clientItems,
      serverItems: hookResult.serverItems,
      forceClientState,
      dryRun,
      mergeQty,
      forceUpdateServerItem
    }
    const mergeClientItemsDiffLog = await dispatch('mergeClientItems', mergeParameters)

    if (mergeClientItemsDiffLog.hasNotFoundServerResponse()) {
      await dispatch(
        'clear',
        {
          disconnect: true,
          sync: false
        }
      );

      return mergeClientItemsDiffLog;
    } 

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
