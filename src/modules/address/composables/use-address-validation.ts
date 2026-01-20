import { ref, inject, Ref, SetupContext, nextTick } from '@vue/composition-api';

import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus';
import { Logger } from '@vue-storefront/core/lib/logger';
import { AddressExtensionAttributes, AddressValidationStatusId, generateAddressHash } from '@vue-storefront/core/modules/shared';

import { AddressValidationProvider } from '../services/address-validation-provider.interface';
import { ValidationResult, ValidationVerdict } from '../types/validation';
import { AddressSelectedEvent, ADDRESS_VALIDATION_EVENTS } from '../types/address-validation-events';
import { checkCountrySupported } from '../helpers/check-country-supported';
import { ADDRESS_VALIDATION_MODAL_NAME } from '../types/modal-names';

const DEFAULT_INTERACTIVE_VERDICTS: ValidationVerdict[] = ['CONFIRM', 'CONFIRM_ADD_SUBPREMISES', 'FIX'];
const SUSPECT_VERDICTS: ValidationResult['verdict'][] = ['CONFIRM', 'CONFIRM_ADD_SUBPREMISES'];

export interface UseAddressValidationOptions {
  interactiveVerdicts?: ValidationVerdict[]
}

type ReportAddress = Pick<BaseAddressDetails, 'country' | 'streetAddress' | 'city' | 'state' | 'region_id' | 'zipCode'>;

function prepareAddressForReport (address: BaseAddressDetails): ReportAddress {
  return {
    country: address.country,
    streetAddress: address.streetAddress,
    city: address.city,
    state: address.state,
    region_id: address.region_id,
    zipCode: address.zipCode
  }
}

async function getAddressHash (address: BaseAddressDetails): Promise<string> {
  return generateAddressHash({
    country: address.country,
    city: address.city,
    region: address.state,
    region_id: address.region_id,
    postcode: address.zipCode,
    street: [address.streetAddress, address.apartmentNumber]
  });
}

function getValidationWarningMessage (result: ValidationResult): string {
  if (result.verdict === 'FIX') {
    return result.missingComponents?.includes('street_number')
      ? 'Please provide the street number to complete validation.'
      : 'The address you entered could not be validated. Please review and correct it.';
  }

  if (result.verdict === 'CONFIRM') {
    return 'We found a suggested address that may be more accurate. Please select which address to use.';
  }

  if (result.verdict === 'CONFIRM_ADD_SUBPREMISES') {
    return 'We found your address but need the unit or apartment number to ensure accurate delivery.';
  }

  return '';
}

function getDefaultValidationExtensionAttributes (): AddressExtensionAttributes {
  return {
    validation_status_id: AddressValidationStatusId.UNVERIFIED,
    validation_warnings: '',
    validation_customer_override: false,
    validation_missing_address_components: undefined,
    validation_validated_at: new Date().toUTCString(),
    validation_suggested_address: undefined
  };
}

function getValidationExtensionAttributesByValidationResult (
  result: ValidationResult
): AddressExtensionAttributes {
  const validationWarnings = getValidationWarningMessage(result);
  const validationDate = new Date().toUTCString();

  if (result.verdict === 'ACCEPT') {
    return {
      validation_status_id: AddressValidationStatusId.VALID,
      validation_warnings: validationWarnings,
      validation_customer_override: false,
      validation_missing_address_components: undefined,
      validation_validated_at: validationDate,
      validation_suggested_address: undefined
    };
  }

  const validationSuggestedAddress = result.suggested ? JSON.stringify(prepareAddressForReport(result.suggested)) : undefined;

  if (result.verdict === 'FIX') {
    return {
      validation_status_id: AddressValidationStatusId.INVALID,
      validation_warnings: validationWarnings,
      validation_customer_override: false,
      validation_missing_address_components: JSON.stringify(result.missingComponents),
      validation_validated_at: validationDate,
      validation_suggested_address: validationSuggestedAddress
    };
  }

  if (SUSPECT_VERDICTS.includes(result.verdict)) {
    return {
      validation_status_id: AddressValidationStatusId.SUSPECT,
      validation_warnings: validationWarnings,
      validation_customer_override: false,
      validation_missing_address_components: JSON.stringify(result.missingComponents),
      validation_validated_at: validationDate,
      validation_suggested_address: validationSuggestedAddress
    };
  }

  return getDefaultValidationExtensionAttributes();
}

