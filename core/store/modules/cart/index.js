import config from 'config'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import EventBus from 'core/plugins/event-bus'
import rootStore from '../../'
import * as types from '../../mutation-types'

EventBus.$on('servercart-after-created', (event) => { // example stock check callback
  const cartToken = event.result
  if (event.resultCode === 200) {
    console.log(`Server cart token after created = ${cartToken}`)
    rootStore.commit(types.SN_CART + '/' + types.CART_LOAD_CART_SERVER_TOKEN, cartToken)
    rootStore.dispatch('cart/serverPull', { forceClientState: false }, { root: true })
    rootStore.dispatch('cart/getPaymentMethods')
    let country = rootStore.state.checkout.shippingDetails ? rootStore.state.checkout.shippingDetails.country : config.tax.defaultCountry
    rootStore.dispatch('cart/getShippingMethods', {
      country_id: country
    })
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

EventBus.$on('servercart-after-totals', (event) => { // example stock check callback
  if (event.resultCode === 200) {
    console.log('Overriding server totals', event.result)
    let itemsAfterTotal = {}
    let platformTotalSegments = event.result.total_segments
    for (let item of event.result.items) {
      itemsAfterTotal[item.item_id] = item
      rootStore.dispatch('cart/updateItem', { product: { server_item_id: item.item_id, totals: item } }, { root: true }) // update the server_id reference
    }
    rootStore.commit(types.SN_CART + '/' + types.CART_UPD_TOTALS, { itemsAfterTotal: itemsAfterTotal, totals: event.result, platformTotalSegments: platformTotalSegments })
  } else {
    console.error(event.result)
  }
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
          item_id: serverItem.item_id,
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
              // rootStore.dispatch('cart/updateItem', { product: product })
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
  if (event.resultCode === 200) {
    console.debug('Cart item server sync', event)
    rootStore.dispatch('cart/getItem', event.result.sku, { root: true }).then((cartItem) => {
      if (cartItem) {
        console.log('Updating server id to ', event.result.sku, event.result.item_id)
        rootStore.dispatch('cart/updateItem', { product: { server_item_id: event.result.item_id, sku: event.result.sku, server_cart_id: event.result.quote_id } }, { root: true }) // update the server_id reference
        EventBus.$emit('cart-after-itemchanged', { item: cartItem })
      }
    })
  } else {
    // for example the result can be = We don't have enough <SKU>
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
    cartItems: [] // TODO: check if it's properly namespaced
  },
  getters,
  actions,
  mutations
}
