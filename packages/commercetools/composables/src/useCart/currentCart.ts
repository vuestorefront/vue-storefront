import { getCart, createCart, getStorage } from '@vue-storefront/commercetools-api'
import { enhanceCart } from './../helpers/internals'

const CART_ID_STORAGE_KEY = 'vsf-commercetools-cart-id'

const getCartStorage = () => {
  const storage = getStorage()

  const saveCartId = (cartId: string) => storage.setItem(CART_ID_STORAGE_KEY, cartId)
  const getCartId = () => storage.getItem(CART_ID_STORAGE_KEY)

  return { saveCartId, getCartId }
}

const loadCart = async (storage) => {
  const cartId = storage.getCartId()

  if (cartId) {
    const cartResponse = await getCart(cartId)

    if (cartResponse.data.cart) {
      return enhanceCart(cartResponse)
    }
  }

  /*
    TODO: cover the case the user is logged in,
    CartDraft will contain customerId then
  */

  const cartResponse = await createCart()

  return enhanceCart(cartResponse)
}


const loadCurrentCart = async () => {
  const storage = getCartStorage()
  const cartResponse = await loadCart(storage)

  storage.saveCartId(cartResponse.data.cart.id)

  return cartResponse.data.cart;
};

export default loadCurrentCart
