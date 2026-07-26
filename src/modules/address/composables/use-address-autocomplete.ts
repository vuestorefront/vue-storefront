import { ref, onBeforeMount, inject, Ref, computed, watch, onBeforeUnmount } from 'vue';
import debounce from 'lodash.debounce';

import { Logger } from '@vue-storefront/core/lib/logger';
import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';

import { AddressValidationProvider } from '../services/address-validation-provider.interface';
import { AutocompleteSuggestion } from '../types/autocomplete';
import { checkCountrySupported } from '../helpers/check-country-supported';

const SUGGESTION_QUERY_DEBOUNCE_MS = 300;

export function useAddressAutocomplete (addressRef: Ref<BaseAddressDetails>) {
  const provider = inject<AddressValidationProvider>('AddressValidationProviderService');

  const suggestions: Ref<AutocompleteSuggestion[]> = ref([]);
  const loading: Ref<boolean> = ref(false);
  let lastQuery = '';

  const isCountrySupported = computed<boolean>(() => {
    return checkCountrySupported(addressRef.value.country);
  });

  const country = computed<string>(() => {
    return addressRef.value.country;
  });

  function resetData () {
    suggestions.value = [];
    loading.value = false;
    lastQuery = '';
  }

  async function runSuggestionQuery (query: string): Promise<void> {
    const normalizedQuery = query?.trim() || '';

    if ((normalizedQuery === lastQuery) && suggestions.value.length > 0) {
      return;
    }

    if (normalizedQuery.length < 3) {
      resetData();
      return;
    }

    if (!isCountrySupported.value) {
      resetData();
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

        if (loading.value) {
          suggestions.value = results;
          return;
        }

        suggestions.value = [];
      }
    } catch (error) {
      Logger.error('Error fetching address suggestions: ' + error, 'address-autocomplete')();
      suggestions.value = [];
    } finally {
      loading.value = false;
    }
  }

  const debouncedFetch = debounce(runSuggestionQuery, SUGGESTION_QUERY_DEBOUNCE_MS);

  async function selectSuggestion (placeId: string): Promise<void> {
    loading.value = true;

    try {
      if (provider) {
        const details = await provider.getPlaceDetails(placeId);

        if (loading.value) {
          addressRef.value = {
            ...addressRef.value,
            streetAddress: details.streetAddress || addressRef.value.streetAddress,
            city: details.city || addressRef.value.city,
            state: details.state || '',
            region_id: details.region_id,
            zipCode: details.zipCode || addressRef.value.zipCode,
            country: details.country || addressRef.value.country
          };
        }

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

  onBeforeUnmount(() => {
    resetData();
    debouncedFetch.cancel();
  });

  watch(country, () => {
    resetData();
  });

  return {
    suggestions,
    loading,
    selectSuggestion,
    runSuggestionQuery: debouncedFetch
  };
}
