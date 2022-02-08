import CartItem from '@vue-storefront/core/modules/cart/types/CartItem';

export default function getCartItemKey (cartItem: CartItem): string {
  let key = cartItem.sku;

  if (cartItem.checksum) {
    key = key + '-' + cartItem.checksum;
  }

  if (cartItem.plushieId) {
    key = key + '-' + cartItem.plushieId;
  }

  return key;
}
