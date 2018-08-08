import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import EventBus from '../../lib/event-bus'
import rootStore from '../../'
import * as types from '../../mutation-types'
import i18n from '../../lib/i18n'
import isString from 'lodash-es/isString'
import toString from 'lodash-es/toString'
import config from '../../lib/config'

const MAX_BYPASS_COUNT = 10

EventBus.$on('servercart-after-created', (event) => { // example stock check callback
  const cartToken = event.result
  if (event.resultCode === 200) {
    console.log(`Server cart token after created = ${cartToken}`)
    rootStore.commit(types.SN_CART + '/' + types.CART_LOAD_CART_SERVER_TOKEN, cartToken)
    rootStore.dispatch('cart/serverPull', { forceClientState: false, dryRun: !config.cart.server_merge_by_default }, { root: true })
  } else {
    let resultString = event.result ? toString(event.result) : null
    if (resultString && (resultString.indexOf(i18n.t('not authorized')) < 0 && resultString.indexOf('not authorized')) < 0) { // not respond to unathorized errors here
      if (rootStore.state.cart.bypassCount < MAX_BYPASS_COUNT) {
        console.log('Bypassing with guest cart', rootStore.state.cart.bypassCount)
        rootStore.state.cart.bypassCount = rootStore.state.cart.bypassCount + 1
        rootStore.dispatch('cart/serverCreate', { guestCart: true }, { root: true })
        console.error(event.result)
      }
    }
  }
})

EventBus.$on('user-after-logout', () => {
  rootStore.dispatch('cart/clear', {}, { root: true })
  // rootStore.dispatch('cart/serverCreate', { guestCart: false }, { root: true })
})

EventBus.$on('user-after-loggedin', (event) => { // example stock check callback
  global.$VS.db.usersCollection.getItem('last-cart-bypass-ts', (err, lastCartBypassTs) => {
    if (err) {
      console.error(err)
    }
    if ((new Date() - lastCartBypassTs) >= (1000 * 60 * 24)) { // don't refresh the shopping cart id up to 24h after last order
      rootStore.dispatch('cart/serverCreate', { guestCart: false }, { root: true })
    }
  })
})

EventBus.$on('servercart-after-totals', (event) => { // example stock check callback
  if (event.resultCode === 200) {
    const totalsObj = event.result.totals ? event.result.totals : event.result
    console.log('Overriding server totals', totalsObj)
    let itemsAfterTotal = {}
    let platformTotalSegments = totalsObj.total_segments
    for (let item of totalsObj.items) {
      if (item.options && isString(item.options)) item.options = JSON.parse(item.options)
      itemsAfterTotal[item.item_id] = item
      rootStore.dispatch('cart/updateItem', { product: { server_item_id: item.item_id, totals: item, qty: item.qty } }, { root: true }) // update the server_id reference
    }
    rootStore.commit(types.SN_CART + '/' + types.CART_UPD_TOTALS, { itemsAfterTotal: itemsAfterTotal, totals: totalsObj, platformTotalSegments: platformTotalSegments })
  } else {
    console.error(event.result)
  }
})

function _updateClientItem (event, clientItem) {
  if (typeof event.result.item_id !== 'undefined') {
    console.log('Updating server id to ', clientItem.sku, event.result.item_id)
    rootStore.dispatch('cart/updateItem', { product: { server_item_id: event.result.item_id, sku: clientItem.sku, server_cart_id: event.result.quote_id, prev_qty: clientItem.qty } }, { root: true }) // update the server_id reference
    EventBus.$emit('cart-after-itemchanged', { item: clientItem })
  }
}

