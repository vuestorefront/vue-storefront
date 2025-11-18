import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';

export type ValidationVerdict = 'ACCEPT' | 'CONFIRM' | 'CONFIRM_ADD_SUBPREMISES' | 'FIX' | 'ERROR';

export interface ValidationResult {
  verdict: ValidationVerdict,
  raw: any,
  suggested?: BaseAddressDetails,
  requiresSubpremise?: boolean,
  message?: string,
  useOriginal?: boolean,
  useSuggested?: boolean,
  addedSubpremise?: boolean,
  responseId?: string
}
