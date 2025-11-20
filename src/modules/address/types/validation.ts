import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';
import { GoogleValidationResponse } from './google-validation-response';

export type ValidationVerdict = 'ACCEPT' | 'CONFIRM' | 'CONFIRM_ADD_SUBPREMISES' | 'FIX' | 'ERROR';

export type AddressSelectedType = 'entered' | 'suggested' | 'with-unit';

export interface AddressSelectedEvent {
  type: AddressSelectedType,
  address: Partial<BaseAddressDetails>
}

export interface ValidationResult {
  verdict: ValidationVerdict,
  raw: GoogleValidationResponse,
  suggested?: BaseAddressDetails,
  requiresSubpremise?: boolean,
  message?: string,
  useOriginal?: boolean,
  useSuggested?: boolean,
  addedSubpremise?: boolean,
  responseId?: string
}
