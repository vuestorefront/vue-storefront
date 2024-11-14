import CartItem from 'core/modules/cart/types/CartItem';

import { ExtensionAttributes } from '../types/extension-attributes.interface';

export function getCartItemExtensionAttributes (
  cartItem: CartItem
): ExtensionAttributes | undefined {
  const extensionAttributes = cartItem.extension_attributes;

  if (!extensionAttributes) {
    return;
  }

  return {
    plushie_id: extensionAttributes.plushie_id,
    customization_state: extensionAttributes.customization_state
  }
}
