import * as types from '@vue-storefront/core/modules/cart/store/mutation-types'
import { Logger } from '@vue-storefront/core/lib/logger'
import { configureProductAsync } from '@vue-storefront/core/modules/catalog/helpers'
import {
  prepareProductsToAdd,
  productsEquals,
  validateProduct,
  createDiffLog,
  notifications
} from '@vue-storefront/core/modules/cart/helpers'
import { cartHooksExecutors } from './../../hooks'
import config from 'config'

const itemActions = {
  async configureItem (context, { product, configuration }) {
    const { commit, dispatch, getters } = context
    const variant = configureProductAsync(context, {
      product,
      configuration,
      selectDefaultVariant: false
    })
    const itemWithSameSku = getters.getCartItems.find(item => item.sku === variant.sku)

    if (itemWithSameSku && product.sku !== variant.sku) {
      Logger.debug('Item with the same sku detected', 'cart', { sku: itemWithSameSku.sku })()
      commit(types.CART_DEL_ITEM, { product: itemWithSameSku })
      product.qty = parseInt(product.qty) + parseInt(itemWithSameSku.qty)
    }

    commit(types.CART_UPD_ITEM_PROPS, { product: { ...product, ...variant } })

    if (getters.isCartSyncEnabled && product.server_item_id) {
      await dispatch('sync', { forceClientState: true })
    }
  },
  updateItem ({ commit }, { product }) {
    commit(types.CART_UPD_ITEM_PROPS, { product })
  },
  getItem ({ getters }, { product }) {
    return getters.getCartItems.find(p => productsEquals(p, product))
  },
  async addItem ({ dispatch, commit }, { productToAdd, forceServerSilence = false }) {
    const { cartItem } = cartHooksExecutors.beforeAddToCart({ cartItem: productToAdd })
    commit(types.CART_ADDING_ITEM, { isAdding: true })
    const result = await dispatch('addItems', { productsToAdd: prepareProductsToAdd(cartItem), forceServerSilence })
    commit(types.CART_ADDING_ITEM, { isAdding: false })
    cartHooksExecutors.afterAddToCart(result)
    return result
  },
  async checkProductStatus ({ dispatch, getters }, { product }) {
    const record = getters.getCartItems.find(p => productsEquals(p, product))
    const qty = record ? record.qty + 1 : (product.qty ? product.qty : 1)

    return dispatch('stock/queueCheck', { product, qty }, { root: true })
  },
  async addItems ({ commit, dispatch, getters }, { productsToAdd, forceServerSilence = false }) {
    let productIndex = 0
    const diffLog = createDiffLog()
    for (let product of productsToAdd) {
      const errors = validateProduct(product)
      diffLog.pushNotifications(notifications.createNotifications({ type: 'error', messages: errors }))

      if (errors.length === 0) {
        const { status, onlineCheckTaskId } = await dispatch('checkProductStatus', { product })

        if (status === 'volatile' && !config.stock.allowOutOfStockInCart) {
          diffLog.pushNotification(notifications.unsafeQuantity())
        }
        if (status === 'out_of_stock') {
          diffLog.pushNotification(notifications.outOfStock())
        }

        if (status === 'ok' || status === 'volatile') {
          commit(types.CART_ADD_ITEM, {
            product: { ...product, onlineStockCheckid: onlineCheckTaskId }
          })
        }
        if (productIndex === (productsToAdd.length - 1) && (!getters.isCartSyncEnabled || forceServerSilence)) {
          diffLog.pushNotification(notifications.productAddedToCart())
        }
        productIndex++
      }
    }

    let newDiffLog = await dispatch('create')
    if (newDiffLog !== undefined) {
      diffLog.merge(newDiffLog)
    }

    if (getters.isCartSyncEnabled && getters.isCartConnected && !forceServerSilence) {
      const syncDiffLog = await dispatch('sync', { forceClientState: true })

      if (!syncDiffLog.isEmpty()) {
        diffLog.merge(syncDiffLog)
      }
    }

    return diffLog
  },
  async removeItem ({ commit, dispatch, getters }, payload) {
    const removeByParentSku = payload.product ? !!payload.removeByParentSku && payload.product.type_id !== 'bundle' : true
    const product = payload.product || payload
    const { cartItem } = cartHooksExecutors.beforeRemoveFromCart({ cartItem: product })

    commit(types.CART_DEL_ITEM, { product: cartItem, removeByParentSku })

    if (getters.isCartSyncEnabled && cartItem.server_item_id) {
      const diffLog = await dispatch('sync', { forceClientState: true })
      cartHooksExecutors.afterRemoveFromCart(diffLog)
      return diffLog
    }

    const diffLog = createDiffLog()
      .pushClientParty({ status: 'no-item', sku: product.sku })
    cartHooksExecutors.afterRemoveFromCart(diffLog)
    return diffLog
  }
}

export default itemActions
