import { Customization } from '../types/customization.interface';
import { OptionValue } from '../types/option-value.interface';

export function requiredCustomizationsFilter (
  customization: Customization,
  availableOptionValues?: OptionValue[]
): boolean {
  if (!customization.optionData) {
    return true;
  }

  if (!availableOptionValues) {
    return true;
  }

  return !(customization.optionData?.isRequired && availableOptionValues.length === 1);
}
