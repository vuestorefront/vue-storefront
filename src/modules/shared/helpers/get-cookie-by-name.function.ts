import { isServer, getCookieByName as getCookieByNameBase } from '@vue-storefront/core/helpers';

import { Context } from 'core/scripts/utils/types';

export default function getCookieByName (name: string, ssrContext?: Context): string | undefined {
  if (!ssrContext && isServer) {
    return;
  }

  const cookie = ssrContext ? (ssrContext.server.request as any).headers.cookie : document.cookie;

  return getCookieByNameBase(name, cookie);
}
