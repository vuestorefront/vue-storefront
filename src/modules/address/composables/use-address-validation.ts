import { ref, inject, Ref, SetupContext } from '@vue/composition-api';

import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus';

import { AddressValidationProvider } from '../services/address-validation-provider.interface';
import { ValidationResult, AddressSelectedEvent } from '../types/validation';
import { ModalList } from 'src/themes/petsies-capybara/store/ui/modals';

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
    let addressSelectedHandler: (decision: AddressSelectedEvent) => Promise<void>;
    let changeAddressHandler: () => void;
    let modalClosedHandler: (modalName: string) => void;

    const cleanup = () => {
      EventBus.$off('address-selected', addressSelectedHandler);
      EventBus.$off('change-address', changeAddressHandler);
      EventBus.$off('modal-hide', modalClosedHandler);
    };

    addressSelectedHandler = async (decision: AddressSelectedEvent) => {
      cleanup();

      if (!resolveValidation || !currentAddressRef) {
        console.warn('[useAddressValidation] No validation resolver available');
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
          console.warn('[useAddressValidation] Unknown decision type:', decision.type);
      }

      resolveValidation(true);
      resolveValidation = null;
    };

    changeAddressHandler = () => {
      cleanup();

      if (!resolveValidation) {
        console.warn('[useAddressValidation] No validation resolver available');
        return;
      }

      resolveValidation(false);
      resolveValidation = null;
    };

    modalClosedHandler = (modalName: string) => {
      if (modalName === ModalList.AddressValidation) {
        cleanup();

        if (!resolveValidation) {
          return;
        }

        resolveValidation(false);
        resolveValidation = null;
      }
    };

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
        console.warn('[useAddressValidation] No address reference available');
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

  const validateAddress = async function (addressRef: Ref<BaseAddressDetails>): Promise<boolean> {
    currentAddressRef = addressRef;

    if (!provider) {
      console.warn('[useAddressValidation] Address validation provider not available, proceeding without validation');
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
          console.error('[useAddressValidation] Address validation error:', result.message);
          return true;
      }
    } catch (error) {
      console.error('[useAddressValidation] Address validation failed:', error);
      return true;
    } finally {
      isValidating.value = false;
    }
  };

  return {
    validateAddress,
    isValidating,
    completeValidation
  };
}
