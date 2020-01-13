import { UiCartProduct } from '@vue-storefront/interfaces'
import updateCart from './../updateCart'
import { CartResponse } from './../../types/Api'
import { Cart } from './../../types/GraphQL'
import { createRemoveLineItemAction } from './../../helpers/cart/actions'

const removeFromCart = async (cart: Cart, product: UiCartProduct): Promise<CartResponse> => {
  return await updateCart({
    id: cart.id,
    version: cart.version,
    actions: [createRemoveLineItemAction(product)]
  })
}

export default removeFromCart
