import config from 'config';
import { processURLAddress } from '@vue-storefront/core/helpers';
import { TaskQueue } from '@vue-storefront/core/lib/sync';
import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';

import { AddressValidationProvider } from './address-validation-provider.interface';
import { AutocompleteSuggestion } from '../types/autocomplete';
import { ValidationResult } from '../types/validation';
import { loadGooglePlacesScript } from './google-script-loader';
import { mapPlacesAddressToBaseAddress } from './google-places-address-mapping';
import { classifyValidationVerdict } from '../helpers/verdict-classifier';

export class GoogleAddressValidationProviderService implements AddressValidationProvider {
  private scriptsLoadedPromise: Promise<void> | null = null;

  private autocompleteService: google.maps.places.AutocompleteService | null = null;
  private placesService: google.maps.places.PlacesService | null = null;
  private sessionToken: google.maps.places.AutocompleteSessionToken | null = null;

  public async ensureProviderScriptsLoaded (): Promise<void> {
    const apiKey = config.address?.google?.placesPublicApiKey;

    if (!apiKey) {
      return;
    }

    if (this.scriptsLoadedPromise) {
      await this.scriptsLoadedPromise;
      return;
    }

    this.scriptsLoadedPromise = loadGooglePlacesScript(apiKey);
    await this.scriptsLoadedPromise;

    if (window.google?.maps?.places) {
      this.autocompleteService = new window.google.maps.places.AutocompleteService();
      this.sessionToken = new window.google.maps.places.AutocompleteSessionToken();
    }
  }

  public async getAutocompleteSuggestions (
    query: string,
    opts?: { country?: string }
  ): Promise<AutocompleteSuggestion[]> {
    if (!query || query.length < 3) {
      return [];
    }

    try {
      await this.ensureProviderScriptsLoaded();

      if (!this.autocompleteService) {
        return [];
      }

      if (!this.sessionToken) {
        this.sessionToken = new window.google.maps.places.AutocompleteSessionToken();
      }

      const request: google.maps.places.AutocompletionRequest = {
        input: query,
        sessionToken: this.sessionToken
      };

      if (opts?.country) {
        request.componentRestrictions = { country: opts.country };
      }

      const response = await this.autocompleteService.getPlacePredictions(request);

      if (!response.predictions) {
        return [];
      }

      return response.predictions.map((prediction) => ({
        id: prediction.place_id,
        description: prediction.description
      }));
    } catch (error) {
      console.error('Autocomplete error:', error);
      return [];
    }
  }

  public async getPlaceDetails (placeId: string): Promise<BaseAddressDetails> {
    await this.ensureProviderScriptsLoaded();

    if (!this.placesService) {
      const div = document.createElement('div');
      this.placesService = new window.google.maps.places.PlacesService(div);
    }

    const placesService = this.placesService;

    const place = await new Promise<google.maps.places.PlaceResult>((resolve, reject) => {
      placesService.getDetails(
        {
          placeId,
          fields: ['address_components'],
          sessionToken: this.sessionToken || undefined
        },
        (result, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && result) {
            resolve(result);
          } else {
            // todo: fix
            // reject(new Error(`Failed to get place details: ${status}`));
          }
        }
      );
    });

    // todo: fix
    if (!place.address_components) {
      throw new Error('No address components found');
    }

    const mappedAddress = mapPlacesAddressToBaseAddress(place.address_components);

    const baseAddress: BaseAddressDetails = {
      firstName: '',
      lastName: '',
      country: mappedAddress.country || '',
      streetAddress: mappedAddress.streetAddress || '',
      apartmentNumber: mappedAddress.apartmentNumber || '',
      city: mappedAddress.city || '',
      state: mappedAddress.state || '',
      region_id: null,
      zipCode: mappedAddress.zipCode || '',
      phoneNumber: '',
      vat_id: ''
    };

    this.sessionToken = new window.google.maps.places.AutocompleteSessionToken();

    return baseAddress;
  }

  public async validate (address: BaseAddressDetails): Promise<ValidationResult> {
    const requestBody = {
      address: {
        addressLines: [address.streetAddress],
        locality: address.city,
        administrativeArea: address.state,
        postalCode: address.zipCode,
        regionCode: address.country
      },
      enableUspsCass: true
    };

    try {
      const endpoint = config.budsies?.endpoint || '';
      const url = processURLAddress(`${endpoint}/addresses/validate?token={{token}}`);

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
          raw: result,
          message: `Validation request failed with status ${resultCode}`
        };
      }

      return classifyValidationVerdict(result, address);
    } catch (error) {
      return {
        verdict: 'ERROR',
        raw: null,
        message: `Validation error: ${error.message || 'Unknown error'}`
      };
    }
  }
}
