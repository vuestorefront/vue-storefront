import { apiClient } from '../../index';
import { AddToBasketParams } from '../../types';

export default async function (options: AddToBasketParams) {
  await apiClient.basket.addItem(options.basketKey, options.variantId);
}
