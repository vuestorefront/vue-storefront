import { _shopifyClient } from '../../index';
import { Shop, ShopSearchParams } from '../../types';

/**
 * Return data: `currencyCode`, `description`, `moneyFormat`, `name`, and `primaryDomain`
 */
async function fetchInfo(): Promise<Shop[]> {
  return await _shopifyClient.shop.fetchInfo();
}

/**
 * Return data: privacy policy, terms of service and refund policy
 */
async function fetchPolicies(): Promise<Shop[]> {
  return await _shopifyClient.shop.fetchPolicies();
}

async function getShop(options: ShopSearchParams): Promise<Shop[]> {
  if (options.withPolicy) {
    return fetchPolicies();
  } else {
    return fetchInfo();
  }
}

export default getShop;
