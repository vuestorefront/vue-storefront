import Vue from 'vue'
import { ActionTree } from 'vuex'
import * as types from './mutation-types'
import rootStore from '@vue-storefront/core/store'
import config from 'config'
import i18n from '@vue-storefront/i18n'
import { sha3_224 } from 'js-sha3'
import { currentStoreView, localizedRoute} from '@vue-storefront/core/lib/multistore'
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

const CART_PULL_INTERVAL_MS = 2000
const CART_CREATE_INTERVAL_MS = 1000
const CART_TOTALS_INTERVAL_MS = 200
const CART_METHODS_INTERVAL_MS = 1000 * 60 * 10 // refresh methods each 10 min
const MAX_BYPASS_COUNT = 10

function _updateClientItem (event, clientItem) {
  if (typeof event.result.item_id !== 'undefined') {
    rootStore.dispatch('cart/updateItem', { product: { server_item_id: event.result.item_id, sku: clientItem.sku, server_cart_id: event.result.quote_id, prev_qty: clientItem.qty } }, { root: true }) // update the server_id reference
    Vue.prototype.$bus.$emit('cart-after-itemchanged', { item: clientItem })
  }
}

function _afterServerItemUpdated (event, clientItem = null) {
  Logger.debug('Cart item server sync' + event, 'cart')()
  if (clientItem === null) {
    rootStore.dispatch('cart/getItem', event.result.sku, { root: true }).then((cartItem) => {
      if (cartItem) {
        _updateClientItem(event, cartItem)
      }
    })
  } else {
    _updateClientItem(event, clientItem)
  }
}

