import { computed, ref, Ref } from 'vue';

import { AddressExtensionAttributes, AddressValidationStatusId } from '@vue-storefront/core/modules/shared';

import { ValidationResult, ValidationVerdict } from '../types/validation';
import BaseAddressDetails from 'core/modules/checkout/types/BaseAddressDetails';

const EXISTING_RESULT_INTERACTIVE_VERDICTS: ValidationVerdict[] = ['CONFIRM', 'CONFIRM_ADD_SUBPREMISES'];

export function useExistingValidationResult (
  addressExtensionAttributes: Ref<AddressExtensionAttributes | undefined>,
  addressRef: Ref<BaseAddressDetails>,
  validationResultHandler: (result: ValidationResult, addressRef: Ref<BaseAddressDetails>) => Promise<boolean>
) {
  const isExistingValidationResultHandled = ref(false);

  const validationResult = computed<ValidationResult | undefined>(() => {
    const value = addressExtensionAttributes.value;

    if (!value || !value.validation_status_id) {
      return;
    }

    let validationVerdict: ValidationVerdict | undefined;
    const missingComponents: string[] | undefined = value.validation_missing_address_components
      ? JSON.parse(value.validation_missing_address_components)
      : undefined;
    const suggestedAddress: BaseAddressDetails | undefined = value.validation_suggested_address
      ? JSON.parse(value.validation_suggested_address)
      : undefined;

    switch (value.validation_status_id) {
      case AddressValidationStatusId.UNVERIFIED:
        return;
      case AddressValidationStatusId.VALID:
        validationVerdict = 'ACCEPT';
        break;
      case AddressValidationStatusId.SUSPECT: {
        const isMissingSubpremises = missingComponents?.includes('subpremise');

        if (!isMissingSubpremises && !suggestedAddress) {
          return;
        }

        validationVerdict = isMissingSubpremises ? 'CONFIRM_ADD_SUBPREMISES' : 'CONFIRM';
        break;
      }
      case AddressValidationStatusId.INVALID:
        validationVerdict = 'FIX';
    }

    if (!validationVerdict) {
      return;
    }

    return {
      verdict: validationVerdict,
      missingComponents,
      suggested: suggestedAddress
    };
  });

  async function handleExistingValidationResult (): Promise<boolean> {
    if (isExistingValidationResultHandled.value || !validationResult.value) {
      return false;
    }

    const isMissingStreetNumber = validationResult.value.verdict === 'FIX' && validationResult.value.missingComponents?.includes('street_number');

    if (!EXISTING_RESULT_INTERACTIVE_VERDICTS.includes(validationResult.value.verdict) && !isMissingStreetNumber) {
      return false;
    }

    isExistingValidationResultHandled.value = true;
    return validationResultHandler(validationResult.value, addressRef);
  }

  return {
    handleExistingValidationResult,
    validationResult
  }
}
