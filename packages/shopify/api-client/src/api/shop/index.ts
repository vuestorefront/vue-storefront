import { _shopifyClient, settings } from '../../index';
import { Shop, ShopSearchParams } from '../../types';

/**
 * Return data: `currencyCode`, `description`, `moneyFormat`, `name`, and `primaryDomain`
 */
async function fetchInfo(): Promise<Shop[]> {
  const shop = await _shopifyClient.shop
    .fetchInfo()
    .then((shop) => {
      return shop;
    });
  return shop;
}

/**
 * Return data: privacy policy, terms of service and refund policy
 */
async function fetchPolicies(): Promise<Shop[]> {
  const shop = await _shopifyClient.shop
    .fetchPolicies()
    .then((shop) => {
      return shop;
    });
  return shop;
}

async function getShop(options: ShopSearchParams): Promise<Shop[]> {
  if (settings.overrides.getShop) {
    return settings.overrides.getShop();
  }

  if (options.withPolicy) {
    return fetchPolicies();
  } else {
    return fetchInfo();
  }
}

export default getShop;
