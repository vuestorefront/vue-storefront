import * as types from '../mutation-types'
import _ from 'lodash'
import EventBus from 'src/event-bus'
import config from 'config'
import rootStore from '../'
const CART_PULL_INTERVAL_MS = 5000
const CART_CREATE_INTERVAL_MS = 1000

EventBus.$on('servercart-after-created', (event) => { // example stock check callback
  const cartToken = event.result
  if (event.resultCode === 200) {
    console.log(`Server cart token after created = ${cartToken}`)
    rootStore.commit(types.SN_CART + '/' + types.CART_LOAD_CART_SERVER_TOKEN, cartToken)
    rootStore.dispatch('cart/serverPull', { forceClientState: false }, { root: true })
  } else {
    rootStore.dispatch('cart/serverCreate', { guestCart: true }, { root: true })
    console.error(event.result)
    console.log('Bypassing with guest cart')
  }
})
EventBus.$on('user-before-logout', () => {
  rootStore.dispatch('cart/clear', {}, { root: true })
  rootStore.dispatch('cart/serverCreate', { guestCart: false }, { root: true })
})

EventBus.$on('user-after-loggedin', (event) => { // example stock check callback
  rootStore.dispatch('cart/serverCreate', { guestCart: false }, { root: true })
})

EventBus.$on('servercart-after-pulled', (event) => { // example stock check callback
  if (event.resultCode === 200) {
    const serverItems = event.result
    const clientItems = rootStore.state.cart.cartItems
    for (const clientItem of clientItems) {
      const serverItem = serverItems.find((itm) => {
        return itm.sku === clientItem.sku
      })

      if (!serverItem) {
        console.log('No server item for ' + clientItem.sku)
        rootStore.dispatch('cart/serverUpdateItem', {
          sku: clientItem.sku,
          qty: clientItem.qty
        }, { root: true })
      } else if (serverItem.qty !== clientItem.qty) {
        console.log('Wrog qty for ' + clientItem.sku, clientItem.qty, serverItem.qty)
        rootStore.dispatch('cart/serverUpdateItem', {
          sku: clientItem.sku,
          qty: clientItem.qty,
          item_id: serverItem.server_item_id,
          quoteId: serverItem.quote_id
        }, { root: true })
      } else {
        console.log('Server and client items synced for ' + clientItem.sku) // here we need just update local item_id
        console.log('Updating server id to ', { sku: clientItem.sku, server_cart_id: serverItem.quote_id, server_item_id: serverItem.item_id })
        rootStore.dispatch('cart/updateItem', { product: { sku: clientItem.sku, server_cart_id: serverItem.quote_id, server_item_id: serverItem.item_id } }, { root: true })
      }
    }

    for (const serverItem of serverItems) {
      if (serverItem) {
        const clientItem = clientItems.find((itm) => {
          return itm.sku === serverItem.sku
        })
        if (!clientItem) {
          console.log('No client item for ' + serverItem.sku)

          if (event.force_client_state) {
            console.log('Removing item', serverItem.sku, serverItem.item_id)
            rootStore.dispatch('cart/serverDeleteItem', {
              sku: serverItem.sku,
              item_id: serverItem.item_id,
              quoteId: serverItem.quote_id
            }, { root: true })
          } else {
            rootStore.dispatch('product/single', { options: { sku: serverItem.sku }, setCurrentProduct: false, selectDefaultVariant: false }).then((product) => {
              product.server_item_id = serverItem.item_id
              product.qty = serverItem.qty
              product.server_cart_id = serverItem.quote_id
              rootStore.dispatch('cart/addItem', { productToAdd: product, forceServerSilence: true }).then(() => {
  //              rootStore.dispatch('cart/updateItem', { product: product })
              })
            })
          }
        }
      }
    }
  } else {
    console.error(event.result)
  }
})

EventBus.$on('servercart-after-itemupdated', (event) => {
  console.debug('Cart item server sync', event)
  rootStore.dispatch('cart/getItem', event.result.sku, { root: true }).then((cartItem) => {
    if (cartItem) {
      console.log('Updating server id to ', event.result.sku, event.result.item_id)
      rootStore.dispatch('cart/updateItem', { product: { server_item_id: event.result.item_id, sku: event.result.sku, server_cart_id: event.result.quote_id } }, { root: true }) // update the server_id reference
      EventBus.$emit('cart-after-itemchanged', { item: cartItem })
    }
  })
})

EventBus.$on('servercart-after-itemdeleted', (event) => {

})

