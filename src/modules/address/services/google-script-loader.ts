import { isServer } from '@vue-storefront/core/helpers';
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
      // TODO: log error
      return null
    }
  })();

  return scriptsLoadPromise;
}
