import Vue from 'vue'
import { ActionTree } from 'vuex'
import * as types from './mutation-types'
import i18n from '@vue-storefront/i18n'
import { currentStoreView, localizedRoute } from '@vue-storefront/core/lib/multistore'
import omit from 'lodash-es/omit'
import RootState from '@vue-storefront/core/types/RootState'
import CartState from '../types/CartState'
import isString from 'lodash-es/isString'
import toString from 'lodash-es/toString'
import { Logger } from '@vue-storefront/core/lib/logger'
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import { router } from '@vue-storefront/core/app'
import SearchQuery from '@vue-storefront/core/lib/search/searchQuery'
import { isServer } from '@vue-storefront/core/helpers'
import config from 'config'
import Task from '@vue-storefront/core/lib/sync/types/Task'

const MAX_BYPASS_COUNT = 10
let _connectBypassCount = 0

function _getDifflogPrototype () {
  return { items: [], serverResponses: [], clientNotifications: [] }
}

/** @todo: move this metod to data resolver; shouldn't be a part of public API no more */
async function _serverShippingInfo ({ methodsData }) {
  const task = await TaskQueue.execute({ url: config.cart.shippinginfo_endpoint,
    payload: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify({
        addressInformation: {
          shippingAddress: {
            countryId: methodsData.country
          },
          shippingCarrierCode: methodsData.carrier_code,
          shippingMethodCode: methodsData.method_code
        }
      })
    },
    silent: true
  })
  return task
}

/** @todo: move this metod to data resolver; shouldn't be a part of public API no more */
async function _serverTotals (): Promise<Task> {
  return TaskQueue.execute({ url: config.cart.totals_endpoint, // sync the cart
    payload: {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    },
    silent: true
  })
}
/** @todo: move this metod to data resolver; shouldn't be a part of public API no more */
async function _connect ({ guestCart = false, forceClientState = false }): Promise<Task> {
  const task = { url: guestCart ? config.cart.create_endpoint.replace('{{token}}', '') : config.cart.create_endpoint, // sync the cart
    payload: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    },
    force_client_state: forceClientState,
    silent: true
  }
  return TaskQueue.execute(task)
}
/** @todo: move this metod to data resolver; shouldn't be a part of public API no more */
function _serverUpdateItem ({ cartServerToken, cartItem }): Promise<Task> {
  if (!cartItem.quoteId) {
    cartItem = Object.assign(cartItem, { quoteId: cartServerToken })
  }

  return TaskQueue.execute({ url: config.cart.updateitem_endpoint, // sync the cart
    payload: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify({
        cartItem: cartItem
      })
    }
  })
}

/** @todo: move this metod to data resolver; shouldn't be a part of public API no more */
function _serverDeleteItem ({ cartServerToken, cartItem }): Promise<Task> {
  cartItem = Object.assign(cartItem, { quoteId: cartServerToken })
  return TaskQueue.execute({ url: config.cart.deleteitem_endpoint, // sync the cart
    payload: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify({
        cartItem: cartItem
      })
    },
    silent: true
  })
}

async function _serverGetPaymentMethods (): Promise <Task> {
  const task = await TaskQueue.execute({ url: config.cart.paymentmethods_endpoint,
    payload: {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    },
    silent: true
  })
  return task
}

async function _serverGetShippingMethods (address): Promise <Task> {
  const task = await TaskQueue.execute({ url: config.cart.shippingmethods_endpoint,
    payload: {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify({
        address: address
      })
    },
    silent: true
  })
  return task
}

