import googleMapsAttributionLogo from './assets/google-maps-logo.svg';

export { createGoogleAddressValidationProvider } from './services/google-address-validation-provider.service';
export type { AddressValidationProvider } from './services/address-validation-provider.interface';

export type { AutocompleteSuggestion } from './types/autocomplete';
export type { ValidationResult, ValidationVerdict } from './types/validation';

export { useAddressAutocomplete } from './composables/use-address-autocomplete';
export { useAddressValidation } from './composables/use-address-validation';
export type { UseAddressValidationOptions } from './composables/use-address-validation';

export { ADDRESS_VALIDATION_MODAL_NAME } from './types/modal-names';

export {
  googleMapsAttributionLogo
}
