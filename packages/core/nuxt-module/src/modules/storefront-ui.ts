import merge from '../helpers/merge';
import { ModuleOptions } from '../types';

// TODO: Create a separate nuxt module for storefront ui
function loadStorefrontRawSources(options: ModuleOptions): void {
  const rawSources = [
    '@storefront-ui/vue',
    '@storefront-ui/shared'
  ];

  options.useRawSource = merge(options.useRawSource, {
    dev: rawSources,
    prod: rawSources
  });
}

export default function VueStorefrontPerformanceModule(options: ModuleOptions): void {
  loadStorefrontRawSources.call(this, options);
}
