import { isServer } from '@vue-storefront/core/helpers';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader/dist';

let scriptsLoadPromise: Promise<void> | null = null;

export async function loadGooglePlacesScript (apiKey: string): Promise<void> {
  if (isServer) {
    return;
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
      await importLibrary('places');
    } catch (error) {
      scriptsLoadPromise = null;
      // TODO: log error
    }
  })();

  return scriptsLoadPromise;
}
