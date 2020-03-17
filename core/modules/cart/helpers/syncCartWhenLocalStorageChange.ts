import rootStore from '@vue-storefront/core/store';

function getItemsFromStorage ({ key }) {
  if (key === 'shop/cart/current-cart') {
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
