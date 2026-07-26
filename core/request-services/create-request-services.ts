import { extractCookieValue } from '@vue-storefront/core/helpers/extract-cookie-value.function';
import getHostFromHeaders from '@vue-storefront/core/helpers/get-host-from-headers.function';
import { Context } from '@vue-storefront/core/scripts/utils/types';

import { RequestServices } from './types';

export function createRequestServices (
  context?: Context | null
): RequestServices {
  const request = context?.server?.request;
  const response = context?.server?.response;
  const host = request
    ? getHostFromHeaders(request.headers as Record<string, string>)
    : typeof window !== 'undefined'
      ? window.location.host
      : '';
  const userAgent = request
    ? request.headers['user-agent'] || ''
    : typeof navigator !== 'undefined'
      ? navigator.userAgent
      : '';

  const services: RequestServices = {
    host,
    userAgent,
    getCookie: (name: string) => {
      const cookie = request
        ? request.headers.cookie
        : typeof document !== 'undefined'
          ? document.cookie
          : undefined;
      return extractCookieValue(name, cookie);
    }
  };

  if (response) {
    services.redirect = (path, statusCode = 302) => {
      response.redirect(statusCode, path);
    };
  }

  return services;
}
