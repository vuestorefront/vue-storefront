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
