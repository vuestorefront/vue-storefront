import { computed, Ref, ref, watch } from '@vue/composition-api';
import { SearchQuery } from 'storefront-query-builder';

import rootStore from '@vue-storefront/core/store';
import Product from '@vue-storefront/core/modules/catalog/types/Product';

import { canOrderItemHaveUpgrades } from '../helpers/can-order-item-have-upgrades';
import { OrderItem } from '../types/order-item';

function getSearchQuery (skus: string[]): SearchQuery {
  let productsQuery = new SearchQuery();

  productsQuery = productsQuery
    .applyFilter({ key: 'sku', value: { 'in': skus } })
    .applyFilter({ key: 'status', value: { 'in': [1] } });

  return productsQuery;
}

export function useAlterationProductsLoader (
  orderItems: Ref<OrderItem[]>
) {
  const isLoading = ref<boolean>(false);

  const eligibleOrderItems = computed<OrderItem[]>(() => {
    return orderItems.value.filter((item: OrderItem) => canOrderItemHaveUpgrades(item));
  });

  const alterationProductSkus = computed<string[]>(() => {
    const skus = new Set<string>();

    for (const item of eligibleOrderItems.value) {
      if (item.product.related_alteration_product) {
        skus.add(item.product.related_alteration_product);
      }
    }

    return Array.from(skus);
  });

  const productBySkuDictionary = computed<Record<string, Product>>(() => {
    return rootStore.getters['product/getProductBySkuDictionary'] || {};
  });

  const alterationProductsByOrderItemId = computed<Record<number, Product>>(() => {
    const dictionary: Record<number, Product> = {};

    for (const orderItem of eligibleOrderItems.value) {
      const alterationSku = orderItem.product.related_alteration_product;

      if (!alterationSku) {
        continue;
      }

      for (const key in productBySkuDictionary.value) {
        const product = productBySkuDictionary.value[key];

        if (product.parentSku === alterationSku || product.sku === alterationSku) {
          dictionary[orderItem.item_id] = product;
          break;
        }
      }
    }

    return dictionary;
  });

  async function loadAlterationProducts (): Promise<void> {
    if (isLoading.value || alterationProductSkus.value.length === 0) {
      return;
    }

    const notLoadedSkus: string[] = [];

    for (const sku of alterationProductSkus.value) {
      let found = false;

      for (const key in productBySkuDictionary.value) {
        const product = productBySkuDictionary.value[key];

        if (product.parentSku === sku || product.sku === sku) {
          found = true;
          break;
        }
      }

      if (!found) {
        notLoadedSkus.push(sku);
      }
    }

    if (notLoadedSkus.length === 0) {
      return;
    }

    isLoading.value = true;

    try {
      await rootStore.dispatch('product/findProducts', {
        query: getSearchQuery(notLoadedSkus),
        options: {
          prefetchGroupProducts: false
        }
      });
    } finally {
      isLoading.value = false;
    }
  }

  watch(
    alterationProductSkus,
    () => {
      void loadAlterationProducts();
    },
    { immediate: true }
  );

  return {
    isLoading,
    alterationProductsByOrderItemId,
    eligibleOrderItems,
    loadAlterationProducts
  };
}
