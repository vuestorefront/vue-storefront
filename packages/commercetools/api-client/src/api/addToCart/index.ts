import updateCart from './../updateCart'
import { CartResponse } from './../../types/Api'
import { Cart, ProductVariant } from './../../types/GraphQL'
import { createAddLineItemAction } from './../../helpers/cart/actions'

const addToCart = async (cart: Cart, product: ProductVariant, quantity: number): Promise<CartResponse> => {
  return await updateCart({
    id: cart.id,
    version: cart.version,
    actions: [createAddLineItemAction(product, quantity)]
  })
}

export default addToCart
