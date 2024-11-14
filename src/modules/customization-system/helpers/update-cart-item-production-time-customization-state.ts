import CartItem from 'core/modules/cart/types/CartItem';

import { OptionType } from '../types/option-type';
import { PRODUCTION_TIME_SELECTOR_STANDARD_OPTION_VALUE_ID } from '../types/production-time-selector-standard-option-value-id';

// TODO: temporary until separate option value for "Standard"
// production time will be added
export function updateCartItemProductionTimeCustomizationState (cartItem: CartItem): CartItem {
  if (!cartItem.customizations) {
    return cartItem;
  }

  const productionTimeCustomization = cartItem.customizations.find(
    (customization) => customization.optionData?.type === OptionType.PRODUCTION_TIME
  );

  if (!productionTimeCustomization || !cartItem.extension_attributes?.customization_state) {
    return cartItem;
  }

  const productionTimeCustomizationState = cartItem.extension_attributes.customization_state.find(
    (item) => item.customization_id === productionTimeCustomization.id
  );

  if (productionTimeCustomizationState && productionTimeCustomizationState.value) {
    return cartItem;
  }

  return {
    ...cartItem,
    extension_attributes: {
      ...cartItem.extension_attributes,
      customization_state: [
        ...cartItem.extension_attributes.customization_state,
        {
          customization_id: productionTimeCustomization.id,
          value: PRODUCTION_TIME_SELECTOR_STANDARD_OPTION_VALUE_ID
        }
      ]
    }
  }
}
