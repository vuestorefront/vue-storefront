import { ref, inject, Ref, SetupContext } from '@vue/composition-api';

import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus';
import { Logger } from '@vue-storefront/core/lib/logger';

import { AddressValidationProvider } from '../services/address-validation-provider.interface';
import { ValidationResult, ValidationVerdict } from '../types/validation';
import { AddressSelectedEvent, ADDRESS_VALIDATION_EVENTS } from '../types/address-validation-events';
import { checkCountrySupported } from '../helpers/check-country-supported';
import { ADDRESS_VALIDATION_MODAL_NAME } from '../types/modal-names';

const DEFAULT_INTERACTIVE_VERDICTS: ValidationVerdict[] = ['CONFIRM', 'CONFIRM_ADD_SUBPREMISES', 'FIX'];

export interface UseAddressValidationOptions {
  interactiveVerdicts?: ValidationVerdict[]
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

  function setupModalEventListeners (resolveValidation: ((shouldProceed: boolean) => void)): void {
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

      if (decision.type === 'with-unit' && decision.address) {
        const updatedAddress: BaseAddressDetails = {
          ...currentAddressRef.value,
          ...decision.address
          // TODO: uncomment after API support this field
          // is_suggested: true
        };
        currentAddressRef.value = updatedAddress;

        const shouldProceed = await validateAddress(currentAddressRef);

        resolveValidation(shouldProceed);
        return;
      }

      if (decision.type === 'with-street-number' && decision.address) {
        const updatedAddress: BaseAddressDetails = {
          ...currentAddressRef.value,
          ...decision.address
          // TODO: uncomment after API support this field
          // is_suggested: true
        };
        currentAddressRef.value = updatedAddress;
        const shouldProceed = await validateAddress(currentAddressRef);

        resolveValidation(shouldProceed);
        return;
      }

      switch (decision.type) {
        case 'entered':
          currentAddressRef.value = {
            ...currentAddressRef.value
            // TODO: uncomment after API support this field
            // is_suggested: false
          };
          break;

        case 'suggested':
          if (decision.address) {
            currentAddressRef.value = {
              ...currentAddressRef.value,
              ...decision.address
              // TODO: uncomment after API support this field
              // is_suggested: true
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

      setupModalEventListeners(resolve);
    });
  }

  async function validateAddress (addressRef: Ref<BaseAddressDetails>): Promise<boolean> {
    currentAddressRef = addressRef;

    if (!checkCountrySupported(currentAddressRef.value.country)) {
      currentAddressRef.value = {
        ...currentAddressRef.value
        // TODO: uncomment after API support this field
        // is_suggested: false
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

      switch (result.verdict) {
        case 'ACCEPT':
          if (result.suggested) {
            currentAddressRef.value = {
              ...result.suggested
              // TODO: uncomment after API support this field
              // is_suggested: true
            };
          }

          return true;

        case 'CONFIRM':
        case 'CONFIRM_ADD_SUBPREMISES':
        case 'FIX':
          if (interactiveVerdicts.includes(result.verdict)) {
            return await handleInteractiveVerdict(result);
          }

          // TODO: uncomment after API support this field
          // currentAddressRef.value.is_suggested = false;

          return true;

        case 'ERROR':
        default:
          Logger.error('Address validation error: ' + result.message, 'address-validation')();
          return true;
      }
    } catch (error) {
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
