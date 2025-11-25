import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';
import { GoogleValidationResponse } from './google-validation-response';

export type ValidationVerdict = 'ACCEPT' | 'CONFIRM' | 'CONFIRM_ADD_SUBPREMISES' | 'FIX' | 'ERROR';

export type AddressSelectedType = 'entered' | 'suggested' | 'with-unit' | 'with-street-number';

export interface AddressSelectedEvent {
  type: AddressSelectedType,
  address: Partial<BaseAddressDetails>
}

export interface ValidationResult {
  verdict: ValidationVerdict,
  raw: GoogleValidationResponse,
  suggested?: BaseAddressDetails,
  message?: string,
  responseId?: string,
  missingComponents?: string[]
}
