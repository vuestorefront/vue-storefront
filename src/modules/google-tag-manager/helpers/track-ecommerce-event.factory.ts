import VueGtm from '@gtm-support/vue2-gtm';

import GoogleTagManagerEvents from '../types/GoogleTagManagerEvents';

export function trackEcommerceEventFactory (gtm: typeof VueGtm): (
  data: {
    event: GoogleTagManagerEvents,
    ecommerce: Record<string, any>,
    [key: string]: any
  }
) => void {
  return (data) => {
    const dataLayer = gtm.dataLayer();

    if (dataLayer) {
      dataLayer.push({ ecommerce: null });
    }

    gtm.trackEvent(data);
  }
}
