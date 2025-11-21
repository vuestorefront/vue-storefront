import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';
import { ValidationResult, ValidationVerdict } from '../types/validation';
import { GoogleValidationResponse } from '../types/google-validation-response';
import { mapValidationResponseToBaseAddress } from '../services/google-validation-address-mapping';

export function classifyValidationVerdict (
  rawResponse: GoogleValidationResponse,
  originalAddress: BaseAddressDetails
): ValidationResult {
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
      case 'CONFIRM_ADD_SUBPREMISES':
        verdict = 'CONFIRM_ADD_SUBPREMISES';
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

    if (rawResponse?.responseId) {
      result.responseId = rawResponse.responseId;
    }

    const mappedAddress = mapValidationResponseToBaseAddress(rawResponse);

    if (Object.keys(mappedAddress).length > 0) {
      const suggestedAddress: BaseAddressDetails = {
        ...originalAddress,
        ...mappedAddress
      };
      result.suggested = suggestedAddress;
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
