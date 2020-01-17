import { getMe, createCart, getStorage } from '@vue-storefront/commercetools-api'
import { enhanceProfile, enhanceCart } from './../helpers/internals'

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
    const profileResponse = await getMe()

    if (profileResponse.data.me.activeCart) {
      const enhancedProfile = enhanceProfile(profileResponse)
      return enhancedProfile.data.me.activeCart
    }
  }

  /*
    TODO: cover the case the user is logged in,
    CartDraft will contain customerId then
  */

  const cartResponse = await createCart()

  const enhancedCart = enhanceCart(cartResponse)

  return enhancedCart.data.cart
}


const loadCurrentCart = async () => {
  const storage = getCartStorage()
  const cart = await loadCart(storage)

  storage.saveCartId(cart.id)

  return cart;
};

export default loadCurrentCart
