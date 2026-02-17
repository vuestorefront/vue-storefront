import { computed, Ref, ref, SetupContext, watch } from '@vue/composition-api';
import { SearchQuery } from 'storefront-query-builder';

import Product from '@vue-storefront/core/modules/catalog/types/Product';

import { canOrderItemHaveUpgrades } from '../helpers/can-order-item-have-upgrades';
import { Order } from '../types/order';
import { OrderItem } from '../types/order-item';
import { updateProductProductionTimeCustomizationData } from 'src/modules/customization-system';

function getSearchQuery (skus: string[]): SearchQuery {
  let productsQuery = new SearchQuery();

  productsQuery = productsQuery
    .applyFilter({ key: 'sku', value: { 'in': skus } })
    .applyFilter({ key: 'status', value: { 'in': [1] } });

  return productsQuery;
}

export function useAlterationProductsLoader (
  orders: Ref<Order[]>,
  { root }: SetupContext
) {
  const isLoading = ref<boolean>(false);

  const allOrderItems = computed<OrderItem[]>(() => {
    const items: OrderItem[] = [];

    for (const order of orders.value) {
      items.push(...order.items);
    }

    return items;
  });

  const orderItemIdToShippingCountryId = computed<Record<number, string | undefined>>(() => {
    const mapping: Record<number, string | undefined> = {};

    for (const order of orders.value) {
      const shippingCountryId = order.shipping_address?.country_id;

      for (const item of order.items) {
        mapping[item.item_id] = shippingCountryId;
      }
    }

    return mapping;
  });

  const eligibleOrderItems = computed<OrderItem[]>(() => {
    return allOrderItems.value.filter((item: OrderItem) => canOrderItemHaveUpgrades(item));
  });

  const alterationProductSkus = computed<string[]>(() => {
    const skus = new Set<string>();

    for (const item of eligibleOrderItems.value) {
      if (item.product.related_alteration_product) {
        skus.add(item.product.related_alteration_product.sku);
      }
    }

    return Array.from(skus);
  });

  const productBySkuDictionary = computed<Record<string, Product>>(() => {
    return root.$store.getters['product/getProductBySkuDictionary'] || {};
  });

  const alterationProductByOrderItemId = computed<Record<number, Product>>(() => {
    const dictionary: Record<number, Product> = {};

    for (const orderItem of eligibleOrderItems.value) {
      const alterationSku = orderItem.product.related_alteration_product?.sku;

      if (!alterationSku) {
        continue;
      }

      const product = productBySkuDictionary.value[alterationSku];

      if (!product) {
        continue;
      }

      const shippingCountryId = orderItemIdToShippingCountryId.value[orderItem.item_id];

      const updatedProduct = updateProductProductionTimeCustomizationData(
        product,
        root.$store,
        {
          shippingCountryId,
          addDefaultOptionValue: false
        }
      );

      dictionary[orderItem.item_id] = updatedProduct;
    }

    return dictionary;
  });

  async function loadAlterationProducts (): Promise<void> {
    if (isLoading.value || alterationProductSkus.value.length === 0) {
      return;
    }

    const notLoadedSkus: string[] = [];

    for (const sku of alterationProductSkus.value) {
      const product = productBySkuDictionary.value[sku];

      if (!product) {
        notLoadedSkus.push(sku);
      }
    }

    if (notLoadedSkus.length === 0) {
      return root.$store.dispatch(
        'budsies/loadProductsRushAddons',
        { productSku: '' }
      );
    }

    isLoading.value = true;

    try {
      await Promise.all([
        root.$store.dispatch('product/findProducts', {
          query: getSearchQuery(notLoadedSkus),
          options: {
            prefetchGroupProducts: false
          }
        }),
        root.$store.dispatch(
          'budsies/loadProductsRushAddons',
          { productSku: '' }
        )
      ]);
    } finally {
      isLoading.value = false;
    }
  }

  watch(
    alterationProductSkus,
    async () => {
      await loadAlterationProducts();
    },
    { immediate: true }
  );

  return {
    isLoading,
    alterationProductByOrderItemId,
    eligibleOrderItems,
    loadAlterationProducts
  };
}
