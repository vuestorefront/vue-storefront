import { ref, onBeforeMount, inject, Ref } from '@vue/composition-api';
import debounce from 'lodash.debounce';

import { BaseAddressFormValue } from 'theme/components/interfaces/base-address-form-value.interface';

import { AddressValidationProvider } from '../services/address-validation-provider.interface';
import { AutocompleteSuggestion } from '../types/autocomplete';

export function useAddressAutocomplete (addressRef: Ref<BaseAddressFormValue>) {
  const provider = inject<AddressValidationProvider>('AddressValidationProviderService');

  const suggestions: Ref<AutocompleteSuggestion[]> = ref([]);
  const loading: Ref<boolean> = ref(false);
  let lastQuery = '';

  async function runSuggestionQuery (query: string): Promise<void> {
    const normalizedQuery = query?.trim() || '';

    if (normalizedQuery === lastQuery || normalizedQuery.length < 3) {
      suggestions.value = [];
      loading.value = false;
      return;
    }

    lastQuery = normalizedQuery;
    loading.value = true;

    try {
      if (provider) {
        // const results = await provider.getAutocompleteSuggestions(
        //   normalizedQuery,
        //   { country: addressRef.value.country }
        // );
        // MOCK
        const results: AutocompleteSuggestion[] = [{ description: 'test 1234, test', id: '123' }, { description: '144 Testement St', id: '124' }];

        suggestions.value = results;
      }
    } catch (error) {
      console.error('Error fetching address suggestions:', error);
      suggestions.value = [];
    } finally {
      loading.value = false;
    }
  }

  const debouncedFetch = debounce(runSuggestionQuery, 300);

  async function selectSuggestion (placeId: string): Promise<void> {
    loading.value = true;

    try {
      if (provider) {
        const details = await provider.getPlaceDetails(placeId);

        Object.assign(addressRef.value, {
          streetAddress: details.streetAddress || addressRef.value.streetAddress,
          city: details.city || addressRef.value.city,
          state: details.state || addressRef.value.state,
          zipCode: details.zipCode || addressRef.value.zipCode,
          country: details.country || addressRef.value.country
        });

        suggestions.value = [];
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
    } finally {
      loading.value = false;
    }
  }

  onBeforeMount(async () => {
    try {
      if (provider) {
        await provider.ensureProviderScriptsLoaded();
      }
    } catch (error) {
      console.error('Error loading address autocomplete scripts:', error);
    }
  });

  return {
    suggestions,
    loading,
    selectSuggestion,
    runSuggestionQuery: debouncedFetch
  };
}
