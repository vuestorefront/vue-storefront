import { isServer } from '@vue-storefront/core/helpers';
import { Logger } from '@vue-storefront/core/lib/logger';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader/dist';

let scriptsLoadPromise: Promise<google.maps.PlacesLibrary | null> | null = null;

export async function loadGooglePlacesScript (apiKey: string): Promise<google.maps.PlacesLibrary | null> {
  if (isServer) {
    return null;
  }

  if (scriptsLoadPromise) {
    return scriptsLoadPromise;
  }

  scriptsLoadPromise = (async () => {
    setOptions({
      key: apiKey,
      v: 'weekly'
    });

    try {
      return await importLibrary('places');
    } catch (error) {
      scriptsLoadPromise = null;
      Logger.error('Error loading Google Places script: ' + error, 'google-script-loader')();
      return null
    }
  })();

  return scriptsLoadPromise;
}
