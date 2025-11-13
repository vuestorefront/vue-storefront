import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';
import { AutocompleteSuggestion } from '../types/autocomplete';
import { ValidationResult } from '../types/validation';

export interface AddressValidationProvider {
  ensureProviderScriptsLoaded(): Promise<void>,
  getAutocompleteSuggestions(query: string, opts?: { country?: string }): Promise<AutocompleteSuggestion[]>,
  getPlaceDetails(placeId: string): Promise<BaseAddressDetails>,
  validate(address: BaseAddressDetails): Promise<ValidationResult>
}
