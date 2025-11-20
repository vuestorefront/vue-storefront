import { ref, inject, Ref, SetupContext } from '@vue/composition-api';

import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus';
import { Logger } from '@vue-storefront/core/lib/logger';
import { ModalList } from 'src/themes/petsies-capybara/store/ui/modals';

import { AddressValidationProvider } from '../services/address-validation-provider.interface';
import { ValidationResult, AddressSelectedEvent } from '../types/validation';

export function useAddressValidation (context: SetupContext) {
  const { root } = context;
  const provider = inject<AddressValidationProvider>('AddressValidationProviderService');
  const isValidating = ref(false);

  let resolveValidation: ((shouldProceed: boolean) => void) | null = null;
  let currentAddressRef: Ref<BaseAddressDetails> | null = null;
  let responseId: string | undefined;

  function completeValidation (): void {
    responseId = undefined;
  }

  function setupModalEventListeners (): void {
    function cleanup () {
      EventBus.$off('address-selected', addressSelectedHandler);
      EventBus.$off('change-address', changeAddressHandler);
      EventBus.$off('modal-hide', modalClosedHandler);
    }

    async function addressSelectedHandler (decision: AddressSelectedEvent) {
      cleanup();

      if (!resolveValidation || !currentAddressRef) {
        Logger.warn('No validation resolver available', 'address-validation')();
        return;
      }

      if (decision.type === 'with-unit' && decision.address) {
        const updatedAddress: BaseAddressDetails = {
          ...currentAddressRef.value,
          ...decision.address,
          useSuggested: true,
          addedSubpremise: true
        };
        currentAddressRef.value = updatedAddress;

        const shouldProceed = await validateAddress(currentAddressRef);
        resolveValidation(shouldProceed);
        resolveValidation = null;
        return;
      }

      switch (decision.type) {
        case 'entered':
          const enteredAddress: BaseAddressDetails = {
            ...currentAddressRef.value,
            useOriginal: true
          };
          currentAddressRef.value = enteredAddress;
          break;

        case 'suggested':
          if (decision.address) {
            const suggestedAddress: BaseAddressDetails = {
              ...currentAddressRef.value,
              ...decision.address,
              useSuggested: true
            };
            currentAddressRef.value = suggestedAddress;
          }
          break;

        default:
          Logger.warn('Unknown decision type: ' + decision.type, 'address-validation')();
      }

      resolveValidation(true);
      resolveValidation = null;
    }

    function changeAddressHandler () {
      cleanup();

      if (!resolveValidation) {
        Logger.warn('No validation resolver available', 'address-validation')();
        return;
      }

      resolveValidation(false);
      resolveValidation = null;
    }

    function modalClosedHandler (modalName: string) {
      if (modalName === ModalList.AddressValidation) {
        cleanup();

        if (!resolveValidation) {
          return;
        }

        resolveValidation(false);
        resolveValidation = null;
      }
    }

    EventBus.$on('address-selected', addressSelectedHandler);
    EventBus.$on('change-address', changeAddressHandler);
    EventBus.$on('modal-hide', modalClosedHandler);
  }

  async function handleInteractiveVerdict (
    result: ValidationResult
  ): Promise<boolean> {
    return new Promise((resolve) => {
      resolveValidation = resolve;

      if (!currentAddressRef) {
        Logger.warn('No address reference available', 'address-validation')();
        resolve(true);
        return;
      }

      const payload = {
        verdict: result.verdict,
        enteredAddress: currentAddressRef.value,
        suggestedAddress: result.suggested,
        validationResult: result
      };

      root.$store.dispatch('ui/openModal', {
        name: ModalList.AddressValidation,
        payload
      });

      setupModalEventListeners();
    });
  }

  async function validateAddress (addressRef: Ref<BaseAddressDetails>): Promise<boolean> {
    currentAddressRef = addressRef;

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
            currentAddressRef.value = result.suggested;
          }
          return true;

        case 'CONFIRM':
        case 'CONFIRM_ADD_SUBPREMISES':
        case 'FIX':
          return await handleInteractiveVerdict(result);

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
