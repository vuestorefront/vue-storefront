import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import EventBus from '../../lib/event-bus'
import rootStore from '../../'
import * as types from '../../mutation-types'
import i18n from '../../lib/i18n'

const MAX_BYPASS_COUNT = 10

EventBus.$on('servercart-after-created', (event) => { // example stock check callback
  const cartToken = event.result
  if (event.resultCode === 200) {
    console.log(`Server cart token after created = ${cartToken}`)
    rootStore.commit(types.SN_CART + '/' + types.CART_LOAD_CART_SERVER_TOKEN, cartToken)
    rootStore.dispatch('cart/serverPull', { forceClientState: false }, { root: true })
  } else {
    if (rootStore.state.cart.bypassCount < MAX_BYPASS_COUNT) {
      console.log('Bypassing with guest cart', rootStore.state.cart.bypassCount)
      rootStore.state.cart.bypassCount = rootStore.state.cart.bypassCount + 1
      rootStore.dispatch('cart/serverCreate', { guestCart: true }, { root: true })
      console.error(event.result)
    }
  }
})

EventBus.$on('user-before-logout', () => {
  rootStore.dispatch('cart/clear', {}, { root: true })
  rootStore.dispatch('cart/serverCreate', { guestCart: false }, { root: true })
})

EventBus.$on('user-after-loggedin', (event) => { // example stock check callback
  rootStore.dispatch('cart/serverCreate', { guestCart: false }, { root: true })
})

EventBus.$on('servercart-after-totals', (event) => { // example stock check callback
  if (event.resultCode === 200) {
    console.log('Overriding server totals', event.result)
    let itemsAfterTotal = {}
    let platformTotalSegments = event.result.total_segments
    for (let item of event.result.items) {
      itemsAfterTotal[item.item_id] = item
      rootStore.dispatch('cart/updateItem', { product: { server_item_id: item.item_id, totals: item, qty: item.qty } }, { root: true }) // update the server_id reference
    }
    rootStore.commit(types.SN_CART + '/' + types.CART_UPD_TOTALS, { itemsAfterTotal: itemsAfterTotal, totals: event.result, platformTotalSegments: platformTotalSegments })
  } else {
    console.error(event.result)
  }
})

EventBus.$on('servercart-after-pulled', (event) => { // example stock check callback
  if (event.resultCode === 200) {
    let serverCartUpdateRequired = false
    let clientCartUpdateRequired = false
    let cartHasItems = false
    const serverItems = event.result
    const clientItems = rootStore.state.cart.cartItems
    for (const clientItem of clientItems) {
      cartHasItems = true
      const serverItem = serverItems.find((itm) => {
        return itm.sku === clientItem.sku
      })

      if (!serverItem) {
        console.log('No server item for ' + clientItem.sku)
        rootStore.dispatch('cart/serverUpdateItem', {
          sku: clientItem.parentSku ? clientItem.parentSku : clientItem.sku,
          qty: clientItem.qty,
          product_option: clientItem.product_option
        }, { root: true })
        serverCartUpdateRequired = true
      } else if (serverItem.qty !== clientItem.qty) {
        console.log('Wrong qty for ' + clientItem.sku, clientItem.qty, serverItem.qty)
        rootStore.dispatch('cart/serverUpdateItem', {
          sku: clientItem.parentSku ? clientItem.parentSku : clientItem.sku,
          qty: clientItem.qty,
          item_id: serverItem.item_id,
          quoteId: serverItem.quote_id,
          product_option: clientItem.product_option
        }, { root: true })
        serverCartUpdateRequired = true
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
            serverCartUpdateRequired = true
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
                clientCartUpdateRequired = true
              // rootStore.dispatch('cart/updateItem', { product: product })
              })
            })
          }
        }
      }
    }

    if ((!serverCartUpdateRequired || clientCartUpdateRequired) && cartHasItems) {
      rootStore.dispatch('cart/refreshTotals')
    }
  } else {
    console.error(event.result)
  }
})

EventBus.$on('servercart-after-itemupdated', (event) => {
  if (event.resultCode === 200) {
    console.debug('Cart item server sync', event)
    rootStore.dispatch('cart/getItem', event.result.sku, { root: true }).then((cartItem) => {
      if (cartItem) {
        console.log('Updating server id to ', event.result.sku, event.result.item_id)
        rootStore.dispatch('cart/updateItem', { product: { server_item_id: event.result.item_id, sku: event.result.sku, server_cart_id: event.result.quote_id, prev_qty: cartItem.qty } }, { root: true }) // update the server_id reference
        EventBus.$emit('cart-after-itemchanged', { item: cartItem })
      }
    })
  } else {
    if (event.result.indexOf(i18n.t('avail'))) { // product is not available
      const originalCartItem = JSON.parse(event.payload.body).cartItem
      console.log('Removing product from the cart', originalCartItem)
      rootStore.commit('cart/' + types.CART_DEL_ITEM, { product: originalCartItem }, {root: true})
      /** rootStore.dispatch('cart/getItem', originalCartItem.sku, { root: true }).then((cartItem) => {
        if (cartItem) {
          console.log('Restoring qty after error', originalCartItem.sku, cartItem.prev_qty)
          if (cartItem.prev_qty > 0) {
            rootStore.dispatch('cart/updateItem', { product: { qty: cartItem.prev_qty } }, { root: true }) // update the server_id reference
            EventBus.$emit('cart-after-itemchanged', { item: cartItem })
          } else {
            rootStore.dispatch('cart/removeItem', { product: cartItem }, { root: true }) // update the server_id reference
          }
        }
      }) */
    }
  }
})

EventBus.$on('servercart-after-itemdeleted', (event) => {

})

export default {
  namespaced: true,
  state: {
    itemsAfterPlatformTotals: {},
    platformTotals: null,
    platformTotalSegments: null,
    cartIsLoaded: false,
    cartServerPullAt: 0,
    cartServerTotalsAt: 0,
    cartServerCreatedAt: 0,
    cartSavedAt: new Date(),
    bypassToAnon: false,
    cartServerToken: '', // server side ID to synchronize with Backend (for example Magento)
    shipping: [],
    payment: [],
    cartItemsHash: '',
    bypassCount: 0,
    cartItems: [] // TODO: check if it's properly namespaced
  },
  getters,
  actions,
  mutations
}
