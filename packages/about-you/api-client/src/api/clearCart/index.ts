import { apiClient } from '../../index';
import { ClearCartParams } from '../../types';

export default async function (options: ClearCartParams) {
  const response = await apiClient.basket.get(options.basketKey);
  const { items } = response.basket;

  if (items.length > 0) {
    Promise.all(items.map(async (item) => {
      return await apiClient.basket.deleteItem(options.basketKey, item.key);
    }));
  }
}
