import { isServer, extractCookieValue } from '@vue-storefront/core/helpers';

import { Context } from 'core/scripts/utils/types';

export default function getCookieByName (name: string, ssrContext?: Context): string | undefined {
  if (!ssrContext && isServer) {
    return;
  }

  let cookieString: string |undefined;

  if (ssrContext) {
    cookieString = (ssrContext.server.request as any).headers.cookie
  }

  if (typeof document !== 'undefined') {
    cookieString = document.cookie;
  }

  return extractCookieValue(name, cookieString);
}
