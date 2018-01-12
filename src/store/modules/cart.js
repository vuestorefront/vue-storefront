import * as types from '../mutation-types'
import _ from 'lodash'
import EventBus from 'src/event-bus'
import config from 'config'
import rootStore from '../'

EventBus.$on('serverCart-after-created', (event) => { // example stock check callback
  const cartToken = event.result
  console.log(`Server cart token = ${cartToken}`)
  rootStore.commit(types.SN_CART + '/' + types.CART_LOAD_CART_SERVER_TOKEN, cartToken)
})

const store = {
  namespaced: true,
  state: {
    cartIsLoaded: false,
    cartSavedAt: new Date(),
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
      record.qty = qty
      state.cartSavedAt = new Date()
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
    clear (context) {
      context.commit(types.CART_LOAD_CART, [])
      context.commit(types.CART_LOAD_CART_SERVER_TOKEN, '')
    },
    save (context) {
      context.commit(types.CART_SAVE)
    },
    serverPush (context) { // push current cart TO the server
      return
    },
    serverPull (context) { // pull current cart FROM the server
      return
    },
    serverCreate (context) {
      context.dispatch('sync/queue', { url: config.cart.create_endpoint, // sync the cart
        payload: {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors'
        },
        callback_event: 'serverCart-after-created'
      }, { root: true }).then(task => {
        return
      })
    },
    load (context) {
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
              console.log('Server cart token = ' + token)
            } else {
              context.dispatch('serverCreate')
            }
          })
        }
        commit(types.CART_LOAD_CART, storedItems)
      })
    },

    getItem ({ commit, dispatch, state }, sku) {
      return state.cartItems.find(p => p.sku === sku)
    },

    addItem ({ commit, dispatch, state }, productToAdd) {
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
            EventBus.$emit('notification', {
              type: 'success',
              message: 'Product has been added to the cart!',
              action1: { label: 'OK', action: 'close' }
            })
          }
        })
      }
    },
    removeItem ({ commit }, product) {
      commit(types.CART_DEL_ITEM, { product })
    },
    updateQuantity ({ commit }, { product, qty }) {
      commit(types.CART_UPD_ITEM, { product, qty })
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
