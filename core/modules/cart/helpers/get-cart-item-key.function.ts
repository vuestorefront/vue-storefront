import CartItem from '../types/CartItem';

export default function getCartItemKey (cartItem: CartItem): string {
  let key = cartItem.sku;

  if (cartItem.extension_attributes?.plushie_id) {
    key = key + '-' + cartItem.extension_attributes?.plushie_id;
    return key;
  }

  if (cartItem.checksum) {
    key = key + '-' + cartItem.checksum;
  }

  return key;
}
