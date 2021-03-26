import rootStore from '@vue-storefront/core/store'
import { storeViews } from 'config'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

function getItemsFromStorage ({ key }) {
  if (
    key === 'shop/cart/current-cart' ||
    (
      storeViews.multistore &&
      !storeViews.commonCache &&
      key === `${currentStoreView().storeCode}-shop/cart/current-cart`
    )
  ) {
    const storedItems = JSON.parse(localStorage[key])
    rootStore.dispatch('cart/syncCartWhenLocalStorageChange', { items: storedItems })
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
