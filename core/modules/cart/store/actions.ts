import Vue from 'vue'
import { ActionTree } from 'vuex'
import * as types from './mutation-types'
import i18n from '@vue-storefront/i18n'
import { sha3_224 } from 'js-sha3'
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
import { isServer, onlineHelper } from '@vue-storefront/core/helpers'
import config from 'config'

const CART_PULL_INTERVAL_MS = 2000
const CART_CREATE_INTERVAL_MS = 1000
const CART_TOTALS_INTERVAL_MS = 200
const CART_METHODS_INTERVAL_MS = 2000 // refresh methods each 2 s when anything changed in the cart
const MAX_BYPASS_COUNT = 10

async function _updateClientItem (context, event, clientItem) {
  if (typeof event.result.item_id !== 'undefined') {
    await context.dispatch('updateItem', { product: { server_item_id: event.result.item_id, sku: clientItem.sku, server_cart_id: event.result.quote_id, prev_qty: clientItem.qty } }) // update the server_id reference
    Vue.prototype.$bus.$emit('cart-after-itemchanged', { item: clientItem })
  }
}

async function _afterServerItemUpdated (context, event, clientItem = null) {
  Logger.debug('Cart item server sync' + event, 'cart')()
  if (clientItem === null) {
    const cartItem = await context.dispatch('getItem', event.result.sku)
    if (cartItem) {
      await _updateClientItem(context, event, cartItem)
    }
  } else {
    await _updateClientItem(context, event, clientItem)
  }
}

