import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';
import { ValidationResult, ValidationVerdict } from '../types/validation';
import { mapValidationResponseToBaseAddress } from '../services/google-validation-address-mapping';

export function classifyValidationVerdict (rawResponse: any, originalAddress: BaseAddressDetails): ValidationResult {
  const defaultResult: ValidationResult = {
    verdict: 'ERROR',
    raw: rawResponse,
    message: 'Unable to validate address'
  };

  try {
    const action = rawResponse?.result?.verdict?.possibleNextAction;

    if (!action) {
      return defaultResult;
    }

    let verdict: ValidationVerdict;
    switch (action) {
      case 'ACCEPT':
        verdict = 'ACCEPT';
        break;
      case 'CONFIRM':
        verdict = 'CONFIRM';
        break;
      case 'CONFIRM_ADD_SUBPREMISE':
        verdict = 'CONFIRM_ADD_SUBPREMISE';
        break;
      case 'FIX':
        verdict = 'FIX';
        break;
      default:
        verdict = 'FIX';
    }

    const result: ValidationResult = {
      verdict,
      raw: rawResponse
    };

    if (verdict !== 'ACCEPT') {
      const mappedAddress = mapValidationResponseToBaseAddress(rawResponse);

      if (Object.keys(mappedAddress).length > 0) {
        const suggestedAddress: BaseAddressDetails = {
          ...originalAddress,
          ...mappedAddress
        };
        result.suggested = suggestedAddress;
      }
    }

    if (verdict === 'CONFIRM_ADD_SUBPREMISE') {
      result.requiresSubpremise = true;
    }

    return result;
  } catch (error) {
    return {
      verdict: 'ERROR',
      raw: rawResponse,
      message: `Classification error: ${error.message || 'Unknown error'}`
    };
  }
}