function getValidationExtensionAttributesByDecision (
  decision: AddressSelectedEvent,
  result: ValidationResult
): AddressExtensionAttributes {
  const validationExtensionAttributesByResult = getValidationExtensionAttributesByValidationResult(result);

  if (decision.type === 'entered') {
    return {
      validation_status_id: validationExtensionAttributesByResult.validation_status_id,
      validation_warnings: getValidationWarningMessage(result),
      validation_customer_override: true,
      validation_missing_address_components: validationExtensionAttributesByResult.validation_missing_address_components,
      validation_validated_at: validationExtensionAttributesByResult.validation_validated_at,
      validation_suggested_address: validationExtensionAttributesByResult.validation_suggested_address
    };
  }

  if (decision.type === 'suggested') {
    return {
      validation_status_id: AddressValidationStatusId.VALID,
      validation_warnings: '',
      validation_customer_override: false,
      validation_missing_address_components: undefined,
      validation_validated_at: validationExtensionAttributesByResult.validation_validated_at,
      validation_suggested_address: undefined
    };
  }

  return getDefaultValidationExtensionAttributes();
}

export function useAddressValidation (
  context: SetupContext,
  options: UseAddressValidationOptions = {}
) {
  const { root } = context;
  const provider = inject<AddressValidationProvider>('AddressValidationProviderService');
  const isValidating = ref(false);
  const interactiveVerdicts = options.interactiveVerdicts || DEFAULT_INTERACTIVE_VERDICTS;

  let currentAddressRef: Ref<BaseAddressDetails> | null = null;
  let responseId: string | undefined;

  function completeValidation (): void {
    responseId = undefined;
  }

  function setupModalEventListeners (
    resolveValidation: ((shouldProceed: boolean) => void),
    result: ValidationResult
  ): void {
    function cleanup () {
      EventBus.$off(ADDRESS_VALIDATION_EVENTS.ADDRESS_SELECTED, addressSelectedHandler);
      EventBus.$off(ADDRESS_VALIDATION_EVENTS.CHANGE_ADDRESS, changeAddressHandler);
      EventBus.$off(ADDRESS_VALIDATION_EVENTS.MODAL_HIDE, modalClosedHandler);
    }

    async function addressSelectedHandler (decision: AddressSelectedEvent) {
      cleanup();

      if (!currentAddressRef) {
        Logger.warn('Current address is not defined', 'address-validation')();
        return;
      }

      const extensionAttributes: AddressExtensionAttributes = {
        ...(currentAddressRef.value.extension_attributes || {}),
        ...getValidationExtensionAttributesByDecision(decision, result)
      };

      if (decision.type === 'modified' && decision.address) {
        const updatedAddress: BaseAddressDetails = {
          ...currentAddressRef.value,
          ...decision.address,
          extension_attributes: extensionAttributes
        };
        currentAddressRef.value = updatedAddress;

        await nextTick();
        const shouldProceed = await validateAddress(currentAddressRef);

        resolveValidation(shouldProceed);
        return;
      }

      switch (decision.type) {
        case 'entered':
          currentAddressRef.value = {
            ...currentAddressRef.value,
            extension_attributes: extensionAttributes
          };
          break;

        case 'suggested':
          if (decision.address) {
            currentAddressRef.value = {
              ...currentAddressRef.value,
              ...decision.address,
              extension_attributes: extensionAttributes
            };
          }
          break;

        default:
          Logger.warn('Unknown decision type: ' + decision.type, 'address-validation')();
      }

      resolveValidation(true);
    }

    function changeAddressHandler () {
      cleanup();

      resolveValidation(false);
    }

    function modalClosedHandler (modalName: string) {
      if (modalName === ADDRESS_VALIDATION_MODAL_NAME) {
        cleanup();

        resolveValidation(false);
      }
    }

    EventBus.$on(ADDRESS_VALIDATION_EVENTS.ADDRESS_SELECTED, addressSelectedHandler);
    EventBus.$on(ADDRESS_VALIDATION_EVENTS.CHANGE_ADDRESS, changeAddressHandler);
    EventBus.$on(ADDRESS_VALIDATION_EVENTS.MODAL_HIDE, modalClosedHandler);
  }

  async function handleInteractiveVerdict (
    result: ValidationResult
  ): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if (!currentAddressRef) {
        Logger.warn('No address reference available', 'address-validation')();
        resolve(true);
        return;
      }

      const payload = {
        verdict: result.verdict,
        enteredAddress: currentAddressRef.value,
        suggestedAddress: result.suggested,
        missingComponents: result.missingComponents || [],
        zIndex: 1002
      };

      root.$store.dispatch('ui/openModal', {
        name: ADDRESS_VALIDATION_MODAL_NAME,
        payload
      });

      setupModalEventListeners(resolve, result);
    });
  }

  async function validateAddress (addressRef: Ref<BaseAddressDetails>): Promise<boolean> {
    currentAddressRef = addressRef;

    if (!checkCountrySupported(currentAddressRef.value.country)) {
      const hash = await getAddressHash(currentAddressRef.value);

      currentAddressRef.value = {
        ...currentAddressRef.value,
        extension_attributes: {
          ...(currentAddressRef.value.extension_attributes || {}),
          ...getDefaultValidationExtensionAttributes(),
          validation_hash: hash
        }
      };

      return true;
    }

    if (!provider) {
      Logger.warn('Address validation provider not available, proceeding without validation', 'address-validation')();
      return true;
    }

    isValidating.value = true;

    try {
      const result: ValidationResult = await provider.validate(
        currentAddressRef.value,
        responseId
      );

      if (result.responseId && !responseId) {
        responseId = result.responseId;
      }

      const extensionAttributes: AddressExtensionAttributes = {
        ...(currentAddressRef.value.extension_attributes || {}),
        ...getValidationExtensionAttributesByValidationResult(result)
      };

      let shouldProceed = false;

      switch (result.verdict) {
        case 'ACCEPT':
          if (result.suggested) {
            currentAddressRef.value = {
              ...result.suggested,
              extension_attributes: extensionAttributes
            };
          }

          shouldProceed = true;
          break;
        case 'CONFIRM':
        case 'CONFIRM_ADD_SUBPREMISES':
        case 'FIX':
          currentAddressRef.value = {
            ...currentAddressRef.value,
            extension_attributes: extensionAttributes
          };

          if (interactiveVerdicts.includes(result.verdict)) {
            shouldProceed = await handleInteractiveVerdict(result);
          } else {
            shouldProceed = true;
          }
          break;
        case 'ERROR':
        default:
          currentAddressRef.value = {
            ...currentAddressRef.value,
            extension_attributes: extensionAttributes
          };

          Logger.error('Address validation error: ' + result.message, 'address-validation')();
          shouldProceed = true;
      }

      const hash = await getAddressHash(currentAddressRef.value);

      currentAddressRef.value = {
        ...currentAddressRef.value,
        extension_attributes: {
          ...(currentAddressRef.value.extension_attributes || {}),
          validation_hash: hash
        }
      };

      return shouldProceed;
    } catch (error) {
      const hash = await getAddressHash(currentAddressRef.value);

      currentAddressRef.value = {
        ...currentAddressRef.value,
        extension_attributes: {
          ...(currentAddressRef.value.extension_attributes || {}),
          ...getDefaultValidationExtensionAttributes(),
          validation_hash: hash
        }
      };

      Logger.error('Address validation failed: ' + error, 'address-validation')();
      return true;
    } finally {
      isValidating.value = false;
    }
  }

  return {
    validateAddress,
    isValidating,
    completeValidation
  };
}
