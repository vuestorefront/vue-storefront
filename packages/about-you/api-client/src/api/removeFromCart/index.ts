import { apiClient } from '../../index';
import { DeleteItemParameters } from '../../types';

export default async function (options: DeleteItemParameters) {
  await apiClient.basket.deleteItem(options.basketKey, options.itemKey);
}
