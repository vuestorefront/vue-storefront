import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';

export type ValidationVerdict = 'ACCEPT' | 'CONFIRM' | 'CONFIRM_ADD_SUBPREMISE' | 'FIX' | 'ERROR';

export interface ValidationResult {
  verdict: ValidationVerdict,
  raw: any,
  suggested?: BaseAddressDetails,
  requiresSubpremise?: boolean,
  message?: string
}