const actions: ActionTree<CartState, RootState> = {
  /** Disconnect the shipping cart from sync by clearing out the cart token */
  async disconnect ({ commit }) {
    commit(types.CART_LOAD_CART_SERVER_TOKEN, null)
  },
  /** Clear the cart content + re-connect to newly created guest cart */
  async clear ({ commit, dispatch, getters }, options = { recreateAndSyncCart: true }) {
    await commit(types.CART_LOAD_CART, [])
    if (options.recreateAndSyncCart && getters.isCartSyncEnabled) {
      await commit(types.CART_LOAD_CART_SERVER_TOKEN, null)
      await commit(types.CART_SET_ITEMS_HASH, null)
      await dispatch('connect', { guestCart: !config.orders.directBackendSync }) // guest cart when not using directBackendSync because when the order hasn't been passed to Magento yet it will repopulate your cart
    }
  },
  /** Refresh the payment methods with the backend */
  async syncPaymentMethods ({ getters, rootGetters, dispatch }, { forceServerSync = false }) {
    if (getters.isCartSyncEnabled && getters.isCartConnected && (getters.isTotalsSyncRequired || forceServerSync)) {
      Logger.debug('Refreshing payment methods', 'cart')()
      const paymentMethodsTask = await _serverGetPaymentMethods()
      let backendMethods = paymentMethodsTask.result
      let paymentMethods = rootGetters['payment/paymentMethods'].filter((itm) => {
        return (typeof itm !== 'object' || !itm.is_server_method)
      }) // copy
      let uniqueBackendMethods = []
      for (let i = 0; i < backendMethods.length; i++) {
        if (typeof backendMethods[i] === 'object' && !paymentMethods.find(item => item.code === backendMethods[i].code)) {
          backendMethods[i].is_server_method = true
          paymentMethods.push(backendMethods[i])
          uniqueBackendMethods.push(backendMethods[i])
        }
      }
      await dispatch('payment/replaceMethods', paymentMethods, { root: true })
      Vue.prototype.$bus.$emit('set-unique-payment-methods', uniqueBackendMethods)
    } else {
      Logger.debug('Payment methods does not need to be updated', 'cart')()
    }
  },
  /** Refresh the shipping methods with the backend */
  async syncShippingMethods ({ getters, rootGetters, dispatch }, { forceServerSync = false }) {
    if (getters.isCartSyncEnabled && getters.isCartConnected && (getters.isTotalsSyncRequired || forceServerSync)) {
      const storeView = currentStoreView()
      Logger.debug('Refreshing shipping methods', 'cart')()
      let country = rootGetters['checkout/getShippingDetails'].country ? rootGetters['checkout/getShippingDetails'].country : storeView.tax.defaultCountry
      const shippingMethodsTask = await _serverGetShippingMethods({
        country_id: country
      })
      if (shippingMethodsTask.result.length > 0) {
        await dispatch('shipping/replaceMethods', shippingMethodsTask.result.map(method => Object.assign(method, { is_server_method: true })), { root: true })
      }
    } else {
      Logger.debug('Shipping methods does not need to be updated', 'cart')()
    }
  },
  /** Sync the shopping cart with server along with totals (when needed) and shipping / payment methods */
  async sync ({ getters, rootGetters, commit, dispatch }, { forceClientState = false, dryRun = false }) { // pull current cart FROM the server
    const isUserInCheckout = rootGetters['checkout/isUserInCheckout']
    let diffLog = _getDifflogPrototype()
    if (isUserInCheckout) forceClientState = true // never surprise the user in checkout - #
    if (getters.isCartSyncEnabled && getters.isCartConnected) {
      if (getters.isSyncRequired) { // cart hash empty or not changed
        /** @todo: move this call to data resolver; shouldn't be a part of public API no more */
        commit(types.CART_SET_SYNC)
        const task = await TaskQueue.execute({ url: config.cart.pull_endpoint, // sync the cart
          payload: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
          },
          silent: true
        }).then(async task => {
          if (task.resultCode === 200) {
            diffLog = await dispatch('merge', { serverItems: task.result, clientItems: getters.getCartItems, dryRun: dryRun, forceClientState: forceClientState })
          } else {
            Logger.error(task.result, 'cart') // override with guest cart()
            if (_connectBypassCount < MAX_BYPASS_COUNT) {
              Logger.log('Bypassing with guest cart' + _connectBypassCount, 'cart')()
              _connectBypassCount = _connectBypassCount + 1
              await dispatch('connect', { guestCart: true })
              Logger.error(task.result, 'cart')()
            }
          }
        })
        return diffLog
      } else {
        return diffLog
      }
    } else {
      return diffLog
    }
  },
  /** @deprecated backward compatibility only */
  async serverPull ({ dispatch }, { forceClientState = false, dryRun = false }) {
    Logger.warn('The "cart/serverPull" action is deprecated and will not be supported with the Vue Storefront 1.11', 'cart')()
    return dispatch('sync', { forceClientState, dryRun })
  },
  /** @description this method is part of "public" cart API */
  async load ({ getters, commit, rootGetters, dispatch }, { forceClientState = false }: {forceClientState?: boolean} = {}) {
    if (isServer) return
    const cartShippingMethod = getters.getShippingMethod
    if ((!cartShippingMethod || !cartShippingMethod.method_code) && (Array.isArray(rootGetters['shipping/shippingMethods']))) {
      let shippingMethod = rootGetters['shipping/shippingMethods'].find(item => item.default)
      commit(types.CART_UPD_SHIPPING, shippingMethod)
    }
    const cartPaymentMethpd = getters.getPaymentMethod
    if ((!cartPaymentMethpd || !cartPaymentMethpd.code) && Array.isArray(rootGetters['payment/paymentMethods'])) {
      let paymentMethod = rootGetters['payment/paymentMethods'].find(item => item.default)
      commit(types.CART_UPD_PAYMENT, paymentMethod)
    }
    const storedItems = await Vue.prototype.$db.cartsCollection.getItem('current-cart')
    commit(types.CART_LOAD_CART, storedItems)
    if (config.cart.synchronize) {
      const token = await Vue.prototype.$db.cartsCollection.getItem('current-cart-token')
      const hash = await Vue.prototype.$db.cartsCollection.getItem('current-cart-hash')
      if (hash) {
        commit(types.CART_SET_ITEMS_HASH, hash)
        Logger.info('Cart hash received from cache.', 'cache', hash)()
      }
      if (token) { // previously set token
        commit(types.CART_LOAD_CART_SERVER_TOKEN, token)
        Logger.info('Cart token received from cache.', 'cache', token)()
        Logger.info('Syncing cart with the server.', 'cart')()
        dispatch('sync', { forceClientState, dryRun: !config.cart.serverMergeByDefault })
      } else {
        Logger.info('Creating server cart token', 'cart')()
        await dispatch('connect', { guestCart: false })
      }
    }
  },
  /** Get one single item from the client's cart */
  getItem ({ getters }, sku) {
    return getters.getCartItems.find(p => p.sku === sku)
  },
  goToCheckout () {
    router.push(localizedRoute('/checkout', currentStoreView().storeCode))
  },
  /** add item to the client's cart + sync with server if enabled @description this method is part of "public" cart API */
  async addItem ({ dispatch }, { productToAdd, forceServerSilence = false }) {
    let productsToAdd = []
    if (productToAdd.type_id === 'grouped') { // TODO: add bundle support
      productsToAdd = productToAdd.product_links.filter((pl) => { return pl.link_type === 'associated' }).map((pl) => { return pl.product })
    } else {
      productsToAdd.push(productToAdd)
    }
    return dispatch('addItems', { productsToAdd: productsToAdd, forceServerSilence })
  },
  /** add multiple items to the client's cart and execute single sync with the server when needed  @description this method is part of "public" cart API */
  async addItems ({ commit, dispatch, getters }, { productsToAdd, forceServerSilence = false }) {
    let productHasBeenAdded = false
    let productIndex = 0
    const diffLog = _getDifflogPrototype()
    for (let product of productsToAdd) {
      if (typeof product === 'undefined' || product === null) continue
      if (product.qty && typeof product.qty !== 'number') product.qty = parseInt(product.qty)
      if ((config.useZeroPriceProduct) ? product.priceInclTax < 0 : product.priceInclTax <= 0) {
        diffLog.clientNotifications.push({
          type: 'error',
          message: i18n.t('Product price is unknown, product cannot be added to the cart!'),
          action1: { label: i18n.t('OK') }
        })
        continue
      }
      if (config.entities.optimize && config.entities.optimizeShoppingCart) {
        product = omit(product, ['configurable_children', 'configurable_options', 'media_gallery', 'description', 'category', 'category_ids', 'product_links', 'stock', 'description'])
      }
      if (product.errors !== null && typeof product.errors !== 'undefined') {
        let productCanBeAdded = true
        for (let errKey in product.errors) {
          if (product.errors[errKey]) {
            productCanBeAdded = false
            diffLog.clientNotifications.push({
              type: 'error',
              message: product.errors[errKey],
              action1: { label: i18n.t('OK') }
            })
          }
        }
        if (!productCanBeAdded) {
          continue
        }
      }
      const record = getters.getCartItems.find(p => p.sku === product.sku)
      const result = await dispatch('stock/queueCheck', { product: product, qty: record ? record.qty + 1 : (product.qty ? product.qty : 1) }, {root: true}) // queueCheck returns control immediately and checks in the background; returning just the cached stock data; we're using it because cart/sync checks the stock anyway; but if cart.synchronize is disabeld or offline mode is enabled then this queued check could be usefull there is also `stock/check` actions that returns the exact values
      product.onlineStockCheckid = result.onlineCheckTaskId // used to get the online check result
      if (result.status === 'volatile') {
        diffLog.clientNotifications.push({
          type: 'warning',
          message: i18n.t('The system is not sure about the stock quantity (volatile). Product has been added to the cart for pre-reservation.'),
          action1: { label: i18n.t('OK') }
        })
      }
      if (result.status === 'out_of_stock') {
        diffLog.clientNotifications.push({
          type: 'error',
          message: i18n.t('The product is out of stock and cannot be added to the cart!'),
          action1: { label: i18n.t('OK') }
        })
      }
      if (result.status === 'ok' || result.status === 'volatile') {
        commit(types.CART_ADD_ITEM, { product })
        productHasBeenAdded = true
      }
      if (productIndex === (productsToAdd.length - 1) && productHasBeenAdded) {
        let notificationData = {
          type: 'success',
          message: i18n.t('Product has been added to the cart!'),
          action1: { label: i18n.t('OK') },
          action2: null
        }
        if (!config.externalCheckout) { // if there is externalCheckout enabled we don't offer action to go to checkout as it can generate cart desync
          notificationData.action2 = { label: i18n.t('Proceed to checkout'),
            action: () => {
              dispatch('goToCheckout')
            }}
        }
        if (!getters.isCartSyncEnabled || forceServerSilence) {
          diffLog.clientNotifications.push(notificationData)
        }
      }
      productIndex++
    }
    if (getters.isCartSyncEnabled && getters.isCartConnected && !forceServerSilence) {
      return dispatch('sync', { forceClientState: true })
    } else {
      return diffLog
    }
  },
  /** remove single item from the server cart by payload.sku or by payload.product.sku @description this method is part of "public" cart API */
  async removeItem ({ commit, dispatch, getters }, payload) {
    let removeByParentSku = true // backward compatibility call format
    let product = payload
    if (payload.product) { // new call format since 1.4
      product = payload.product
      removeByParentSku = payload.removeByParentSku
    }
    commit(types.CART_DEL_ITEM, { product, removeByParentSku })
    if (getters.isCartSyncEnabled && product.server_item_id) {
      return dispatch('sync', { forceClientState: true })
    } else {
      const diffLog = _getDifflogPrototype()
      diffLog.items.push({ 'party': 'client', 'status': 'no-item', 'sku': product.sku })
      return diffLog
    }
  },
  /** this action just updates the product quantity in the cart - by product.sku @description this method is part of "public" cart API */
  async updateQuantity ({ commit, dispatch, getters }, { product, qty, forceServerSilence = false }) {
    commit(types.CART_UPD_ITEM, { product, qty })
    if (getters.isCartSyncEnabled && product.server_item_id && !forceServerSilence) {
      return dispatch('sync', { forceClientState: true })
    } else {
      const diffLog = _getDifflogPrototype()
      diffLog.items.push({ 'party': 'client', 'status': 'wrong-qty', 'sku': product.sku, 'client-qty': qty })
      return diffLog
    }
  },
  /** this action merges in new product properties into existing cart item (by sku) @description this method is part of "public" cart API */
  updateItem ({ commit }, { product }) {
    commit(types.CART_UPD_ITEM_PROPS, { product })
  },
  /** refreshes the backend information with the backend @description this method is part of "public" cart API */
  async syncTotals ({ dispatch, commit, getters, rootGetters }, payload: { forceServerSync: boolean, methodsData?: any } = { forceServerSync: false, methodsData: null }) {
    let methodsData = payload ? payload.methodsData : null
    /** helper method to update the UI */
    const _afterTotals = async (task) => {
      if (task.resultCode === 200) {
        const totalsObj = task.result.totals ? task.result.totals : task.result
        Logger.info('Overriding server totals. ', 'cart', totalsObj)()
        const itemsAfterTotal = {}
        const platformTotalSegments = totalsObj.total_segments
        for (let item of totalsObj.items) {
          if (item.options && isString(item.options)) item.options = JSON.parse(item.options)
          itemsAfterTotal[item.item_id] = item
          await dispatch('updateItem', { product: { server_item_id: item.item_id, totals: item, qty: item.qty } }) // update the server_id reference
        }
        commit(types.CART_UPD_TOTALS, { itemsAfterTotal: itemsAfterTotal, totals: totalsObj, platformTotalSegments: platformTotalSegments })
        commit(types.CART_SET_TOTALS_SYNC)
      } else {
        Logger.error(task.result, 'cart')()
      }
    }
    if (getters.isTotalsSyncRequired || payload.forceServerSync) {
      await Promise.all([
        dispatch('syncShippingMethods', { forceServerSync: !!payload.forceServerSync }), // pull the shipping and payment methods available for the current cart content
        dispatch('syncPaymentMethods', { forceServerSync: !!payload.forceServerSync }) // pull the shipping and payment methods available for the current cart content
      ])
    } else {
      Logger.debug('Skipping payment & shipping methods update as cart has not been changed', 'cart')()
    }
    const storeView = currentStoreView()
    let hasShippingInformation = !!(methodsData && methodsData.method_code)
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
        if (hasShippingInformation) {
          return _serverShippingInfo({ methodsData }).then(_afterTotals)
        } else {
          return _serverTotals().then(_afterTotals)
        }
      } else {
        Logger.error('Please do set the tax.defaultCountry in order to calculate totals', 'cart')()
      }
    }
  },
  async refreshTotals ({ dispatch }, payload) {
    Logger.warn('The "cart/refreshTotals" action is deprecated and will not be supported with the Vue Storefront 1.11', 'cart')()
    return dispatch('syncTotals', payload)
  },
  /** remove discount code from the cart + sync totals @description this method is part of "public" cart API */
  async removeCoupon ({ getters, dispatch }) {
    if (getters.isTotalsSyncEnabled && getters.isCartConnected) {
      const task = await TaskQueue.execute({ url: config.cart.deletecoupon_endpoint,
        payload: {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors'
        },
        silent: false
      })
      if (task.result) {
        dispatch('syncTotals', { forceServerSync: true })
        return task.result
      }
    }
    return null
  },
  /** add discount code to the cart + refresh totals @description this method is part of "public" cart API */
  async applyCoupon ({ getters, dispatch }, couponCode) {
    if (getters.isTotalsSyncEnabled && getters.isCartConnected) {
      const task = await TaskQueue.execute({ url: config.cart.applycoupon_endpoint.replace('{{coupon}}', couponCode),
        payload: {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors'
        },
        silent: true
      })
      if (task.result === true) {
        dispatch('syncTotals', { forceServerSync: true })
        return true
      }
    }
    return false
  },
  /** authorize the cart after user got logged in using the current cart token */
  authorize ({ dispatch }) {
    Vue.prototype.$db.usersCollection.getItem('last-cart-bypass-ts', (err, lastCartBypassTs) => {
      if (err) {
        Logger.error(err, 'cart')()
      }
      if (!config.cart.bypassCartLoaderForAuthorizedUsers || (Date.now() - lastCartBypassTs) >= (1000 * 60 * 24)) { // don't refresh the shopping cart id up to 24h after last order
        dispatch('connect', { guestCart: false })
      }
    })
  },
  /** connect cart to the server and set the cart token */
  async connect ({ getters, dispatch, commit }, { guestCart = false, forceClientState = false }) {
    if (getters.isCartSyncEnabled) {
      return _connect({ guestCart, forceClientState }).then(task => {
        const cartToken = task.result
        if (task.resultCode === 200) {
          Logger.info('Server cart token created.', 'cart', cartToken)()
          commit(types.CART_LOAD_CART_SERVER_TOKEN, cartToken)
          return dispatch('sync', { forceClientState, dryRun: !config.cart.serverMergeByDefault })
        } else {
          let resultString = task.result ? toString(task.result) : null
          if (resultString && (resultString.indexOf(i18n.t('not authorized')) < 0 && resultString.indexOf('not authorized')) < 0) { // not respond to unathorized errors here
            if (_connectBypassCount < MAX_BYPASS_COUNT) {
              Logger.log('Bypassing with guest cart' + _connectBypassCount, 'cart')()
              _connectBypassCount = _connectBypassCount + 1
              Logger.error(task.result, 'cart')()
              return dispatch('connect', { guestCart: true })
            }
          }
        }
      })
    } else {
      Logger.warn('Cart sync is disabled by the config', 'cart')()
      return _getDifflogPrototype()
    }
  },
  /**  merge shopping cart with the server results; if dryRun = true only the diff phase is being executed */
  async merge ({ getters, dispatch, commit, rootGetters }, { serverItems, clientItems, dryRun = false, forceClientState = false }) {
    const diffLog = _getDifflogPrototype()
    let totalsShouldBeRefreshed = getters.isTotalsSyncRequired // when empty it means no sync has yet been executed
    let serverCartUpdateRequired = false
    let clientCartUpdateRequired = false
    let cartHasItems = false
    const clientCartAddItems = []

    /** helper to find the item to be added to the cart by sku */
    let productActionOptions = (serverItem) => {
      return new Promise(resolve => {
        if (serverItem.product_type === 'configurable') {
          let searchQuery = new SearchQuery()
          searchQuery = searchQuery.applyFilter({key: 'configurable_children.sku', value: {'eq': serverItem.sku}})
          dispatch('product/list', {query: searchQuery, start: 0, size: 1, updateState: false}, { root: true }).then((resp) => {
            if (resp.items.length >= 1) {
              resolve({ sku: resp.items[0].sku, childSku: serverItem.sku })
            }
          })
        } else {
          resolve({ sku: serverItem.sku })
        }
      })
    }
    /** helper - sub method to update the item in the cart */
    const _updateClientItem = async function ({ dispatch }, event, clientItem) {
      if (typeof event.result.item_id !== 'undefined') {
        await dispatch('updateItem', { product: { server_item_id: event.result.item_id, sku: clientItem.sku, server_cart_id: event.result.quote_id, prev_qty: clientItem.qty } }) // update the server_id reference
        Vue.prototype.$bus.$emit('cart-after-itemchanged', { item: clientItem })
      }
    }

    /** helper - sub method to react for the server response after the sync */
    const _afterServerItemUpdated = async function ({ dispatch, commit }, event, clientItem = null) {
      Logger.debug('Cart item server sync' + event, 'cart')()
      diffLog.serverResponses.push({ 'status': event.resultCode, 'sku': clientItem.sku, 'result': event })
      if (event.resultCode !== 200) {
        // TODO: add the strategy to configure behaviour if the product is (confirmed) out of the stock
        if (clientItem.server_item_id) {
          dispatch('getItem', clientItem.sku).then((cartItem) => {
            if (cartItem) {
              Logger.log('Restoring qty after error' + clientItem.sku + cartItem.prev_qty, 'cart')()
              if (cartItem.prev_qty > 0) {
                dispatch('updateItem', { product: { qty: cartItem.prev_qty } }) // update the server_id reference
                Vue.prototype.$bus.$emit('cart-after-itemchanged', { item: cartItem })
              } else {
                dispatch('removeItem', { product: cartItem, removeByParentSku: false }) // update the server_id reference
              }
            }
          })
        } else {
          Logger.warn('Removing product from cart', 'cart', clientItem)()
          commit(types.CART_DEL_NON_CONFIRMED_ITEM, { product: clientItem })
        }
      } else {
        const isUserInCheckout = rootGetters['checkout/isUserInCheckout']
        if (!isUserInCheckout) { // if user is in the checkout - this callback is just a result of server sync
          const isThisNewItemAddedToTheCart = (!clientItem || !clientItem.server_item_id)
          const notificationData = {
            type: 'success',
            message: isThisNewItemAddedToTheCart ? i18n.t('Product has been added to the cart!') : i18n.t('Product quantity has been updated!'),
            action1: { label: i18n.t('OK') },
            action2: null
          }
          if (!config.externalCheckout) { // if there is externalCheckout enabled we don't offer action to go to checkout as it can generate cart desync
            notificationData.action2 = { label: i18n.t('Proceed to checkout'),
              action: () => {
                dispatch('goToCheckout')
              }}
          }
          diffLog.clientNotifications.push(notificationData) // display the notification only for newly added products
        }
      }
      if (clientItem === null) {
        const cartItem = await dispatch('getItem', event.result.sku)
        if (cartItem) {
          await _updateClientItem({ dispatch }, event, cartItem)
        }
      } else {
        await _updateClientItem({ dispatch }, event, clientItem)
      }
    }
    for (const clientItem of clientItems) {
      cartHasItems = true
      const serverItem = serverItems.find((itm) => {
        return itm.sku === clientItem.sku || itm.sku.indexOf(clientItem.sku + '-') === 0 /* bundle products */
      })

      if (!serverItem) {
        Logger.warn('No server item with sku ' + clientItem.sku + ' on stock.', 'cart')()
        diffLog.items.push({ 'party': 'server', 'sku': clientItem.sku, 'status': 'no-item' })
        if (!dryRun) {
          if (forceClientState || !config.cart.serverSyncCanRemoveLocalItems) {
            const event = await _serverUpdateItem({
              cartServerToken: getters.getCartToken,
              cartItem: {
                sku: clientItem.parentSku && config.cart.setConfigurableProductOptions ? clientItem.parentSku : clientItem.sku,
                qty: clientItem.qty,
                product_option: clientItem.product_option
              }
            })
            _afterServerItemUpdated({ dispatch, commit }, event, clientItem)
            serverCartUpdateRequired = true
            totalsShouldBeRefreshed = true
          } else {
            dispatch('removeItem', {
              product: clientItem
            })
          }
        }
      } else if (serverItem.qty !== clientItem.qty) {
        Logger.log('Wrong qty for ' + clientItem.sku, clientItem.qty, serverItem.qty)()
        diffLog.items.push({ 'party': 'server', 'sku': clientItem.sku, 'status': 'wrong-qty', 'client-qty': clientItem.qty, 'server-qty': serverItem.qty })
        if (!dryRun) {
          if (forceClientState || !config.cart.serverSyncCanModifyLocalItems) {
            const event = await _serverUpdateItem({
              cartServerToken: getters.getCartToken,
              cartItem: {
                sku: clientItem.parentSku && config.cart.setConfigurableProductOptions ? clientItem.parentSku : clientItem.sku,
                qty: clientItem.qty,
                item_id: serverItem.item_id,
                quoteId: serverItem.quote_id,
                product_option: clientItem.product_option
              }
            })
            _afterServerItemUpdated({ dispatch, commit }, event, clientItem)
            totalsShouldBeRefreshed = true
            serverCartUpdateRequired = true
          } else {
            await dispatch('updateItem', {
              product: serverItem
            })
          }
        }
      } else {
        Logger.info('Server and client item with SKU ' + clientItem.sku + ' synced. Updating cart.', 'cart', 'cart')()
        if (!dryRun) {
          await dispatch('updateItem', { product: { sku: clientItem.sku, server_cart_id: serverItem.quote_id, server_item_id: serverItem.item_id, product_option: serverItem.product_option } })
        }
      }
    }

    for (const serverItem of serverItems) {
      if (serverItem) {
        const clientItem = clientItems.find((itm) => {
          return itm.sku === serverItem.sku || serverItem.sku.indexOf(itm.sku + '-') === 0 /* bundle products */
        })
        if (!clientItem) {
          Logger.info('No client item for' + serverItem.sku, 'cart')()
          diffLog.items.push({ 'party': 'client', 'sku': serverItem.sku, 'status': 'no-item' })

          if (!dryRun) {
            if (forceClientState) {
              Logger.info('Removing product from cart', 'cart', serverItem)()
              Logger.log('Removing item' + serverItem.sku + serverItem.item_id, 'cart')()
              serverCartUpdateRequired = true
              totalsShouldBeRefreshed = true
              const res = await _serverDeleteItem({
                cartServerToken: getters.getCartToken,
                cartItem: {
                  sku: serverItem.sku,
                  item_id: serverItem.item_id,
                  quoteId: serverItem.quote_id
                }
              })
              diffLog.serverResponses.push({ 'status': res.resultCode, 'sku': serverItem.sku, 'result': res })
            } else {
              clientCartAddItems.push(
                new Promise(resolve => {
                  productActionOptions(serverItem).then((actionOtions) => {
                    dispatch('product/single', { options: actionOtions, assignDefaultVariant: true, setCurrentProduct: false, selectDefaultVariant: false }, { root: true }).then((product) => {
                      resolve({ product: product, serverItem: serverItem })
                    })
                  })
                })
              )
            }
          }
        }
      }
    }
    if (clientCartAddItems.length) {
      totalsShouldBeRefreshed = true
      clientCartUpdateRequired = true
      cartHasItems = true
    }
    diffLog.items.push({ 'party': 'client', 'status': clientCartUpdateRequired ? 'update-required' : 'no-changes' })
    diffLog.items.push({ 'party': 'server', 'status': serverCartUpdateRequired ? 'update-required' : 'no-changes' })
    Promise.all(clientCartAddItems).then((items) => {
      items.map(({ product, serverItem }) => {
        product.server_item_id = serverItem.item_id
        product.qty = serverItem.qty
        product.server_cart_id = serverItem.quote_id
        if (serverItem.product_option) {
          product.product_option = serverItem.product_option
        }
        dispatch('addItem', { productToAdd: product, forceServerSilence: true })
      })
    })

    if (!dryRun) {
      if (totalsShouldBeRefreshed && cartHasItems) {
        await dispatch('syncTotals')
      }
      commit(types.CART_SET_ITEMS_HASH, getters.getCurrentCartHash) // update the cart hash
    }
    Vue.prototype.$bus.$emit('servercart-after-diff', { diffLog: diffLog, serverItems: serverItems, clientItems: clientItems, dryRun: dryRun, event: event }) // send the difflog
    Logger.info('Client/Server cart synchronised ', 'cart', diffLog)()
    return diffLog
  },
  toggleMicrocart ({ commit }) {
    commit(types.CART_TOGGLE_MICROCART)
  }
}

export default actions
