import { ref, onBeforeMount, inject, Ref } from '@vue/composition-api';
import debounce from 'lodash.debounce';

import { Logger } from '@vue-storefront/core/lib/logger';
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

    if ((normalizedQuery === lastQuery) && suggestions.value.length > 0) {
      return;
    }

    if (normalizedQuery.length < 3) {
      suggestions.value = [];
      loading.value = false;
      return;
    }

    lastQuery = normalizedQuery;
    loading.value = true;

    try {
      if (provider) {
        const results = await provider.getAutocompleteSuggestions(
          normalizedQuery,
          { country: addressRef.value.country }
        );

        suggestions.value = results;
      }
    } catch (error) {
      Logger.error('Error fetching address suggestions: ' + error, 'address-autocomplete')();
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

        addressRef.value = {
          ...addressRef.value,
          streetAddress: details.streetAddress || addressRef.value.streetAddress,
          city: details.city || addressRef.value.city,
          state: details.state,
          regionId: details.region_id,
          zipCode: details.zipCode || addressRef.value.zipCode,
          country: details.country || addressRef.value.country
        };

        suggestions.value = [];
      }
    } catch (error) {
      Logger.error('Error fetching place details: ' + error, 'address-autocomplete')();
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
      Logger.error('Error loading address autocomplete scripts: ' + error, 'address-autocomplete')();
    }
  });

  return {
    suggestions,
    loading,
    selectSuggestion,
    runSuggestionQuery: debouncedFetch
  };
}
