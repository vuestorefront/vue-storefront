import { ref, inject, Ref, SetupContext } from '@vue/composition-api';

import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';

import { AddressValidationProvider } from '../services/address-validation-provider.interface';
import { ValidationResult } from '../types/validation';
import { ModalList } from 'src/themes/petsies-capybara/store/ui/modals';

export function useAddressValidation (context: SetupContext) {
  const { root } = context;
  const provider = inject<AddressValidationProvider>('AddressValidationProviderService');
  const isValidating = ref(false);

  let resolveValidation: ((shouldProceed: boolean) => void) | null = null;
  let currentAddressRef: Ref<BaseAddressDetails> | null = null;

  function setupModalEventListeners (
    result: ValidationResult
  ): void {
    let addressSelectedHandler: any;
    let changeAddressHandler: any;

    const cleanup = () => {
      root.$bus.$off('address-selected', addressSelectedHandler);
      root.$bus.$off('change-address', changeAddressHandler);
    };

    addressSelectedHandler = (decision: any) => {
      cleanup();

      if (!resolveValidation || !currentAddressRef) {
        console.warn('[useAddressValidation] No validation resolver available');
        return;
      }

      switch (decision.type) {
        case 'entered':
          currentAddressRef.value = {
            ...currentAddressRef.value,
            useOriginal: true
          };
          break;

        case 'suggested':
          if (decision.address) {
            currentAddressRef.value = {
              ...decision.address,
              useSuggested: true
            };
          }
          break;

        case 'with-unit':
          if (decision.address) {
            currentAddressRef.value = {
              ...decision.address,
              useSuggested: true,
              addedSubpremise: true
            };
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

    root.$bus.$on('address-selected', addressSelectedHandler);
    root.$bus.$on('change-address', changeAddressHandler);
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

      setupModalEventListeners(result);
    });
  }

  async function validateAddress (addressRef: Ref<BaseAddressDetails>): Promise<boolean> {
    currentAddressRef = addressRef;

    if (!provider) {
      console.warn('[useAddressValidation] Address validation provider not available, proceeding without validation');
      return true;
    }

    isValidating.value = true;

    try {
      const result: ValidationResult = await provider.validate(currentAddressRef.value);

      switch (result.verdict) {
        case 'ACCEPT':
          return true;

        case 'CONFIRM':
        case 'CONFIRM_ADD_SUBPREMISE':
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
  }

  return {
    validateAddress,
    isValidating
  };
}
