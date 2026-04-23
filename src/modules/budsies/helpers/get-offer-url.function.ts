import Product from '@vue-storefront/core/modules/catalog/types/Product';

export function getOfferUrl (product: Product, siteBaseUrl: string): string {
  const url = product.landing_page_url || product.url_key;

  if (url.startsWith('http')) {
    return url;
  }

  const normalizedPath = url.startsWith('/') ? url : `/${url}`;

  return `${siteBaseUrl}${normalizedPath}`;
}
