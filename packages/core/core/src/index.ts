/* istanbul ignore file */

export * from './utils';
export * from './factories';
export * from './types';

declare global {
  interface Window { $VSF: any }
}

if (typeof window !== 'undefined') {
  window.$VSF = window.$VSF || { integrations: [] };
}

export function track(id: string): void {
  if (typeof window !== 'undefined') {
    if (window.$VSF) {
      window.$VSF.integrations.push(id);
    }
  }
}
