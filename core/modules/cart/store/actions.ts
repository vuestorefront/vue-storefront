import { ActionTree } from 'vuex'
import * as types from './mutation-types'
import { currentStoreView, localizedRoute } from '@vue-storefront/core/lib/multistore'
import RootState from '@vue-storefront/core/types/RootState'
import CartState from '../types/CartState'
import isString from 'lodash-es/isString'
import { Logger } from '@vue-storefront/core/lib/logger'
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import { router } from '@vue-storefront/core/app'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'
import { isServer } from '@vue-storefront/core/helpers'
import config from 'config'
import Task from '@vue-storefront/core/lib/sync/types/Task'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { configureProductAsync } from '@vue-storefront/core/modules/catalog/helpers'
import { CartService } from '@vue-storefront/core/data-resolver'
import {
  prepareProductsToAdd,
  productsEquals,
  preparePaymentMethodsToSync,
  validateProduct,
  createDiffLog,
  isCartTokenAuthorized,
  notifications,
  createCartItemForUpdate,
  prepareShippingInfoForUpdateTotals
} from './../helpers'
import CartItem from '../types/CartItem';

const actions: ActionTree<CartState, RootState> = {
  async disconnect ({ commit }) {
    commit(types.CART_LOAD_CART_SERVER_TOKEN, null)
  },
  async clear ({ commit, dispatch, getters }, options = { recreateAndSyncCart: true }) {
    await commit(types.CART_LOAD_CART, [])
    if (options.recreateAndSyncCart && getters.isCartSyncEnabled) {
      await commit(types.CART_LOAD_CART_SERVER_TOKEN, null)
      await commit(types.CART_SET_ITEMS_HASH, null)
      await dispatch('connect', { guestCart: !config.orders.directBackendSync }) // guest cart when not using directBackendSync because when the order hasn't been passed to Magento yet it will repopulate your cart
    }
  },
  async syncPaymentMethods ({ getters, rootGetters, dispatch }, { forceServerSync = false }) {
    if (getters.canUpdateMethods && (getters.isTotalsSyncRequired || forceServerSync)) {
      Logger.debug('Refreshing payment methods', 'cart')()
      const { result } = await CartService.getPaymentMethods()
      const { uniqueBackendMethods, paymentMethods } = preparePaymentMethodsToSync(
        result,
        rootGetters['payment/getNotServerPaymentMethods']
      )
      await dispatch('payment/replaceMethods', paymentMethods, { root: true })
      EventBus.$emit('set-unique-payment-methods', uniqueBackendMethods)
    } else {
      Logger.debug('Payment methods does not need to be updated', 'cart')()
    }
  },
  async updateShippingMethods ({ dispatch }, { shippingMethods }) {
    if (shippingMethods.length > 0) {
      const newShippingMethods = shippingMethods.map(method => ({ ...method, is_server_method: true }))
      await dispatch('shipping/replaceMethods', newShippingMethods, { root: true })
    }
  },
  async syncShippingMethods ({ getters, rootGetters, dispatch }, { forceServerSync = false }) {
    if (getters.canUpdateMethods && (getters.isTotalsSyncRequired || forceServerSync)) {
      const storeView = currentStoreView()
      Logger.debug('Refreshing shipping methods', 'cart')()
      const { result } = await CartService.getShippingMethods({
        country_id: rootGetters['checkout/getShippingDetails'].country || storeView.tax.defaultCountry
      })
      await dispatch('updateShippingMethods', { shippingMethods: result })
    } else {
      Logger.debug('Shipping methods does not need to be updated', 'cart')()
    }
  },
  async sync ({ getters, rootGetters, commit, dispatch }, { forceClientState = false, dryRun = false }) {
    const shouldUpdateClientState = rootGetters['checkout/isUserInCheckout'] || forceClientState
    const { getCartItems, canUpdateMethods, isSyncRequired, bypassCounter } = getters
    if (!canUpdateMethods || !isSyncRequired) return

    commit(types.CART_SET_SYNC)
    const { result, resultCode } = await CartService.pullCart()
    if (resultCode === 200) {
      return dispatch('merge', {
        dryRun,
        serverItems: result,
        clientItems: getCartItems,
        forceClientState: shouldUpdateClientState
      })
    }

    if (bypassCounter < config.queues.maxCartBypassAttempts) {
      Logger.log('Bypassing with guest cart' + bypassCounter, 'cart')()
      commit(types.CART_UPDATE_BYPASS_COUNTER, { counter: 1 })
      await dispatch('connect', { guestCart: true })
    }

    Logger.error(result, 'cart')
    return createDiffLog()
  },
  /** @deprecated backward compatibility only */
  async serverPull ({ dispatch }, { forceClientState = false, dryRun = false }) {
    Logger.warn('The "cart/serverPull" action is deprecated and will not be supported with the Vue Storefront 1.11', 'cart')()
    return dispatch('sync', { forceClientState, dryRun })
  },
  async setDefaultCheckoutMethods ({ getters, rootGetters, commit }) {
    if (!getters.getShippingMethodCode) {
      commit(types.CART_UPD_SHIPPING, rootGetters['shipping/getDefaultShippingMethod'])
    }

    if (!getters.getPaymentMethodCode) {
      commit(types.CART_UPD_PAYMENT, rootGetters['payment/getDefaultPaymentMethod'])
    }
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
    } else {
      Logger.info('Creating server cart token', 'cart')()
      await dispatch('connect', { guestCart: false })
    }
  },
  async load ({ commit, dispatch }, { forceClientState = false }: {forceClientState?: boolean} = {}) {
    if (isServer) return

    dispatch('setDefaultCheckoutMethods')
    const storedItems = await StorageManager.get('cart').getItem('current-cart')
    commit(types.CART_LOAD_CART, storedItems)
    dispatch('synchronizeCart', { forceClientState })
  },
  getItem ({ getters }, { product }) {
    return getters.getCartItems.find(p => productsEquals(p, product))
  },
  goToCheckout () {
    router.push(localizedRoute('/checkout', currentStoreView().storeCode))
  },
  async addItem ({ dispatch }, { productToAdd, forceServerSilence = false }) {
    return dispatch('addItems', { productsToAdd: prepareProductsToAdd(productToAdd), forceServerSilence })
  },
  async checkProductStatus ({ dispatch, getters }, { product }) {
    const record = getters.getCartItems.find(p => productsEquals(p, product))
    const qty = record ? record.qty + 1 : (product.qty ? product.qty : 1)

    return dispatch('stock/queueCheck', { product, qty }, {root: true})
  },
  async addItems ({ commit, dispatch, getters }, { productsToAdd, forceServerSilence = false }) {
    let productIndex = 0
    const diffLog = createDiffLog()
    for (let product of productsToAdd) {
      const errors = validateProduct(product)
      diffLog.pushNotifications(notifications.createNotifications({ type: 'error', messages: errors }))

      if (errors.length === 0) {
        const { status, onlineCheckTaskId } = await dispatch('checkProductStatus', { product })

        if (status === 'volatile') {
          diffLog.pushNotification(notifications.unsafeQuantity)
        }
        if (status === 'out_of_stock') {
          diffLog.pushNotification(notifications.outOfStock)
        }

        if (status === 'ok' || status === 'volatile') {
          commit(types.CART_ADD_ITEM, {
            product: { ...product, onlineStockCheckid: onlineCheckTaskId }
          })
        }
        if (productIndex === (productsToAdd.length - 1) && (!getters.isCartSyncEnabled || forceServerSilence)) {
          diffLog.pushNotification(notifications.productAddedToCart)
        }
        productIndex++
      }
    }
    if (getters.isCartSyncEnabled && getters.isCartConnected && !forceServerSilence) {
      return dispatch('sync', { forceClientState: true })
    }

    return diffLog
  },
  async removeItem ({ commit, dispatch, getters }, payload) {
    const removeByParentSku = payload.product ? !!payload.removeByParentSku && payload.product.type_id !== 'bundle' : true
    const product = payload.product || payload

    commit(types.CART_DEL_ITEM, { product, removeByParentSku })
    if (getters.isCartSyncEnabled && product.server_item_id) {
      return dispatch('sync', { forceClientState: true })
    }

    return createDiffLog()
      .pushClientParty({ status: 'no-item', sku: product.sku })
  },
  async updateQuantity ({ commit, dispatch, getters }, { product, qty, forceServerSilence = false }) {
    commit(types.CART_UPD_ITEM, { product, qty })
    if (getters.isCartSyncEnabled && product.server_item_id && !forceServerSilence) {
      return dispatch('sync', { forceClientState: true })
    }

    return createDiffLog()
      .pushClientParty({ status: 'wrong-qty', sku: product.sku, 'client-qty': qty })
  },
  configureItem (context, { product, configuration }) {
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
      dispatch('sync', { forceClientState: true })
    }
  },
  updateItem ({ commit }, { product }) {
    commit(types.CART_UPD_ITEM_PROPS, { product })
  },
  async getTotals (context, { methodsData, hasShippingInformation }) {
    if (hasShippingInformation) {
      return CartService.setServerShippingInfo(methodsData)
    }

    return CartService.getTotals()
  },
  async overrideServerTotals ({ commit, dispatch }, { methodsData, hasShippingInformation }) {
    const { resultCode, result } = await dispatch('getTotals', { methodsData, hasShippingInformation })

    if (resultCode === 200) {
      const totals = result.totals || result
      Logger.info('Overriding server totals. ', 'cart', totals)()
      const itemsAfterTotal = prepareShippingInfoForUpdateTotals(totals.items)

      for (let key of Object.keys(itemsAfterTotal)) {
        const item = itemsAfterTotal[key]
        const product = { server_item_id: item.item_id, totals: item, qty: item.qty }
        await dispatch('updateItem', { product })
      }

      commit(types.CART_UPD_TOTALS, { itemsAfterTotal, totals, platformTotalSegments: totals.total_segments })
      commit(types.CART_SET_TOTALS_SYNC)

      return
    }

    Logger.error(result, 'cart')()
  },
  async pullMethods ({ getters, dispatch }, { forceServerSync }) {
    if (getters.isTotalsSyncRequired || forceServerSync) {
      await dispatch('syncShippingMethods', { forceServerSync })
      await dispatch('syncPaymentMethods', { forceServerSync })
    } else {
      Logger.debug('Skipping payment & shipping methods update as cart has not been changed', 'cart')()
    }
  },
  async syncTotals ({ dispatch, getters, rootGetters }, payload: { forceServerSync: boolean, methodsData?: any } = { forceServerSync: false, methodsData: null }) {
    let methodsData = payload ? payload.methodsData : null
    await dispatch('pullMethods', { forceServerSync: payload.forceServerSync })

    const storeView = currentStoreView()
    let hasShippingInformation = false
    if (getters.isTotalsSyncEnabled && getters.isCartConnected && (getters.isTotalsSyncRequired || payload.forceServerSync)) {
      if (!methodsData) {
        const country = rootGetters['checkout/getShippingDetails'].country ? rootGetters['checkout/getShippingDetails'].country : storeView.tax.defaultCountry
        const shippingMethods = rootGetters['shipping/shippingMethods']
        const paymentMethods = rootGetters['payment/paymentMethods']
        let shipping = shippingMethods && Array.isArray(shippingMethods) ? shippingMethods.find(item => item.default && !item.offline /* don't sync offline only shipping methods with the serrver */) : null
        let payment = paymentMethods && Array.isArray(paymentMethods) ? paymentMethods.find(item => item.default) : null
        if (!shipping && shippingMethods && shippingMethods.length > 0) {
          shipping = shippingMethods.find(item => !item.offline)
        }
        if (!payment && paymentMethods && paymentMethods.length > 0) {
          payment = paymentMethods[0]
        }
        methodsData = {
          country: country
        }
        if (shipping) {
          if (shipping.method_code) {
            hasShippingInformation = true // there are some edge cases when the backend returns no shipping info
            methodsData['method_code'] = shipping.method_code
          }
          if (shipping.carrier_code) {
            hasShippingInformation = true
            methodsData['carrier_code'] = shipping.carrier_code
          }
        }
        if (payment && payment.code) methodsData['payment_method'] = payment.code
      }
      if (methodsData.country && getters.isCartConnected) {
        return dispatch('overrideServerTotals', { methodsData, hasShippingInformation })
      }

      Logger.error('Please do set the tax.defaultCountry in order to calculate totals', 'cart')()
    }
  },
  async refreshTotals ({ dispatch }, payload) {
    Logger.warn('The "cart/refreshTotals" action is deprecated and will not be supported with the Vue Storefront 1.11', 'cart')()
    return dispatch('syncTotals', payload)
  },
  async removeCoupon ({ getters, dispatch }) {
    if (getters.isTotalsSyncEnabled && getters.isCartConnected) {
      const { result } = await CartService.removeCoupon()

      if (result) {
        dispatch('syncTotals', { forceServerSync: true })
        return result
      }
    }
  },
  async applyCoupon ({ getters, dispatch }, couponCode) {
    if (couponCode && getters.isTotalsSyncEnabled && getters.isCartConnected) {
      const { result } = await CartService.applyCoupon(couponCode)

      if (result) {
        dispatch('syncTotals', { forceServerSync: true })
      }
      return result
    }
  },
  async authorize ({ dispatch, getters }) {
    const coupon = getters.getCoupon.code
    const lastCartBypassTs = await StorageManager.get('user').getItem('last-cart-bypass-ts')
    const timeBypassCart = config.orders.directBackendSync || (Date.now() - lastCartBypassTs) >= (1000 * 60 * 24)

    if (!config.cart.bypassCartLoaderForAuthorizedUsers || timeBypassCart) {
      await dispatch('connect', { guestCart: false })

      if (!getters.getCoupon) {
        await dispatch('applyCoupon', coupon)
      }
    }
  },
  async connect ({ getters, dispatch, commit }, { guestCart = false, forceClientState = false }) {
    if (!getters.isCartSyncEnabled) return
    const { result, resultCode } = await CartService.connectCart(guestCart, forceClientState)

    if (resultCode === 200) {
      Logger.info('Server cart token created.', 'cart', result)()
      commit(types.CART_LOAD_CART_SERVER_TOKEN, result)

      return dispatch('sync', { forceClientState, dryRun: !config.cart.serverMergeByDefault })
    }

    if (isCartTokenAuthorized(result) && getters.bypassCounter < config.queues.maxCartBypassAttempts) {
      Logger.log('Bypassing with guest cart' + getters.bypassCounter, 'cart')()
      commit(types.CART_UPDATE_BYPASS_COUNTER, { counter: 1 })
      Logger.error(result, 'cart')()
      return dispatch('connect', { guestCart: true })
    }

    Logger.warn('Cart sync is disabled by the config', 'cart')()
    return createDiffLog()
  },
  async restoreQuantity ({ dispatch }, { cartItem, clientItem }) {
    const currentCartItem = await dispatch('getItem', clientItem)
    if (currentCartItem) {
      Logger.log('Restoring qty after error' + clientItem.sku + currentCartItem.prev_qty, 'cart')()
      if (cartItem.prev_qty > 0) {
        dispatch('updateItem', { product: { qty: currentCartItem.prev_qty } })
        EventBus.$emit('cart-after-itemchanged', { item: currentCartItem })
      } else {
        dispatch('removeItem', { product: currentCartItem, removeByParentSku: false })
      }
    }
  },
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
  async updateServerItem ({ getters, rootGetters, commit, dispatch }, { clientItem, serverItem, updateIds }) {
    const diffLog = createDiffLog()
    const cartItem = createCartItemForUpdate(clientItem, serverItem, updateIds)
    const event = await CartService.updateCartItem(getters.getCartToken, cartItem)
    const isUpdateSuccess = event.resultCode === 200
    Logger.debug('Cart item server sync' + event, 'cart')()
    diffLog.pushServerResponse({ status: event.resultCode, sku: clientItem.sku, result: event })

    if (!isUpdateSuccess && !serverItem) {
      commit(types.CART_DEL_ITEM, { product: clientItem, removeByParentSku: false })
      return diffLog
    }

    if (!isUpdateSuccess && clientItem.item_id) {
      await dispatch('restoreQuantity', { cartItem, clientItem })
      return diffLog
    }

    if (!isUpdateSuccess) {
      Logger.warn('Removing product from cart', 'cart', clientItem)()
      commit(types.CART_DEL_NON_CONFIRMED_ITEM, { product: clientItem })
      return diffLog
    }

    if (!rootGetters['checkout/isUserInCheckout']) {
      const isThisNewItemAddedToTheCart = (!clientItem || !clientItem.server_item_id)
      diffLog.pushNotification(
        isThisNewItemAddedToTheCart ? notifications.productAddedToCart : notifications.productQuantityUpdated
      )
    }

    await dispatch('updateClientItem', { clientItem, serverItem: event.result })

    return diffLog
  },
  async synchronizeServerItem ({ dispatch }, { serverItem, clientItem, forceClientState, dryRun }) {
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

    if (serverItem.qty !== clientItem.qty) {
      Logger.log('Wrong qty for ' + clientItem.sku, clientItem.qty, serverItem.qty)()
      diffLog.pushServerParty({ sku: clientItem.sku, status: 'wrong-qty', 'client-qty': clientItem.qty, 'server-qty': serverItem.qty })
      if (dryRun) return diffLog
      if (forceClientState || !config.cart.serverSyncCanModifyLocalItems) {
        const updateServerItemDiffLog = await dispatch('updateServerItem', { clientItem, serverItem, updateIds: true })

        return diffLog.merge(updateServerItemDiffLog)
      }

      await dispatch('updateItem', { product: serverItem })
    }

    return diffLog
  },
  async mergeClientItem ({ dispatch }, { clientItem, serverItems, forceClientState, dryRun }) {
    const serverItem = serverItems.find(itm => productsEquals(itm, clientItem))
    const diffLog = await dispatch('synchronizeServerItem', { serverItem, clientItem, forceClientState, dryRun })

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
  async mergeClientItems ({ dispatch }, { clientItems, serverItems, forceClientState, dryRun }) {
    const diffLog = createDiffLog()

    for (const clientItem of clientItems) {
      const mergeClientItemDiffLog = await dispatch('mergeClientItem', { clientItem, serverItems, forceClientState, dryRun })
      diffLog.merge(mergeClientItemDiffLog)
    }

    return diffLog
  },
  async findProductOption ({ dispatch }, { serverItem }) {
    if (serverItem.product_type === 'configurable') {
      let query = new SearchQuery()
      query = query.applyFilter({key: 'configurable_children.sku', value: {'eq': serverItem.sku}})

      const { items } = await dispatch('product/list', { query, start: 0, size: 1, updateState: false }, { root: true })

      return items.length >= 1 ? { sku: items[0].sku, childSku: serverItem.sku } : null
    }

    return { sku: serverItem.sku }
  },
  async getProductVariant ({ dispatch }, { serverItem }) {
    const options = await dispatch('findProductOption', { serverItem })
    const singleProduct = await dispatch('product/single', { options, assignDefaultVariant: true, setCurrentProduct: false, selectDefaultVariant: false }, { root: true })

    return {
      ...singleProduct,
      server_item_id: serverItem.item_id,
      qty: serverItem.qty,
      server_cart_id: serverItem.quote_id,
      product_option: serverItem.product_option || singleProduct.product_option
    }
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
    dispatch('addItem', { productToAdd, forceServerSilence: true })

    return diffLog
  },
  async mergeServerItems ({ dispatch }, { serverItems, clientItems, forceClientState, dryRun }) {
    const diffLog = createDiffLog()
    const definedServerItems = serverItems.filter(serverItem => serverItem)

    for (const serverItem of definedServerItems) {
      const mergeServerItemDiffLog = await dispatch('mergeServerItem', { clientItems, serverItem, forceClientState, dryRun })
      diffLog.merge(mergeServerItemDiffLog)
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
  async merge ({ getters, dispatch }, { serverItems, clientItems, dryRun = false, forceClientState = false }) {
    const diffLog = createDiffLog()
    const mergeParameters = { clientItems, serverItems, forceClientState, dryRun }
    const mergeClientItemsDiffLog = await dispatch('mergeClientItems', mergeParameters)
    const mergeServerItemsDiffLog = await dispatch('mergeServerItems', mergeParameters)
    dispatch('updateTotalsAfterMerge', { clientItems, dryRun })

    diffLog
      .merge(mergeClientItemsDiffLog)
      .merge(mergeServerItemsDiffLog)
      .pushClientParty({ status: getters.isCartHashChanged ? 'update-required' : 'no-changes' })
      .pushServerParty({ status: getters.isTotalsSyncRequired ? 'update-required' : 'no-changes' })

    EventBus.$emit('servercart-after-diff', { diffLog: diffLog, serverItems: serverItems, clientItems: clientItems, dryRun: dryRun, event: event })
    Logger.info('Client/Server cart synchronised ', 'cart', diffLog)()

    return diffLog
  },
  toggleMicrocart ({ commit }) {
    commit(types.CART_TOGGLE_MICROCART)
  }
}

export default actions
