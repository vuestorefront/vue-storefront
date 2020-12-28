import rootStore from '@vue-storefront/core/store';

function getItemsFromStorage ({ key }) {
  const value = JSON.parse(localStorage[key])
  if (key === 'shop/cart/current-cart') {
    rootStore.dispatch('cart/syncCartWhenLocalStorageChange', { items: value })
  } else if (key === 'shop/cart/current-totals') {
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