const actions: ActionTree<CartState, RootState> = {
  serverTokenClear (context) {
    context.commit(types.CART_LOAD_CART_SERVER_TOKEN, null)
  },
  clear (context) {
    context.commit(types.CART_LOAD_CART, [])
    context.commit(types.CART_LOAD_CART_SERVER_TOKEN, null)

    if (config.cart.synchronize) {
      context.dispatch('serverCreate', { guestCart: !config.orders.directBackendSync }) // guest cart when not using directBackendSync because when the order hasn't been passed to Magento yet it will repopulate your cart
    }
  },
  save (context) {
    context.commit(types.CART_SAVE)
  },
  serverPull (context, { forceClientState = false, dryRun = false }) { // pull current cart FROM the server
    if (config.cart.synchronize && !isServer && onlineHelper.isOnline && context.state.cartServerToken) {
      const newItemsHash = sha3_224(JSON.stringify({ items: context.state.cartItems, token: context.state.cartServerToken }))
      if ((Date.now() - context.state.cartServerPullAt) >= CART_PULL_INTERVAL_MS || (newItemsHash !== context.state.cartItemsHash)) {
        context.state.cartServerPullAt = Date.now()
        context.state.cartItemsHash = newItemsHash
        return TaskQueue.execute({ url: config.cart.pull_endpoint, // sync the cart
          payload: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
          },
          silent: true,
          force_client_state: forceClientState,
          dry_run: dryRun,
          callback_event: 'store:cart/servercartAfterPulled'
        }).then(task => {
          const storeView = currentStoreView()
          if ((Date.now() - context.state.cartServerMethodsRefreshAt) >= CART_METHODS_INTERVAL_MS) {
            context.state.cartServerMethodsRefreshAt = Date.now()
            Logger.debug('Refreshing payment & shipping methods', 'cart')()
            rootStore.dispatch('cart/getPaymentMethods')
            if (context.state.cartItems.length > 0) {
              let country = rootStore.state.checkout.shippingDetails.country ? rootStore.state.checkout.shippingDetails.country : storeView.tax.defaultCountry
              rootStore.dispatch('cart/getShippingMethods', {
                country_id: country
              })
            }
          }
        })
      } else {
        Logger.log('Too short interval for refreshing the cart or items not changed' + newItemsHash + context.state.cartItemsHash, 'cart')()
      }
    }
  },
  serverTotals (context, { forceClientState = false }) { // pull current cart FROM the server
    if (config.cart.synchronize_totals  && !isServer && onlineHelper.isOnline && context.state.cartServerToken) {
      if ((Date.now() - context.state.cartServerTotalsAt) >= CART_TOTALS_INTERVAL_MS) {
        TaskQueue.execute({ url: config.cart.totals_endpoint, // sync the cart
          payload: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
          },
          silent: true,
          force_client_state: forceClientState,
          callback_event: 'store:cart/servercartAfterTotals'
        })
      } else {
        Logger.log('Too short interval for refreshing the cart totals', 'cart')()
      }
    }
  },
  serverCreate (context, { guestCart = false }) {
    if (config.cart.synchronize && !isServer) {
      if ((Date.now() - context.state.cartServerCreatedAt) >= CART_CREATE_INTERVAL_MS) {
        const task = { url: guestCart ? config.cart.create_endpoint.replace('{{token}}', '') : config.cart.create_endpoint, // sync the cart
          payload: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
          },
          silent: true,
          callback_event: 'store:cart/servercartAfterCreated'
        }
        TaskQueue.execute(task)
        return task
      }
    }
  },
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
    }).then(task => {
      // eslint-disable-next-line no-useless-return
      if (config.cart.synchronize_totals && context.state.cartItems.length > 0) {
        context.dispatch('refreshTotals')
      }
      return task
    })
  },
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
    }).then(task => {
      // eslint-disable-next-line no-useless-return
      if (config.cart.synchronize_totals && context.state.cartItems.length > 0) {
        context.dispatch('refreshTotals')
      }
      return task
    })
  },
  load (context) {
    return new Promise((resolve, reject) => {
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
      Vue.prototype.$db.cartsCollection.getItem('current-cart', (err, storedItems) => {
        if (err) throw new Error(err)

        if (config.cart.synchronize) {
          Vue.prototype.$db.cartsCollection.getItem('current-cart-token', (err, token) => {
            if (err) throw new Error(err)
            // TODO: if token is null create cart server side and store the token!
            if (token) { // previously set token
              commit(types.CART_LOAD_CART_SERVER_TOKEN, token)
              Logger.info('Cart token received from cache.', 'cache', token)()
              Logger.info('Pulling cart from server.','cart')()
              context.dispatch('serverPull', { forceClientState: false, dryRun: !config.cart.serverMergeByDefault })
            } else {
              Logger.info('Creating server cart token', 'cart')()
              context.dispatch('serverCreate', { guestCart: false })
            }
          })
        }
        commit(types.CART_LOAD_CART, storedItems)
        resolve(storedItems)
      })
    })
  },
  // This should be a getter, just sayin
  getItem ({ commit, dispatch, state }, sku) {
    return state.cartItems.find(p => p.sku === sku)
  },
  goToCheckout (context) {
    router.push(localizedRoute('/checkout', currentStoreView().storeCode))
  },
  addItem ({ commit, dispatch, state }, { productToAdd, forceServerSilence = false }) {
    let productsToAdd = []
    if (productToAdd.type_id === 'grouped') { // TODO: add bundle support
      productsToAdd = productToAdd.product_links.filter((pl) => { return pl.link_type === 'associated' }).map((pl) => { return pl.product })
    } else {
      productsToAdd.push(productToAdd)
    }
    let productHasBeenAdded = false
    let productIndex = 0
    for (let product of productsToAdd) {
      if (typeof product === 'undefined' || product === null) continue
      if (product.qty && typeof product.qty !== 'number') product.qty = parseInt(product.qty)
      if ((config.useZeroPriceProduct)? product.priceInclTax < 0 : product.priceInclTax <= 0  ) {
        rootStore.dispatch('notification/spawnNotification', {
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
            rootStore.dispatch('notification/spawnNotification', {
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
      const record = state.cartItems.find(p => p.sku === product.sku)
      dispatch('stock/check', { product: product, qty: record ? record.qty + 1 : (product.qty ? product.qty : 1) }, {root: true}).then(result => {
        product.onlineStockCheckid = result.onlineCheckTaskId // used to get the online check result
        if (result.status === 'volatile') {
          rootStore.dispatch('notification/spawnNotification', {
            type: 'warning',
            message: i18n.t('The system is not sure about the stock quantity (volatile). Product has been added to the cart for pre-reservation.'),
            action1: { label: i18n.t('OK') }
          })
        }
        if (result.status === 'out_of_stock') {
          rootStore.dispatch('notification/spawnNotification', {
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
            notificationData.action2 = { label: i18n.t('Proceed to checkout'), action: () => {
              dispatch('goToCheckout')
            }}
          }
          if (config.cart.synchronize && !forceServerSilence) {
            dispatch('serverPull', { forceClientState: true })
          } else {
            rootStore.dispatch('notification/spawnNotification', notificationData)
          }
        }
        productIndex++
      })
    }
  },
  removeItem ({ commit, dispatch }, payload) {
    let removeByParentSku = true // backward compatibility call format
    let product = payload
    if(payload.product) { // new call format since 1.4
      product = payload.product
      removeByParentSku = payload.removeByParentSku
    }
    commit(types.CART_DEL_ITEM, { product, removeByParentSku })
    if (config.cart.synchronize && product.server_item_id) {
      dispatch('serverPull', { forceClientState: true })
    }
  },
  removeNonConfirmedVariants ({ commit, dispatch }, payload) {
    let removeByParentSku = true // backward compatibility call format
    let product = payload
    if(payload.product) { // new call format since 1.4
      product = payload.product
      removeByParentSku = payload.removeByParentSku
    }
    commit(types.CART_DEL_NON_CONFIRMED_ITEM, { product })
    if (config.cart.synchronize && product.server_item_id) {
      dispatch('serverPull', { forceClientState: true })
    }
  },
  updateQuantity ({ commit, dispatch }, { product, qty, forceServerSilence = false }) {
    commit(types.CART_UPD_ITEM, { product, qty })
    if (config.cart.synchronize && product.server_item_id && !forceServerSilence) {
      dispatch('serverPull', { forceClientState: true })
    }
  },
  updateItem ({ commit }, { product }) {
    commit(types.CART_UPD_ITEM_PROPS, { product })
  },
  getPaymentMethods (context) {
    if (config.cart.synchronize_totals && onlineHelper.isOnline && context.state.cartServerToken) {
      TaskQueue.execute({ url: config.cart.paymentmethods_endpoint,
        payload: {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors'
        },
        silent: true
      }).then((task: any) => {
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
        rootStore.dispatch('payment/replaceMethods', paymentMethods, { root: true })
        Vue.prototype.$bus.$emit('set-unique-payment-methods', uniqueBackendMethods)
      }).catch(e => {
        Logger.error(e, 'cart')()
      })
    }
  },
  getShippingMethods (context, address) {
    return new Promise((resolve, reject) => {
      if (config.cart.synchronize_totals && onlineHelper.isOnline && context.state.cartServerToken) {
        TaskQueue.execute({ url: config.cart.shippingmethods_endpoint,
          payload: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify({
              address: address
            })
          },
          silent: true
        }).then((task: any) => {
          if (task.result.length > 0) {
            rootStore.dispatch('shipping/replaceMethods', task.result, { root: true })
            resolve(task.result)
          }
        }).catch(e => {
          Logger.error(e, 'cart')()
          reject(e)
        })
      }
    })
  },
  refreshTotals (context, methodsData) {
    return new Promise((resolve, reject) => {
      const storeView = currentStoreView()
      if (config.cart.synchronize_totals && onlineHelper.isOnline && context.state.cartServerToken) {
        if (!methodsData) {
          let country = rootStore.state.checkout.shippingDetails.country ? rootStore.state.checkout.shippingDetails.country : storeView.tax.defaultCountry
          const shippingMethods = context.rootGetters['shipping/shippingMethods']
          const paymentMethods = context.rootGetters['payment/paymentMethods']
          let shipping = shippingMethods && Array.isArray(shippingMethods) ? shippingMethods.find(item => item.default) : null
          let payment = paymentMethods && Array.isArray(paymentMethods) ? paymentMethods.find(item => item.default) : null
          if (!shipping && shippingMethods && shippingMethods.length > 0) {
            shipping = shippingMethods[0]
          }
          if (!payment && paymentMethods && paymentMethods.length > 0) {
            payment = paymentMethods[0]
          }
          methodsData = {
            country: country,
            method_code: shipping ? shipping.method_code : null,
            carrier_code: shipping ? shipping.carrier_code : null,
            payment_method: payment ? payment.code : null
          }
        }
        if (methodsData.country && methodsData.carrier_code) {
          TaskQueue.execute({ url: config.cart.shippinginfo_endpoint,
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
          }).then((task : any) => {
            if (task.result) {
              resolve(task.result)
            }
          }).catch(e => {
            Logger.error(e, 'cart')()
            reject(e)
          })
        } else {
          context.dispatch('cart/serverTotals', {}, { root: true })
          resolve()
        }
      }
    })
  },
  removeCoupon (context) {
    return new Promise((resolve, reject) => {
      if (config.cart.synchronize_totals && onlineHelper.isOnline) {
        TaskQueue.execute({ url: config.cart.deletecoupon_endpoint,
          payload: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
          },
          silent: true
        }).then((task : any) => {
          if (task.result) {
            context.dispatch('refreshTotals')
            resolve(task.result)
          }
        }).catch(e => {
          Logger.error(e, 'cart')()
          reject(e)
        })
      }
    });
  },
  applyCoupon (context, couponCode) {
    return new Promise((resolve, reject) => {
      if (config.cart.synchronize_totals && onlineHelper.isOnline) {
        TaskQueue.execute({ url: config.cart.applycoupon_endpoint.replace('{{coupon}}', couponCode),
          payload: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
          },
          silent: true
        }).then((task:any) => {
          if (task.result === true) {
            context.dispatch('refreshTotals')
            resolve(task.result)
          } else {
            reject(false)
          }
        }).catch(e => {
          Logger.log(e, 'cart')()
          reject(e)
        })
      }
    })
  },
  userAfterLoggedin () {
    Vue.prototype.$db.usersCollection.getItem('last-cart-bypass-ts', (err, lastCartBypassTs) => {
      if (err) {
        Logger.error(err, 'cart')()
      }
      if (!config.cart.bypassCartLoaderForAuthorizedUsers || (Date.now() - lastCartBypassTs) >= (1000 * 60 * 24)) { // don't refresh the shopping cart id up to 24h after last order
        rootStore.dispatch('cart/serverCreate', { guestCart: false }, { root: true })
      }
    })
  },
  servercartAfterCreated (context, event) {
    const cartToken = event.result
    if (event.resultCode === 200) {
      Logger.info('Server cart token created.', 'cart', cartToken)()
      rootStore.commit(types.SN_CART + '/' + types.CART_LOAD_CART_SERVER_TOKEN, cartToken)
      rootStore.dispatch('cart/serverPull', { forceClientState: false, dryRun: !config.cart.serverMergeByDefault }, { root: true })
    } else {
      let resultString = event.result ? toString(event.result) : null
      if (resultString && (resultString.indexOf(i18n.t('not authorized')) < 0 && resultString.indexOf('not authorized')) < 0) { // not respond to unathorized errors here
        if (rootStore.state.cart.bypassCount < MAX_BYPASS_COUNT) {
          Logger.log('Bypassing with guest cart' + rootStore.state.cart.bypassCount, 'cart')()
          rootStore.state.cart.bypassCount = rootStore.state.cart.bypassCount + 1
          rootStore.dispatch('cart/serverCreate', { guestCart: true }, { root: true })
          Logger.error(event.result, 'cart')()
        }
      }
    }
  },
  servercartAfterTotals (context, event) {
    if (event.resultCode === 200) {
      const totalsObj = event.result.totals ? event.result.totals : event.result
      Logger.info('Overriding server totals. ', 'cart', totalsObj)()
      let itemsAfterTotal = {}
      let platformTotalSegments = totalsObj.total_segments
      for (let item of totalsObj.items) {
        if (item.options && isString(item.options)) item.options = JSON.parse(item.options)
        itemsAfterTotal[item.item_id] = item
        rootStore.dispatch('cart/updateItem', { product: { server_item_id: item.item_id, totals: item, qty: item.qty } }, { root: true }) // update the server_id reference
      }
      rootStore.commit(types.SN_CART + '/' + types.CART_UPD_TOTALS, { itemsAfterTotal: itemsAfterTotal, totals: totalsObj, platformTotalSegments: platformTotalSegments })
    } else {
      Logger.error(event.result, 'cart')()
    }
  },
  servercartAfterPulled (context, event) {
    if (event.resultCode === 200) {
      let diffLog = []
      let serverCartUpdateRequired = false
      let clientCartUpdateRequired = false
      let cartHasItems = false
      let clientCartAddItems = []
      let productActionOptions = ((serverItem) => {
        return new Promise(resolve => {
          if (serverItem.product_type === 'configurable') {
            let searchQuery = new SearchQuery()
            searchQuery = searchQuery.applyFilter({key: 'configurable_children.sku', value: {'eq': serverItem.sku}})
            rootStore.dispatch('product/list', {query: searchQuery, start: 0, size: 1, updateState: false}).then((resp) => {
              if (resp.items.length >= 1) {
                resolve({ sku: resp.items[0].sku, childSku: serverItem.sku })
              }
            })
          } else {
            resolve({ sku: serverItem.sku })
          }
        })
      })
      const serverItems = event.result
      const clientItems = rootStore.state.cart.cartItems
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
              rootStore.dispatch('cart/serverUpdateItem', {
                sku: clientItem.parentSku && config.cart.setConfigurableProductOptions ? clientItem.parentSku : clientItem.sku,
                qty: clientItem.qty,
                product_option: clientItem.product_option
              }, { root: true }).then((event) => {
                _afterServerItemUpdated(event, clientItem)
              })
              serverCartUpdateRequired = true
            } else {
              rootStore.dispatch('cart/removeItem', {
                product: clientItem
              }, { root: true })
            }
          }
        } else if (serverItem.qty !== clientItem.qty) {
          Logger.log('Wrong qty for ' + clientItem.sku, clientItem.qty, serverItem.qty)()
          diffLog.push({ 'party': 'server', 'sku': clientItem.sku, 'status': 'wrong_qty', 'client_qty': clientItem.qty, 'server_qty': serverItem.qty })
          if (!event.dry_run) {
            if (event.force_client_state || !config.cart.serverSyncCanModifyLocalItems) {
              rootStore.dispatch('cart/serverUpdateItem', {
                sku: clientItem.parentSku && config.cart.setConfigurableProductOptions ? clientItem.parentSku : clientItem.sku,
                qty: clientItem.qty,
                item_id: serverItem.item_id,
                quoteId: serverItem.quote_id,
                product_option: clientItem.product_option
              }, { root: true }).then((event) => {
                _afterServerItemUpdated(event, clientItem)
              })
              serverCartUpdateRequired = true
            } else {
              rootStore.dispatch('cart/updateItem', {
                product: serverItem
              }, { root: true })
            }
          }
        } else {
          Logger.info('Server and client item with SKU ' + clientItem.sku + ' synced. Updating cart.', 'cart', 'cart')()
          // Logger.log('Updating server id to ', { sku: clientItem.sku, server_cart_id: serverItem.quote_id, server_item_id: serverItem.item_id, product_option: serverItem.product_option })()
          if (!event.dry_run) {
            rootStore.dispatch('cart/updateItem', { product: { sku: clientItem.sku, server_cart_id: serverItem.quote_id, server_item_id: serverItem.item_id, product_option: serverItem.product_option } }, { root: true })
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
                rootStore.dispatch('cart/serverDeleteItem', {
                  sku: serverItem.sku,
                  item_id: serverItem.item_id,
                  quoteId: serverItem.quote_id
                }, { root: true })
              } else {
                clientCartAddItems.push(
                  new Promise(resolve => {
                    productActionOptions(serverItem).then((actionOtions) => {
                      rootStore.dispatch('product/single', { options: actionOtions, assignDefaultVariant: true, setCurrentProduct: false, selectDefaultVariant: false }).then((product) => {
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
        clientCartUpdateRequired = true
        cartHasItems = true
      }
      Promise.all(clientCartAddItems).then((items) => {
        items.map(({ product, serverItem }) => {
          product.server_item_id = serverItem.item_id
          product.qty = serverItem.qty
          product.server_cart_id = serverItem.quote_id
          if (serverItem.product_option) {
            product.product_option = serverItem.product_option
          }
          rootStore.dispatch('cart/addItem', { productToAdd: product, forceServerSilence: true }).then(() => {
          // rootStore.dispatch('cart/updateItem', { product: product })
          })
        })
      })

      if (!event.dry_run) {
        if ((!serverCartUpdateRequired || clientCartUpdateRequired) && cartHasItems) {
          rootStore.dispatch('cart/refreshTotals')
        }
      }
      Vue.prototype.$bus.$emit('servercart-after-diff', { diffLog: diffLog, serverItems: serverItems, clientItems: clientItems, dryRun: event.dry_run, event: event }) // send the difflog
       Logger.info('Client/Server cart synchronised ', 'cart', diffLog)()
    } else {
      Logger.error(event.result, 'cart') // override with guest cart()
      if (rootStore.state.cart.bypassCount < MAX_BYPASS_COUNT) {
        Logger.log('Bypassing with guest cart' + rootStore.state.cart.bypassCount, 'cart')()
        rootStore.state.cart.bypassCount = rootStore.state.cart.bypassCount + 1
        rootStore.dispatch('cart/serverCreate', { guestCart: true }, { root: true })
        Logger.error(event.result, 'cart')()
      }
    }
  },
  servercartAfterItemUpdated (context, event) {
    const originalCartItem = JSON.parse(event.payload.body).cartItem
    if (event.resultCode !== 200) {
      // TODO: add the strategy to configure behaviour if the product is (confirmed) out of the stock
      if (originalCartItem.item_id) {
        rootStore.dispatch('cart/getItem', originalCartItem.sku, { root: true }).then((cartItem) => {
          if (cartItem) {
            Logger.log('Restoring qty after error' + originalCartItem.sku + cartItem.prev_qty, 'cart')()
            if (cartItem.prev_qty > 0) {
              rootStore.dispatch('cart/updateItem', { product: { qty: cartItem.prev_qty } }, { root: true }) // update the server_id reference
              Vue.prototype.$bus.$emit('cart-after-itemchanged', { item: cartItem })
            } else {
              rootStore.dispatch('cart/removeItem', { product: cartItem, removeByParentSku: false }, { root: true }) // update the server_id reference
            }
          }
        })
      } else {
        Logger.warn('Removing product from cart', 'cart', originalCartItem)()
        rootStore.commit('cart/' + types.CART_DEL_NON_CONFIRMED_ITEM, { product: originalCartItem }, {root: true})
      }
    } else {
      const isThisNewItemAddedToTheCart = (!originalCartItem || !originalCartItem.item_id)
      if (isThisNewItemAddedToTheCart) {
        let notificationData = {
          type: 'success',
          message: i18n.t('Product has been added to the cart!'),
          action1: { label: i18n.t('OK') },
          action2: null
        }
        if (!config.externalCheckout) { // if there is externalCheckout enabled we don't offer action to go to checkout as it can generate cart desync
          notificationData.action2 = { label: i18n.t('Proceed to checkout'), action: () => {
            context.dispatch('goToCheckout')
          }}
        }
        rootStore.dispatch('notification/spawnNotification', notificationData)
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
