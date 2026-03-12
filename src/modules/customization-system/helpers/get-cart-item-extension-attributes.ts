import CartItem from 'core/modules/cart/types/CartItem';

import { ExtensionAttributes } from '../types/extension-attributes.interface';
import { normalizeProductPurchaseFlow } from '../types/product-purchase-flow.type';

export function getCartItemExtensionAttributes (
  cartItem: CartItem
): ExtensionAttributes | undefined {
  const extensionAttributes = cartItem.extension_attributes;

  if (!extensionAttributes) {
    return;
  }

  return {
    flow: normalizeProductPurchaseFlow(extensionAttributes.flow),
    plushie_id: extensionAttributes.plushie_id,
    customization_state: extensionAttributes.customization_state
  }
}
