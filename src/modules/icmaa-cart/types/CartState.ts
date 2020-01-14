import CartState from '@vue-storefront/core/modules/cart/types/CartState'

export default interface ExtendedCartState extends CartState {
  freeCartItems: string[]
}