const store = {
  namespaced: true,
  state: {
    cartIsLoaded: false,
    cartServerPullAt: 0,
    cartServerCreatedAt: 0,
    cartSavedAt: new Date(),
    bypassToAnon: false,
    cartServerToken: '', // server side ID to synchronize with Backend (for example Magento)
    shipping: { cost: 0, code: '' },
    payment: { cost: 0, code: '' },
    cartItems: [] // TODO: check if it's properly namespaced
  },
  mutations: {
    /**
     * Add product to cart
     * @param {Object} product data format for products is described in /doc/ElasticSearch data formats.md
     */
    [types.CART_ADD_ITEM] (state, { product }) {
      const record = state.cartItems.find(p => p.sku === product.sku)
      if (!record) {
        state.cartItems.push({
          ...product,
          qty: product.qty ? product.qty : 1
        })
      } else {
        record.qty += (product.qty ? product.qty : 1)
      }
    },
    [types.CART_SAVE] (state) {
      state.cartSavedAt = new Date()
    },
    [types.CART_DEL_ITEM] (state, { product }) {
      state.cartItems = state.cartItems.filter(p => p.sku !== product.sku)
      state.cartSavedAt = new Date()
    },
    [types.CART_UPD_ITEM] (state, { product, qty }) {
      const record = state.cartItems.find(p => p.sku === product.sku)

      if (record) {
        record.qty = qty
        state.cartSavedAt = new Date()
      }
    },
    [types.CART_UPD_ITEM_PROPS] (state, { product }) {
      let record = state.cartItems.find(p => p.sku === product.sku)
      if (record) {
        record = Object.assign(record, product)
      }
      state.cartSavedAt = new Date()
    },
    [types.CART_UPD_SHIPPING] (state, { shippingMethod, shippingCost }) {
      state.shipping.cost = shippingCost
      state.shipping.code = shippingMethod
      state.cartSavedAt = new Date()
    },
    [types.CART_LOAD_CART] (state, storedItems) {
      state.cartItems = storedItems || []
      state.cartIsLoaded = true
      state.cartSavedAt = new Date()

      EventBus.$emit('order/PROCESS_QUEUE', { config: config }) // process checkout queue
      EventBus.$emit('sync/PROCESS_QUEUE', { config: config }) // process checkout queue
      EventBus.$emit('application-after-loaded')
    },
    [types.CART_LOAD_CART_SERVER_TOKEN] (state, token) {
      state.cartServerToken = token
    }
  },
  getters: {
    totals (state) {
      return {
        subtotal: _.sumBy(state.cartItems, (p) => {
          return p.qty * p.price
        }),
        subtotalInclTax: _.sumBy(state.cartItems, (p) => {
          return p.qty * p.priceInclTax
        }),
        subtotalTax: _.sumBy(state.cartItems, (p) => {
          return p.qty * p.tax
        }),
        quantity: _.sumBy(state.cartItems, (p) => {
          return p.qty
        })
      }
    }
  },
  actions: {
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
    serverPush (context) { // push current cart TO the server
      return
    },
    serverPull (context, { forceClientState = false }) { // pull current cart FROM the server
      if (config.cart.synchronize) {
        if ((new Date() - context.state.cartServerPullAt) >= CART_PULL_INTERVAL_MS) {
          context.state.cartServerPullAt = new Date()
          context.dispatch('sync/execute', { url: config.cart.pull_endpoint, // sync the cart
            payload: {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
              mode: 'cors'
            },
            force_client_state: forceClientState,
            callback_event: 'servercart-after-pulled'
          }, { root: true }).then(task => {
            return
          })
        } else {
          console.log('Too short interval for refreshing the cart')
        }
      }
    },
    serverCreate (context, { guestCart = false }) {
      if ((new Date() - context.state.cartServerCreatedAt) >= CART_CREATE_INTERVAL_MS) {
        const task = { url: guestCart ? config.cart.create_endpoint.replace('{{token}}', '') : config.cart.create_endpoint, // sync the cart
          payload: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
          },
          callback_event: 'servercart-after-created'
        }
        context.dispatch('sync/execute', task, { root: true }).then(task => {})
        return task
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
          callback_event: 'servercart-after-itemdeleted'
        }, { root: true }).then(task => {
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
        const record = state.cartItems.find(p => p.sku === product.sku)
        dispatch('stock/check', { product: product, qty: record ? record.qty + 1 : (product.qty ? product.qty : 1) }, {root: true}).then(result => {
          product.onlineStockCheckid = result.onlineCheckTaskId // used to get the online check result
          if (result.status === 'volatile') {
            EventBus.$emit('notification', {
              type: 'warning',
              message: 'The system is not sure about the stock quantity (volatile). Product has been added to the cart for pre-reservation.',
              action1: { label: 'OK', action: 'close' }
            })
          }
          if (result.status === 'out_of_stock') {
            EventBus.$emit('notification', {
              type: 'error',
              message: 'The product is out of stock and cannot be added to the cart!',
              action1: { label: 'OK', action: 'close' }
            })
          }
          if (result.status === 'ok' || result.status === 'volatile') {
            commit(types.CART_ADD_ITEM, { product })
            if (config.cart.synchronize && !forceServerSilence) {
              dispatch('serverUpdateItem', {
                sku: product.sku,
                qty: 1
              })
            }

            EventBus.$emit('notification', {
              type: 'success',
              message: 'Product has been added to the cart!',
              action1: { label: 'OK', action: 'close' }
            })
          }
        })
      }
    },
    removeItem ({ commit, dispatch }, product) {
      commit(types.CART_DEL_ITEM, { product })
      if (config.cart.synchronize && product.server_item_id) {
        dispatch('serverDeleteItem', {
          sku: product.sku,
          item_id: product.server_item_id
        })
      }
    },
    updateQuantity ({ commit, dispatch }, { product, qty, forceServerSilence = false }) {
      commit(types.CART_UPD_ITEM, { product, qty })
      if (config.cart.synchronize && product.server_item_id && !forceServerSilence) {
        dispatch('serverUpdateItem', {
          sku: product.sku,
          item_id: product.server_item_id,
          qty: qty
        })
      }
    },
    updateItem ({ commit }, { product }) {
      commit(types.CART_UPD_ITEM_PROPS, { product })
    },
    changeShippingMethod ({ commit }, { shippingMethod, shippingCost }) {
      commit(types.CART_UPD_SHIPPING, { shippingMethod, shippingCost })
    }
  }
}
export default store
