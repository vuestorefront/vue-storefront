/**
 * Core Vue Storefront 2 library.
 *
 * @remarks
 * The `@vue-storefront/core` library is a core of the whole Vue Storefront 2 application.
 * It defines common interfaces for all eCommerce integrations, factories for creating
 * composables, logger, SSR helpers and more.
 *
 * @packageDocumentation
 */

/* istanbul ignore file */
export * from './utils';
export * from './factories';
export * from './types';

declare global {
  interface Window { $vuestorefront: any }
}

if (typeof window !== 'undefined') {
  window.$vuestorefront = window.$vuestorefront || { integrations: [] };
}

export function track(id: string): void {
  if (typeof window !== 'undefined') {
    if (window.$vuestorefront) {
      window.$vuestorefront.integrations.push(id);
    }
  }
}
