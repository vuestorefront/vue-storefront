import { extractCookieValue } from '@vue-storefront/core/helpers';

export default function getCookieByName (
  name: string,
  cookieString?: string
): string | undefined {
  if (cookieString === undefined && typeof document !== 'undefined') {
    cookieString = document.cookie;
  }
  return extractCookieValue(name, cookieString);
}
