import config from 'config'
import * as types from '../../mutation-types'
import rootStore from '../../'
import EventBus from 'core/plugins/event-bus'
import i18n from 'core/lib/i18n'
import hash from 'object-hash'

const CART_PULL_INTERVAL_MS = 2000
const CART_CREATE_INTERVAL_MS = 1000
const CART_TOTALS_INTERVAL_MS = 200

export default {
  serverTokenClear (context) {
    context.commit(types.CART_LOAD_CART_SERVER_TOKEN, '')
  },
  clear (context) {
    context.commit(types.CART_LOAD_CART, [])
    context.commit(types.CART_LOAD_CART_SERVER_TOKEN, '')
    if (config.cart.synchronize) {
      rootStore.dispatch('cart/serverCreate', { guestCart: true }, {root: true}) // guest cart because when the order hasn't been passed to magento yet it will repopulate your cart
    }
  },
  save (context) {
    context.commit(types.CART_SAVE)
  },
  serverPull (context, { forceClientState = false }) { // pull current cart FROM the server
    if (config.cart.synchronize) {
      const newItemsHash = hash({ items: context.state.cartItems, token: context.state.cartServerToken })
      if ((new Date() - context.state.cartServerPullAt) >= CART_PULL_INTERVAL_MS || (newItemsHash !== context.state.cartItemsHash)) {
        context.state.cartServerPullAt = new Date()
        context.state.cartItemsHash = newItemsHash
        context.dispatch('sync/execute', { url: config.cart.pull_endpoint, // sync the cart
          payload: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
          },
          silent: true,
          force_client_state: forceClientState,
          callback_event: 'servercart-after-pulled'
        }, { root: true }).then(task => {
          rootStore.dispatch('cart/getPaymentMethods')
          if (context.state.cartItems.length > 0) {
            let country = rootStore.state.checkout.shippingDetails.country ? rootStore.state.checkout.shippingDetails.country : config.tax.defaultCountry
            rootStore.dispatch('cart/getShippingMethods', {
              country_id: country
            })
          }
        })
      } else {
        console.log('Too short interval for refreshing the cart or items not changed', newItemsHash, context.state.cartItemsHash)
      }
    }
  },
  serverTotals (context, { forceClientState = false }) { // pull current cart FROM the server
    if (config.cart.synchronize_totals) {
      if ((new Date() - context.state.cartServerTotalsAt) >= CART_TOTALS_INTERVAL_MS) {
        context.state.cartServerPullAt = new Date()
        context.dispatch('sync/execute', { url: config.cart.totals_endpoint, // sync the cart
          payload: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
          },
          silent: true,
          force_client_state: forceClientState,
          callback_event: 'servercart-after-totals'
        }, { root: true }).then(task => {

        })
      } else {
        console.log('Too short interval for refreshing the cart totals')
      }
    }
  },
  serverCreate (context, { guestCart = false }) {
    if (config.cart.synchronize) {
      if ((new Date() - context.state.cartServerCreatedAt) >= CART_CREATE_INTERVAL_MS) {
        const task = { url: guestCart ? config.cart.create_endpoint.replace('{{token}}', '') : config.cart.create_endpoint, // sync the cart
          payload: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
          },
          silent: true,
          callback_event: 'servercart-after-created'
        }
        context.dispatch('sync/execute', task, { root: true }).then(task => {})
        return task
      }
    }
  },
  serverUpdateItem (context, cartItem) {
    if (config.cart.synchronize) {
      if (!cartItem.quoteId) {
        cartItem = Object.assign(cartItem, { quoteId: context.state.cartServerToken })
      }
      context.dispatch('sync/execute', { url: config.cart.updateitem_endpoint, // sync the cart
        payload: {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors',
          body: JSON.stringify({
            cartItem: cartItem
          })
        },
        callback_event: 'servercart-after-itemupdated'
      }, { root: true }).then(task => {
        // eslint-disable-next-line no-useless-return
        if (config.cart.synchronize_totals) {
          context.dispatch('refreshTotals')
        }
        return
      })
    }
  },
  serverDeleteItem (context, cartItem) {
    if (config.cart.synchronize) {
      if (!cartItem.quoteId) {
        cartItem = Object.assign(cartItem, { quoteId: context.state.cartServerToken })
      }
      cartItem = Object.assign(cartItem, { quoteId: context.state.cartServerToken })
      context.dispatch('sync/execute', { url: config.cart.deleteitem_endpoint, // sync the cart
        payload: {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors',
          body: JSON.stringify({
            cartItem: cartItem
          })
        },
        silent: true,
        callback_event: 'servercart-after-itemdeleted'
      }, { root: true }).then(task => {
        // eslint-disable-next-line no-useless-return
        if (config.cart.synchronize_totals && context.state.cartItems.length > 0) {
          context.dispatch('refreshTotals')
        }
        return
      })
    }
  },
  load (context) {
    console.log('Loading cart ...')
    const commit = context.commit
    const rootState = context.rootState
    const state = context.state

    if (!state.shipping.code) {
      state.shipping = rootState.shipping.methods.find((el) => { if (el.default === true) return el }) // TODO: use commit() instead of modifying the state in actions
    }
    if (!state.payment.code) {
      state.payment = rootState.payment.methods.find((el) => { if (el.default === true) return el })
    }
    global.db.cartsCollection.getItem('current-cart', (err, storedItems) => {
      if (err) throw new Error(err)

      if (config.cart.synchronize) {
        global.db.cartsCollection.getItem('current-cart-token', (err, token) => {
          if (err) throw new Error(err)
          // TODO: if token is null create cart server side and store the token!
          if (token) { // previously set token
            commit(types.CART_LOAD_CART_SERVER_TOKEN, token)
            console.log('Existing cart token = ' + token)
            context.dispatch('serverPull', { forceClientState: false })
          } else {
            console.log('Creating server cart ...')
            context.dispatch('serverCreate', { guestCart: false })
          }
        })
      }
      commit(types.CART_LOAD_CART, storedItems)
    })
  },

  getItem ({ commit, dispatch, state }, sku) {
    return state.cartItems.find(p => p.sku === sku)
  },

  addItem ({ commit, dispatch, state }, { productToAdd, forceServerSilence = false }) {
    let productsToAdd = []
    if (productToAdd.type_id === 'grouped') {
      productsToAdd = productToAdd.product_links.map((pl) => { return pl.product })
    } else {
      productsToAdd.push(productToAdd)
    }

    for (let product of productsToAdd) {
      if (product.priceInclTax <= 0) {
        EventBus.$emit('notification', {
          type: 'error',
          message: i18n.t('Product price is unknown, product cannot be added to the cart!'),
          action1: { label: 'OK', action: 'close' }
        })
        continue
      }
      const record = state.cartItems.find(p => p.sku === product.sku)
      dispatch('stock/check', { product: product, qty: record ? record.qty + 1 : (product.qty ? product.qty : 1) }, {root: true}).then(result => {
        product.onlineStockCheckid = result.onlineCheckTaskId // used to get the online check result
        if (result.status === 'volatile') {
          EventBus.$emit('notification', {
            type: 'warning',
            message: i18n.t('The system is not sure about the stock quantity (volatile). Product has been added to the cart for pre-reservation.'),
            action1: { label: 'OK', action: 'close' }
          })
        }
        if (result.status === 'out_of_stock') {
          EventBus.$emit('notification', {
            type: 'error',
            message: i18n.t('The product is out of stock and cannot be added to the cart!'),
            action1: { label: 'OK', action: 'close' }
          })
        }
        if (result.status === 'ok' || result.status === 'volatile') {
          commit(types.CART_ADD_ITEM, { product })
          if (config.cart.synchronize && !forceServerSilence) {
            /* dispatch('serverUpdateItem', {
              sku: product.sku,
              qty: 1
            }) */
            dispatch('serverPull', { forceClientState: true })
          }

          EventBus.$emit('notification', {
            type: 'success',
            message: i18n.t('Product has been added to the cart!'),
            action1: { label: 'OK', action: 'close' }
          })
        }
      })
    }
  },
  removeItem ({ commit, dispatch }, product) {
    commit(types.CART_DEL_ITEM, { product })
    if (config.cart.synchronize && product.server_item_id) {
      /* dispatch('serverDeleteItem', {
        sku: product.sku,
        item_id: product.server_item_id
      }) */
      dispatch('serverPull', { forceClientState: true })
    }
  },
  updateQuantity ({ commit, dispatch }, { product, qty, forceServerSilence = false }) {
    commit(types.CART_UPD_ITEM, { product, qty })
    if (config.cart.synchronize && product.server_item_id && !forceServerSilence) {
      /* dispatch('serverUpdateItem', {
        sku: product.sku,
        item_id: product.server_item_id,
        qty: qty
      }) */
      dispatch('serverPull', { forceClientState: true })
    }
  },
  updateItem ({ commit }, { product }) {
    commit(types.CART_UPD_ITEM_PROPS, { product })
  },
  getPaymentMethods (context) {
    if (config.cart.synchronize_totals && (typeof navigator !== 'undefined' ? navigator.onLine : true)) {
      context.dispatch('sync/execute', { url: config.cart.paymentmethods_endpoint,
        payload: {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors'
        }
      }, { root: true }).then(task => {
        context.commit(types.CART_UPD_PAYMENT, task.result)
      }).catch(e => {
        console.error(e)
      })
    }
  },
  getShippingMethods (context, address) {
    if (config.cart.synchronize_totals && (typeof navigator !== 'undefined' ? navigator.onLine : true)) {
      context.dispatch('sync/execute', { url: config.cart.shippingmethods_endpoint,
        payload: {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors',
          body: JSON.stringify({
            address: address
          })
        }
      }, { root: true }).then(task => {
        if (task.result.length > 0) {
          context.commit(types.CART_UPD_SHIPPING, task.result)
        }
      }).catch(e => {
        console.error(e)
      })
    }
  },
  refreshTotals (context, methodsData) {
    if (config.cart.synchronize_totals && (typeof navigator !== 'undefined' ? navigator.onLine : true)) {
      if (!methodsData) {
        let country = rootStore.state.checkout.shippingDetails.country ? rootStore.state.checkout.shippingDetails.country : config.tax.defaultCountry
        let shipping = context.getters.shippingMethods[0]
        let payment = context.getters.paymentMethods[0]
        methodsData = {
          country: country,
          method_code: shipping ? shipping.method_code : null,
          carrier_code: shipping ? shipping.carrier_code : null,
          payment_method: payment.code
        }
      }
      if (methodsData.country && methodsData.carrier_code) {
        context.dispatch('sync/execute', { url: config.cart.shippinginfo_endpoint,
          payload: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify({
              addressInformation: {
                shipping_address: {
                  country_id: methodsData.country
                },
                shipping_method_code: methodsData.method_code,
                shipping_carrier_code: methodsData.carrier_code
              }
            })
          }
        }, { root: true }).then(task => {
          context.dispatch('sync/execute', { url: config.cart.collecttotals_endpoint,
            payload: {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              mode: 'cors',
              body: JSON.stringify({
                methods: {
                  paymentMethod: {
                    method: methodsData.payment_method
                  },
                  shippingCarrierCode: methodsData.carrier_code,
                  shippingMethodCode: methodsData.method_code
                }
              })
            },
            callback_event: 'servercart-after-totals'
          }, { root: true }).then(task => {}).catch(e => {
            console.error(e)
          })
        }).catch(e => {
          console.error(e)
        })
      } else {
        context.dispatch('cart/serverTotals', {}, { root: true })
      }
    }
  },
  manipulateCouponCode (context, code) {
    let endpointUrl
    let body

    if (code) {
      endpointUrl = config.cart.apply_endpoint
      body = JSON.stringify({
        code: code
      })
    } else {
      endpointUrl = config.cart.delete_endpoint
      body = {}
    }

    context.dispatch('sync/execute', { url: endpointUrl,
      payload: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: body
      }
    }, { root: true }).catch(e => {
      console.error(e)
    })
  },
  getCouponCodes (context) {
    context.dispatch('sync/execute', { url: config.cart.get_endpoint,
      payload: {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors'
      },
      silent: true
    }, { root: true }).catch(e => {
      console.error(e)
    })
  }
}
