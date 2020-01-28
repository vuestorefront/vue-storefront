import updateCart from '../updateCart'
import { CartResponse, OrderResponse } from '../../types/Api'
import { Cart, AddressInput } from '../../types/GraphQL'
import {
  setShippingAddressAction,
  setShippingMethodAction,
  setBillingAddressAction,
  addPaymentAction
} from '../../helpers/cart/actions'
import createMyOrderFromCart from './../createMyOrderFromCart'
import { CartUpdateAction } from '../../types/GraphQL'

interface Order {
  shippingDetails: AddressInput
  billingDetails: AddressInput
  shippingMethod: string
  paymentMethod?: string
}

interface PlaceOrderResponse {
  cartResponse: CartResponse
  orderResponse: OrderResponse
}

const placeOrder = async (cart: Cart, order: Order): Promise<PlaceOrderResponse> => {
  const actions: CartUpdateAction[] = [
    setShippingAddressAction(order.shippingDetails),
    setShippingMethodAction(order.shippingMethod),
    setBillingAddressAction(order.billingDetails),
  ]

  if (order.paymentMethod) {
    actions.push(addPaymentAction(order.paymentMethod))
  }

  const cartResponse = await updateCart({
    id: cart.id,
    version: cart.version,
    actions
  })

  const { id, version } = cartResponse.data.cart
  const orderResponse = await createMyOrderFromCart({ id, version })

  return { cartResponse, orderResponse }
}

export default placeOrder
