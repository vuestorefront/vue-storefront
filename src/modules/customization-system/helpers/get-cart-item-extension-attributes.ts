import CartItem from 'core/modules/cart/types/CartItem';

import { normalizeCustomizationAvailabilityFlow } from '../types/customization-availability-flow.type';
import { ExtensionAttributes } from '../types/extension-attributes.interface';

export function getCartItemExtensionAttributes (
  cartItem: CartItem
): ExtensionAttributes | undefined {
  const extensionAttributes = cartItem.extension_attributes;

  if (!extensionAttributes) {
    return;
  }

  return {
    // TODO: uncomment when API will support this field
    flow: normalizeCustomizationAvailabilityFlow(extensionAttributes.flow),
    plushie_id: extensionAttributes.plushie_id,
    customization_state: extensionAttributes.customization_state
  }
}