const actions: ActionTree<CartState, RootState> = {
  serverTokenClear (context) {
    context.commit(types.CART_LOAD_CART_SERVER_TOKEN, null)
  },
  async clear (context, options = { recreateAndSyncCart: true }) {
    await context.commit(types.CART_LOAD_CART, [])
    if (options.recreateAndSyncCart && config.cart.synchronize) {
      await context.commit(types.CART_LOAD_CART_SERVER_TOKEN, null)
      await context.dispatch('serverCreate', { guestCart: !config.orders.directBackendSync }) // guest cart when not using directBackendSync because when the order hasn't been passed to Magento yet it will repopulate your cart
    }
  },
  save (context) {
    context.commit(types.CART_SAVE)
  },
  /** @todo: move this metod to data resolver; shouldn't be a part of public API no more */
  async serverPullMethods (context) {
    const storeView = currentStoreView()
    Logger.debug('Refreshing payment & shipping methods', 'cart')()
    await context.dispatch('getPaymentMethods')
    let country = context.rootState.checkout.shippingDetails.country ? context.rootState.checkout.shippingDetails.country : storeView.tax.defaultCountry
    await context.dispatch('getShippingMethods', {
      country_id: country
    })
  },
  async serverPull (context, { forceClientState = false, dryRun = false }) { // pull current cart FROM the server
    const isUserInCheckout = context.rootGetters['checkout/isUserInCheckout']
    if (isUserInCheckout) forceClientState = true // never surprise the user in checkout - #
    if (config.cart.synchronize && !isServer && onlineHelper.isOnline && context.state.cartServerToken) {
      const newItemsHash = sha3_224(JSON.stringify({ items: context.state.cartItems, token: context.state.cartServerToken }))
      if ((Date.now() - context.state.cartServerPullAt) >= CART_PULL_INTERVAL_MS || (newItemsHash !== context.state.cartItemsHash)) {
        context.state.cartServerPullAt = Date.now()
        context.state.cartItemsHash = newItemsHash
        /** @todo: move this call to data resolver; shouldn't be a part of public API no more */
        const task = await TaskQueue.execute({ url: config.cart.pull_endpoint, // sync the cart
          payload: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
          },
          silent: true,
          force_client_state: forceClientState,
          dry_run: dryRun,
          callback_event: 'store:cart/servercartAfterPulled'
        })
        return task
      } else {
        Logger.log('Too short interval for refreshing the cart or items not changed' + newItemsHash + context.state.cartItemsHash, 'cart')()
        return null
      }
    } else {
      return null
    }
  },
  /** @todo: move this metod to data resolver; shouldn't be a part of public API no more */
  serverTotals (context) {
    if (config.cart.synchronize_totals && !isServer && onlineHelper.isOnline && context.state.cartServerToken) {
      if ((Date.now() - context.state.cartServerTotalsAt) >= CART_TOTALS_INTERVAL_MS) {
        TaskQueue.execute({ url: config.cart.totals_endpoint, // sync the cart
          payload: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
          },
          silent: true,
          callback_event: 'store:cart/servercartAfterTotals'
        })
      } else {
        Logger.log('Too short interval for refreshing the cart totals', 'cart')()
      }
    }
  },
  /** @todo: move this metod to data resolver; shouldn't be a part of public API no more */
  serverCreate (context, { guestCart = false, forceClientState = false }) {
    if (config.cart.synchronize && !isServer) {
      if ((Date.now() - context.state.cartServerCreatedAt) >= CART_CREATE_INTERVAL_MS) {
        const task = { url: guestCart ? config.cart.create_endpoint.replace('{{token}}', '') : config.cart.create_endpoint, // sync the cart
          payload: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
          },
          force_client_state: forceClientState,
          silent: true,
          callback_event: 'store:cart/servercartAfterCreated'
        }
        TaskQueue.execute(task)
        return task
      } else {
        return null
      }
    } else {
      return null
    }
  },
  /** @todo: move this metod to data resolver; shouldn't be a part of public API no more */
  serverUpdateItem (context, cartItem) {
    if (!cartItem.quoteId) {
      cartItem = Object.assign(cartItem, { quoteId: context.state.cartServerToken })
    }

    return TaskQueue.execute({ url: config.cart.updateitem_endpoint, // sync the cart
      payload: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({
          cartItem: cartItem
        })
      },
      callback_event: 'store:cart/servercartAfterItemUpdated'
    })
  },
  /** @todo: move this metod to data resolver; shouldn't be a part of public API no more */
  serverDeleteItem (context, cartItem) {
    if (!cartItem.quoteId) {
      cartItem = Object.assign(cartItem, { quoteId: context.state.cartServerToken })
    }
    cartItem = Object.assign(cartItem, { quoteId: context.state.cartServerToken })
    return TaskQueue.execute({ url: config.cart.deleteitem_endpoint, // sync the cart
      payload: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({
          cartItem: cartItem
        })
      },
      silent: true,
      callback_event: 'store:cart/servercartAfterItemDeleted'
    })
  },
  /** @description this method is part of "public" cart API */
  async load (context, { forceClientState = false }: {forceClientState?: boolean} = {}) {
    if (isServer) return
    const commit = context.commit
    const state = context.state

    if ((!state.shipping || !state.shipping.method_code) && (Array.isArray(context.rootGetters['shipping/shippingMethods']))) {
      let shippingMethod = context.rootGetters['shipping/shippingMethods'].find(item => item.default)
      commit(types.CART_UPD_SHIPPING, shippingMethod)
    }
    if ((!state.payment || !state.payment.code) && Array.isArray(context.rootGetters['payment/paymentMethods'])) {
      let paymentMethod = context.rootGetters['payment/paymentMethods'].find(item => item.default)
      commit(types.CART_UPD_PAYMENT, paymentMethod)
    }
    const storedItems = await Vue.prototype.$db.cartsCollection.getItem('current-cart')
    if (config.cart.synchronize) {
      const token = await Vue.prototype.$db.cartsCollection.getItem('current-cart-token')
      if (token) { // previously set token
        commit(types.CART_LOAD_CART_SERVER_TOKEN, token)
        Logger.info('Cart token received from cache.', 'cache', token)()
        Logger.info('Pulling cart from server.', 'cart')()
        context.dispatch('serverPull', { forceClientState, dryRun: !config.cart.serverMergeByDefault })
      } else {
        Logger.info('Creating server cart token', 'cart')()
        context.dispatch('serverCreate', { guestCart: false })
      }
    }
    commit(types.CART_LOAD_CART, storedItems)
  },
  // This should be a getter, just sayin
  getItem ({ state }, sku) {
    return state.cartItems.find(p => p.sku === sku)
  },
  goToCheckout (context) {
    router.push(localizedRoute('/checkout', currentStoreView().storeCode))
  },
  /** @description this method is part of "public" cart API */
  addItem ({ dispatch }, { productToAdd, forceServerSilence = false }) {
    let productsToAdd = []
    if (productToAdd.type_id === 'grouped') { // TODO: add bundle support
      productsToAdd = productToAdd.product_links.filter((pl) => { return pl.link_type === 'associated' }).map((pl) => { return pl.product })
    } else {
      productsToAdd.push(productToAdd)
    }
    return dispatch('addItems', { productsToAdd: productsToAdd, forceServerSilence })
  },
  /** @description this method is part of "public" cart API */
  addItems ({ commit, dispatch, state }, { productsToAdd, forceServerSilence = false }) {
    let productHasBeenAdded = false
    let productIndex = 0
    for (let product of productsToAdd) {
      if (typeof product === 'undefined' || product === null) continue
      if (product.qty && typeof product.qty !== 'number') product.qty = parseInt(product.qty)
      if ((config.useZeroPriceProduct) ? product.priceInclTax < 0 : product.priceInclTax <= 0) {
        dispatch('notification/spawnNotification', {
          type: 'error',
          message: i18n.t('Product price is unknown, product cannot be added to the cart!'),
          action1: { label: i18n.t('OK') }
        }, { root: true })
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
            dispatch('notification/spawnNotification', {
              type: 'error',
              message: product.errors[errKey],
              action1: { label: i18n.t('OK') }
            }, { root: true })
          }
        }
        if (!productCanBeAdded) {
          continue
        }
      }
      const record = state.cartItems.find(p => p.sku === product.sku)
      dispatch('stock/check', { product: product, qty: record ? record.qty + 1 : (product.qty ? product.qty : 1) }, {root: true}).then(result => {
        product.onlineStockCheckid = result.onlineCheckTaskId // used to get the online check result
        if (result.status === 'volatile') {
          dispatch('notification/spawnNotification', {
            type: 'warning',
            message: i18n.t('The system is not sure about the stock quantity (volatile). Product has been added to the cart for pre-reservation.'),
            action1: { label: i18n.t('OK') }
          }, { root: true })
        }
        if (result.status === 'out_of_stock') {
          dispatch('notification/spawnNotification', {
            type: 'error',
            message: i18n.t('The product is out of stock and cannot be added to the cart!'),
            action1: { label: i18n.t('OK') }
          }, { root: true })
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
          if (config.cart.synchronize && !forceServerSilence) {
            dispatch('serverPull', { forceClientState: true })
          } else {
            dispatch('notification/spawnNotification', notificationData, { root: true })
          }
        }
        productIndex++
      })
    }
  },
  /** @description this method is part of "public" cart API */
  removeItem ({ commit, dispatch }, payload) {
    let removeByParentSku = true // backward compatibility call format
    let product = payload
    if (payload.product) { // new call format since 1.4
      product = payload.product
      removeByParentSku = payload.removeByParentSku
    }
    commit(types.CART_DEL_ITEM, { product, removeByParentSku })
    if (config.cart.synchronize && product.server_item_id) {
      dispatch('serverPull', { forceClientState: true })
    }
  },
  removeNonConfirmedVariants ({ commit, dispatch }, payload) {
    let product = payload
    if (payload.product) { // new call format since 1.4
      product = payload.product
    }
    commit(types.CART_DEL_NON_CONFIRMED_ITEM, { product })
    if (config.cart.synchronize && product.server_item_id) {
      dispatch('serverPull', { forceClientState: true })
    }
  },
  /** @description this method is part of "public" cart API */
  updateQuantity ({ commit, dispatch }, { product, qty, forceServerSilence = false }) {
    commit(types.CART_UPD_ITEM, { product, qty })
    if (config.cart.synchronize && product.server_item_id && !forceServerSilence) {
      dispatch('serverPull', { forceClientState: true })
    }
  },
  updateItem ({ commit }, { product }) {
    commit(types.CART_UPD_ITEM_PROPS, { product })
  },
  /** @todo move the network call to data resolver, the method should not be part of public API but probably should stay in the Vuex*/
  async getPaymentMethods (context) {
    if (config.cart.synchronize_totals && onlineHelper.isOnline && context.state.cartServerToken) {
      const task = await TaskQueue.execute({ url: config.cart.paymentmethods_endpoint,
        payload: {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors'
        },
        silent: true
      })
      let backendMethods = task.result
      let paymentMethods = context.rootGetters['payment/paymentMethods'].slice(0).filter((itm) => {
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
      await context.dispatch('payment/replaceMethods', paymentMethods, { root: true })
      Vue.prototype.$bus.$emit('set-unique-payment-methods', uniqueBackendMethods)
      return task.result
    }
  },
  /** @todo move the network call to data resolver, the method should not be part of public API but probably should stay in the Vuex*/  
  async getShippingMethods (context, address) {
    if (config.cart.synchronize_totals && onlineHelper.isOnline && context.state.cartServerToken) {
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
      if (task.result.length > 0) {
        await context.dispatch('shipping/replaceMethods', task.result.map(method => Object.assign(method, { is_server_method: true })), { root: true })
        return task.result
      }
    }
  },
  /** @description this method is part of "public" cart API */
  async refreshTotals (context, methodsData) {
    if ((Date.now() - context.state.cartServerMethodsRefreshAt) >= CART_METHODS_INTERVAL_MS) {
      await context.dispatch('serverPullMethods') // pull the shipping and payment methods available for the current cart content          
      context.state.cartServerMethodsRefreshAt = Date.now()
    }              
    const storeView = currentStoreView()
    let hasShippingInformation = false
    if (config.cart.synchronize_totals && onlineHelper.isOnline && context.state.cartServerToken) {
      if (!methodsData) {
        let country = context.rootState.checkout.shippingDetails.country ? context.rootState.checkout.shippingDetails.country : storeView.tax.defaultCountry
        const shippingMethods = context.rootGetters['shipping/shippingMethods']
        const paymentMethods = context.rootGetters['payment/paymentMethods']
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
        if(shipping) {
          if(shipping.method_code) {
            hasShippingInformation = true // there are some edge cases when the backend returns no shipping info
            methodsData['method_code'] = shipping.method_code
          }
          if(shipping.carrier_code) {
            hasShippingInformation = true
            methodsData['carrier_code'] = shipping.carrier_code
          }
        }
        if(payment && payment.code) methodsData['payment_method'] = payment.code
      }
      if (methodsData.country && context.state.cartServerToken) {
        if (hasShippingInformation) {
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
            silent: true,
            callback_event: 'store:cart/servercartAfterTotals'
          })
          return task.result
        } else {
          return context.dispatch('serverTotals')
        }
      } else {
        Logger.error('Please do set the tax.defaultCountry in order to calculate totals', 'cart')()
      }
    }
  },
  /** @description this method is part of "public" cart API */
  async removeCoupon (context) {
    if (context.getters.isTotalsSyncEnabled) {
      const task = await TaskQueue.execute({ url: config.cart.deletecoupon_endpoint,
        payload: {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors'
        },
        silent: true
      })
      if (task.result) {
        context.dispatch('refreshTotals')
        return task.result
      }
    }
    return null
  },
  /** @description this method is part of "public" cart API */
  async applyCoupon (context, couponCode) {
    if (context.getters.isTotalsSyncEnabled) {
      const task = await TaskQueue.execute({ url: config.cart.applycoupon_endpoint.replace('{{coupon}}', couponCode),
        payload: {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors'
        },
        silent: true
      })
      if (task.result === true) {
        context.dispatch('refreshTotals')
        return task.result
      }
    }
    return null
  },
  userAfterLoggedin (context) {
    Vue.prototype.$db.usersCollection.getItem('last-cart-bypass-ts', (err, lastCartBypassTs) => {
      if (err) {
        Logger.error(err, 'cart')()
      }
      if (!config.cart.bypassCartLoaderForAuthorizedUsers || (Date.now() - lastCartBypassTs) >= (1000 * 60 * 24)) { // don't refresh the shopping cart id up to 24h after last order
        context.dispatch('serverCreate', { guestCart: false })
      }
    })
  },
  servercartAfterCreated (context, event) {
    const cartToken = event.result
    if (event.resultCode === 200) {
      Logger.info('Server cart token created.', 'cart', cartToken)()
      context.commit(types.CART_LOAD_CART_SERVER_TOKEN, cartToken)
      context.dispatch('serverPull', { forceClientState: event.force_client_state || false, dryRun: !config.cart.serverMergeByDefault })
    } else {
      let resultString = event.result ? toString(event.result) : null
      if (resultString && (resultString.indexOf(i18n.t('not authorized')) < 0 && resultString.indexOf('not authorized')) < 0) { // not respond to unathorized errors here
        if (context.rootState.cart.bypassCount < MAX_BYPASS_COUNT) {
          Logger.log('Bypassing with guest cart' + context.rootState.cart.bypassCount, 'cart')()
          context.rootState.cart.bypassCount = context.rootState.cart.bypassCount + 1
          context.dispatch('serverCreate', { guestCart: true })
          Logger.error(event.result, 'cart')()
        }
      }
    }
  },
  async servercartAfterTotals (context, event) {
    if (event.resultCode === 200) {
      const totalsObj = event.result.totals ? event.result.totals : event.result
      Logger.info('Overriding server totals. ', 'cart', totalsObj)()
      let itemsAfterTotal = {}
      let platformTotalSegments = totalsObj.total_segments
      for (let item of totalsObj.items) {
        if (item.options && isString(item.options)) item.options = JSON.parse(item.options)
        itemsAfterTotal[item.item_id] = item
        await context.dispatch('updateItem', { product: { server_item_id: item.item_id, totals: item, qty: item.qty } }) // update the server_id reference
      }
      context.commit(types.CART_UPD_TOTALS, { itemsAfterTotal: itemsAfterTotal, totals: totalsObj, platformTotalSegments: platformTotalSegments })
    } else {
      Logger.error(event.result, 'cart')()
    }
  },
  async servercartAfterPulled (context, event) {
    if (event.resultCode === 200) {
      let diffLog = []
      let totalsShouldBeRefreshed = false
      let serverCartUpdateRequired = false
      let clientCartUpdateRequired = false
      let cartHasItems = false
      let clientCartAddItems = []
      let productActionOptions = (serverItem) => {
        return new Promise(resolve => {
          if (serverItem.product_type === 'configurable') {
            let searchQuery = new SearchQuery()
            searchQuery = searchQuery.applyFilter({key: 'configurable_children.sku', value: {'eq': serverItem.sku}})
            context.dispatch('product/list', {query: searchQuery, start: 0, size: 1, updateState: false}, { root: true }).then((resp) => {
              if (resp.items.length >= 1) {
                resolve({ sku: resp.items[0].sku, childSku: serverItem.sku })
              }
            })
          } else {
            resolve({ sku: serverItem.sku })
          }
        })
      }
      const serverItems = event.result
      const clientItems = context.rootState.cart.cartItems
      for (const clientItem of clientItems) {
        cartHasItems = true
        const serverItem = serverItems.find((itm) => {
          return itm.sku === clientItem.sku || itm.sku.indexOf(clientItem.sku + '-') === 0 /* bundle products */
        })

        if (!serverItem) {
          Logger.warn('No server item with sku ' + clientItem.sku + ' on stock.', 'cart')()
          diffLog.push({ 'party': 'server', 'sku': clientItem.sku, 'status': 'no_item' })
          if (!event.dry_run) {
            if (event.force_client_state || !config.cart.serverSyncCanRemoveLocalItems) {
              const event = await context.dispatch('serverUpdateItem', {
                sku: clientItem.parentSku && config.cart.setConfigurableProductOptions ? clientItem.parentSku : clientItem.sku,
                qty: clientItem.qty,
                product_option: clientItem.product_option
              })
              _afterServerItemUpdated(context, event, clientItem)
              serverCartUpdateRequired = true
              totalsShouldBeRefreshed = true
            } else {
              context.dispatch('removeItem', {
                product: clientItem
              })
            }
          }
        } else if (serverItem.qty !== clientItem.qty) {
          Logger.log('Wrong qty for ' + clientItem.sku, clientItem.qty, serverItem.qty)()
          diffLog.push({ 'party': 'server', 'sku': clientItem.sku, 'status': 'wrong_qty', 'client_qty': clientItem.qty, 'server_qty': serverItem.qty })
          if (!event.dry_run) {
            if (event.force_client_state || !config.cart.serverSyncCanModifyLocalItems) {
              const event = await context.dispatch('serverUpdateItem', {
                sku: clientItem.parentSku && config.cart.setConfigurableProductOptions ? clientItem.parentSku : clientItem.sku,
                qty: clientItem.qty,
                item_id: serverItem.item_id,
                quoteId: serverItem.quote_id,
                product_option: clientItem.product_option
              })
              _afterServerItemUpdated(context, event, clientItem)
              totalsShouldBeRefreshed = true
              serverCartUpdateRequired = true
            } else {
              await context.dispatch('updateItem', {
                product: serverItem
              })
            }
          }
        } else {
          Logger.info('Server and client item with SKU ' + clientItem.sku + ' synced. Updating cart.', 'cart', 'cart')()
          // Logger.log('Updating server id to ', { sku: clientItem.sku, server_cart_id: serverItem.quote_id, server_item_id: serverItem.item_id, product_option: serverItem.product_option })()
          if (!event.dry_run) {
            await context.dispatch('updateItem', { product: { sku: clientItem.sku, server_cart_id: serverItem.quote_id, server_item_id: serverItem.item_id, product_option: serverItem.product_option } })
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
            diffLog.push({ 'party': 'client', 'sku': serverItem.sku, 'status': 'no_item' })

            if (!event.dry_run) {
              if (event.force_client_state) {
                Logger.info('Removing product from cart', 'cart', serverItem)()

                Logger.log('Removing item' + serverItem.sku + serverItem.item_id, 'cart')()
                serverCartUpdateRequired = true
                totalsShouldBeRefreshed = true
                await context.dispatch('serverDeleteItem', {
                  sku: serverItem.sku,
                  item_id: serverItem.item_id,
                  quoteId: serverItem.quote_id
                })
              } else {
                clientCartAddItems.push(
                  new Promise(resolve => {
                    productActionOptions(serverItem).then((actionOtions) => {
                      context.dispatch('product/single', { options: actionOtions, assignDefaultVariant: true, setCurrentProduct: false, selectDefaultVariant: false }, { root: true }).then((product) => {
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
      diffLog.push({ 'party': 'client', 'status': clientCartUpdateRequired ? 'updateRequired' : 'no-changes' })
      diffLog.push({ 'party': 'server', 'status': serverCartUpdateRequired ? 'updateRequired' : 'no-changes' })
      Promise.all(clientCartAddItems).then((items) => {
        items.map(({ product, serverItem }) => {
          product.server_item_id = serverItem.item_id
          product.qty = serverItem.qty
          product.server_cart_id = serverItem.quote_id
          if (serverItem.product_option) {
            product.product_option = serverItem.product_option
          }
          context.dispatch('addItem', { productToAdd: product, forceServerSilence: true })
        })
      })

      if (!event.dry_run) {
        if (totalsShouldBeRefreshed && cartHasItems) {
          await context.dispatch('refreshTotals')
        }
      }
      Vue.prototype.$bus.$emit('servercart-after-diff', { diffLog: diffLog, serverItems: serverItems, clientItems: clientItems, dryRun: event.dry_run, event: event }) // send the difflog
      Logger.info('Client/Server cart synchronised ', 'cart', diffLog)()
    } else {
      Logger.error(event.result, 'cart') // override with guest cart()
      if (context.rootState.cart.bypassCount < MAX_BYPASS_COUNT) {
        Logger.log('Bypassing with guest cart' + context.rootState.cart.bypassCount, 'cart')()
        context.rootState.cart.bypassCount = context.rootState.cart.bypassCount + 1
        context.dispatch('serverCreate', { guestCart: true })
        Logger.error(event.result, 'cart')()
      }
    }
  },
  servercartAfterItemUpdated (context, event) {
    const originalCartItem = JSON.parse(event.payload.body).cartItem
    if (event.resultCode !== 200) {
      // TODO: add the strategy to configure behaviour if the product is (confirmed) out of the stock
      if (originalCartItem.item_id) {
        context.dispatch('getItem', originalCartItem.sku).then((cartItem) => {
          if (cartItem) {
            Logger.log('Restoring qty after error' + originalCartItem.sku + cartItem.prev_qty, 'cart')()
            if (cartItem.prev_qty > 0) {
              context.dispatch('updateItem', { product: { qty: cartItem.prev_qty } }) // update the server_id reference
              Vue.prototype.$bus.$emit('cart-after-itemchanged', { item: cartItem })
            } else {
              context.dispatch('removeItem', { product: cartItem, removeByParentSku: false }) // update the server_id reference
            }
          }
        })
      } else {
        Logger.warn('Removing product from cart', 'cart', originalCartItem)()
        context.commit(types.CART_DEL_NON_CONFIRMED_ITEM, { product: originalCartItem })
      }
    } else {
      const isUserInCheckout = context.rootGetters['checkout/isUserInCheckout']
      if (!isUserInCheckout) { // if user is in the checkout - this callback is just a result of server sync
        const isThisNewItemAddedToTheCart = (!originalCartItem || !originalCartItem.item_id)
        const notificationData = {
          type: 'success',
          message: isThisNewItemAddedToTheCart ? i18n.t('Product has been added to the cart!') : i18n.t('Product quantity has been updated!'),
          action1: { label: i18n.t('OK') },
          action2: null
        }
        if (!config.externalCheckout) { // if there is externalCheckout enabled we don't offer action to go to checkout as it can generate cart desync
          notificationData.action2 = { label: i18n.t('Proceed to checkout'),
            action: () => {
              context.dispatch('goToCheckout')
            }}
        }
        context.dispatch('notification/spawnNotification', notificationData, { root: true })
      }
    }
  },
  toggleMicrocart ({ commit }) {
    commit(types.CART_TOGGLE_MICROCART)
  },
  servercartAfterItemDeleted (context, event) {
  }
}

export default actions
