import config from 'config';
import { processURLAddress } from '@vue-storefront/core/helpers';
import { TaskQueue } from '@vue-storefront/core/lib/sync';
import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';
import { Logger } from '@vue-storefront/core/lib/logger';
import { getStateCodeByCountryAndRegionId } from 'src/modules/shared';

import { AddressValidationProvider } from './address-validation-provider.interface';
import { AutocompleteSuggestion } from '../types/autocomplete';
import { ValidationResult } from '../types/validation';
import { loadGooglePlacesScript } from './google-script-loader';
import { mapPlacesAddressToBaseAddress } from './google-places-address-mapping';
import { classifyValidationVerdict } from '../helpers/verdict-classifier';

export function createGoogleAddressValidationProvider (): AddressValidationProvider {
  let placesLibrary: google.maps.PlacesLibrary | null = null;
  let sessionToken: google.maps.places.AutocompleteSessionToken | null = null;
  let scriptsLoadedPromise: Promise<void> | null = null;

  async function ensureProviderScriptsLoaded (): Promise<void> {
    if (placesLibrary) {
      return;
    }

    const apiKey = config.address?.google?.placesPublicApiKey;

    if (!apiKey) {
      return;
    }

    if (scriptsLoadedPromise) {
      await scriptsLoadedPromise;
      return;
    }

    scriptsLoadedPromise = (async () => {
      try {
        placesLibrary = await loadGooglePlacesScript(apiKey);
      } catch (error) {
        Logger.error('Error ensuring provider scripts loaded: ' + error, 'google-address-validation')();
        scriptsLoadedPromise = null;
      }
    })();

    await scriptsLoadedPromise;
  }

  async function getAutocompleteSuggestions (
    query: string,
    opts?: { country?: string }
  ): Promise<AutocompleteSuggestion[]> {
    if (!query || query.length < 3) {
      return [];
    }

    try {
      await ensureProviderScriptsLoaded();

      if (!placesLibrary) {
        return [];
      }

      if (!sessionToken) {
        sessionToken = new placesLibrary.AutocompleteSessionToken();
      }

      const request: any = {
        input: query,
        sessionToken
      };

      if (opts?.country) {
        request.includedRegionCodes = [opts.country];
      }

      const { suggestions } = await placesLibrary.AutocompleteSuggestion.fetchAutocompleteSuggestions(request);

      if (!suggestions || suggestions.length === 0) {
        return [];
      }

      const suggestionsItems: AutocompleteSuggestion[] = [];

      for (const suggestion of suggestions) {
        if (!suggestion.placePrediction) {
          continue;
        }

        suggestionsItems.push({
          id: suggestion.placePrediction.placeId,
          description: suggestion.placePrediction.text.toString()
        })
      }

      return suggestionsItems;
    } catch (error) {
      Logger.error('Autocomplete error: ' + error, 'google-address-validation')();
      return [];
    }
  }

  async function getPlaceDetails (placeId: string): Promise<BaseAddressDetails> {
    await ensureProviderScriptsLoaded();

    if (!placesLibrary) {
      Logger.warn('Places library not loaded, returning empty address', 'google-address-validation')();
      return {
        firstName: '',
        lastName: '',
        country: '',
        streetAddress: '',
        apartmentNumber: '',
        city: '',
        state: '',
        region_id: null,
        zipCode: '',
        phoneNumber: '',
        vat_id: ''
      };
    }

    try {
      const { Place } = placesLibrary;
      const place = new Place({ id: placeId, requestedLanguage: 'en' });

      await place.fetchFields({
        fields: ['addressComponents']
      });

      if (!place.addressComponents || place.addressComponents.length === 0) {
        throw new Error('No address components found');
      }

      const mappedAddress = mapPlacesAddressToBaseAddress(place.addressComponents);

      const baseAddress: BaseAddressDetails = {
        firstName: '',
        lastName: '',
        country: mappedAddress.country || '',
        streetAddress: mappedAddress.streetAddress || '',
        apartmentNumber: '',
        city: mappedAddress.city || '',
        state: mappedAddress.state || '',
        region_id: mappedAddress.region_id || null,
        zipCode: mappedAddress.zipCode || '',
        phoneNumber: '',
        vat_id: ''
      };

      sessionToken = null;

      return baseAddress;
    } catch (error) {
      Logger.error('Place details error: ' + error, 'google-address-validation')();
      throw error;
    }
  }

  async function validate (address: BaseAddressDetails, previousResponseId?: string): Promise<ValidationResult> {
    let administrativeArea = address.state;

    if (!administrativeArea && address.region_id && address.country) {
      const stateCode = getStateCodeByCountryAndRegionId(address.country, address.region_id);

      if (stateCode) {
        administrativeArea = stateCode;
      }
    }

    const requestBody: any = {
      address: {
        addressLines: [address.streetAddress],
        locality: address.city,
        administrativeArea: administrativeArea,
        postalCode: address.zipCode,
        regionCode: address.country
      }
    };

    if (address.country.toLowerCase() === 'US') {
      requestBody.enableUspsCass = true;
    }

    if (previousResponseId) {
      requestBody.previousResponseId = previousResponseId;
    }

    try {
      const endpoint = config.budsies?.endpoint || '';
      const url = processURLAddress(`${endpoint}/address-validation-requests?token={{token}}`);

      const { result, resultCode } = await TaskQueue.execute({
        url,
        payload: {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(requestBody)
        },
        silent: true
      });

      if (resultCode < 200 || resultCode >= 300) {
        return {
          verdict: 'ERROR',
          raw: result || {},
          message: `Validation request failed with status ${resultCode}`
        };
      }

      return classifyValidationVerdict(result, address);
    } catch (error) {
      return {
        verdict: 'ERROR',
        raw: {},
        message: `Validation error: ${error.message || 'Unknown error'}`
      };
    }
  }

  return {
    ensureProviderScriptsLoaded,
    getAutocompleteSuggestions,
    getPlaceDetails,
    validate
  };
}
