import { StateOption } from '../types/state-option.interface';

export function stateCodeAutocompleteOptionSearch (
  option: StateOption,
  formattedValue?: string
): boolean {
  if (!formattedValue) {
    return false
  }

  const formattedStateCode = option.code.toLowerCase().trim();

  return formattedValue === formattedStateCode;
}
