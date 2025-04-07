import CartItem from 'core/modules/cart/types/CartItem';
import { getSelectedOptionValuesByCustomizationState } from 'src/modules/customization-system';

export function getComposedSku (cartItem: CartItem) {
  const customizationsWithBundleOptionId = (cartItem.customizations || [])
    .filter((customization) => {
      return !!customization.bundleOptionId;
    });

  let sku = cartItem.sku;

  const selectedOptionValues = getSelectedOptionValuesByCustomizationState(
    cartItem.extension_attributes?.customization_state,
    customizationsWithBundleOptionId
  );
  const optionValuesSkus: string[] = [];

  for (const optionValue of selectedOptionValues) {
    if (!optionValue.sku) {
      continue;
    }

    optionValuesSkus.push(optionValue.sku);
  }

  optionValuesSkus.sort();

  for (const value of optionValuesSkus) {
    sku += `-${value}`;
  }

  return sku;
}