function _afterServerItemUpdated (event, clientItem = null) {
  console.debug('Cart item server sync', event)
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

EventBus.$on('servercart-after-pulled', (event) => { // example stock check callback
  if (event.resultCode === 200) {
    let diffLog = []
    let serverCartUpdateRequired = false
    let clientCartUpdateRequired = false
    let cartHasItems = false
    const serverItems = event.result
    const clientItems = rootStore.state.cart.cartItems
    for (const clientItem of clientItems) {
      cartHasItems = true
      const serverItem = serverItems.find((itm) => {
        return itm.sku === clientItem.sku || itm.sku.indexOf(clientItem.sku + '-') === 0 /* bundle products */
      })

      if (!serverItem) {
        console.log('No server item for ' + clientItem.sku)
        diffLog.push({ 'party': 'server', 'sku': clientItem.sku, 'status': 'no_item' })
        if (!event.dry_run) {
          rootStore.dispatch('cart/serverUpdateItem', {
            sku: clientItem.parentSku && config.cart.setConfigurableProductOptions ? clientItem.parentSku : clientItem.sku,
            qty: clientItem.qty,
            product_option: clientItem.product_option
          }, { root: true }).then((event) => {
            _afterServerItemUpdated(event, clientItem)
          })
          serverCartUpdateRequired = true
        }
      } else if (serverItem.qty !== clientItem.qty) {
        console.log('Wrong qty for ' + clientItem.sku, clientItem.qty, serverItem.qty)
        diffLog.push({ 'party': 'server', 'sku': clientItem.sku, 'status': 'wrong_qty', 'client_qty': clientItem.qty, 'server_qty': serverItem.qty })
        if (!event.dry_run) {
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
        }
      } else {
        console.log('Server and client items synced for ' + clientItem.sku) // here we need just update local item_id
        console.log('Updating server id to ', { sku: clientItem.sku, server_cart_id: serverItem.quote_id, server_item_id: serverItem.item_id, product_option: serverItem.product_option })
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
          console.log('No client item for ' + serverItem.sku)
          diffLog.push({ 'party': 'client', 'sku': serverItem.sku, 'status': 'no_item' })

          if (!event.dry_run) {
            if (event.force_client_state) {
              console.log('Removing item', serverItem.sku, serverItem.item_id)
              serverCartUpdateRequired = true
              rootStore.dispatch('cart/serverDeleteItem', {
                sku: serverItem.sku,
                item_id: serverItem.item_id,
                quoteId: serverItem.quote_id
              }, { root: true })
            } else {
              clientCartUpdateRequired = true
              cartHasItems = true
              rootStore.dispatch('product/single', { options: { sku: serverItem.sku }, setCurrentProduct: false, selectDefaultVariant: false }).then((product) => {
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
            }
          }
        }
      }
    }

    if (!event.dry_run) {
      if ((!serverCartUpdateRequired || clientCartUpdateRequired) && cartHasItems) {
        rootStore.dispatch('cart/refreshTotals')
      }
    }
    EventBus.$emit('servercart-after-diff', { diffLog: diffLog, serverItems: serverItems, clientItems: clientItems, dryRun: event.dry_run, event: event }) // send the difflog
    console.log('Server sync diff', diffLog)
  } else {
    console.error(event.result)
  }
})

EventBus.$on('servercart-after-itemupdated', (event) => {
  if (event.resultCode !== 200) {
  // TODO: add the strategy to configure behaviour if the product is (confirmed) out of the stock
    if (event.result.indexOf(i18n.t('avail')) >= 0 || event.result.indexOf(i18n.t('out of stock')) >= 0 || event.result.indexOf(i18n.t('required')) >= 0 || event.result.indexOf(i18n.t('choose options')) >= 0) { // product is not available
      const originalCartItem = JSON.parse(event.payload.body).cartItem
      console.log('Removing product from the cart', originalCartItem)
      rootStore.commit('cart/' + types.CART_DEL_ITEM, { product: originalCartItem }, {root: true})
    } else if (event.result.indexOf(i18n.t('requested')) >= 0) {
      const originalCartItem = JSON.parse(event.payload.body).cartItem
      rootStore.dispatch('cart/getItem', originalCartItem.sku, { root: true }).then((cartItem) => {
        if (cartItem) {
          console.log('Restoring qty after error', originalCartItem.sku, cartItem.prev_qty)
          if (cartItem.prev_qty > 0) {
            rootStore.dispatch('cart/updateItem', { product: { qty: cartItem.prev_qty } }, { root: true }) // update the server_id reference
            EventBus.$emit('cart-after-itemchanged', { item: cartItem })
          } else {
            rootStore.dispatch('cart/removeItem', { product: cartItem }, { root: true }) // update the server_id reference
          }
        }
      })
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
    cartServerMethodsRefreshAt: 0,
    cartServerBypassAt: 0,
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
