import config from 'config';
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

const { storeViews } = config;

export function checkMultiStoreLocalStorageKey (key: string, path: string): boolean {
  const { multistore, commonCache } = storeViews;
  const storeView = currentStoreView();

  let storePrefix = 'shop';

  if ((!multistore && storeView.storeCode) || (multistore && !commonCache)) {
    storePrefix = storeView.storeCode + '-' + storePrefix;
  }

  const pathWithPrefix = `${storePrefix}/${path}`;

  return key === pathWithPrefix;
}
