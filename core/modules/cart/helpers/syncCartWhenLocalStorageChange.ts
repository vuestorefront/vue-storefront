import rootStore from '@vue-storefront/core/store'
import { storeViews } from 'config'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

function checkMultistoreKey (key: string, path: string): boolean {
  const { multistore, commonCache } = storeViews
  if (!multistore || (multistore && commonCache)) return key === path
  return key === `${currentStoreView().storeCode}-${path}`
}

function getItemsFromStorage ({ key }) {
  if (checkMultistoreKey(key, 'shop/cart/current-cart')) {
    const value = JSON.parse(localStorage[key])
    rootStore.dispatch('cart/updateCart', { items: value })
  } else if (checkMultistoreKey(key, 'shop/cart/current-totals')) {
    const value = JSON.parse(localStorage[key])
    rootStore.dispatch('cart/updateTotals', value)
  }
}

function addEventListener () {
  window.addEventListener('storage', getItemsFromStorage)
}

function removeEventListener () {
  window.removeEventListener('storage', getItemsFromStorage)
}

export {
  addEventListener,
  removeEventListener
}
