import CartItem from '../types/CartItem';

const requiredFields = [
  'server_item_id',
  'server_cart_id'
]

export function isClientItemHasRequiredServerItemFields (
  clientItem: CartItem
) {
  for (const field of requiredFields) {
    if (!clientItem.hasOwnProperty(field)) {
      return false;
    }
  }

  return true;
}
