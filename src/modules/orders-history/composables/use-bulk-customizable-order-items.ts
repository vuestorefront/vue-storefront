import { Ref, computed } from '@vue/composition-api';

import { OrderItem } from '../types/order-item';
import { RawLocation } from 'vue-router';

export function useBulkCustomizableOrderItems (orderItems: Ref<OrderItem[]>) {
  const bulkCustomizableOrderItems = computed<OrderItem[]>(() => {
    return orderItems.value.filter((item: OrderItem) => {
      return item.support_bulk_customization;
    });
  });

  const hasBulkCustomizableOrderItems = computed<boolean>(() => {
    return bulkCustomizableOrderItems.value.length > 0;
  });

  const bulkCustomizationRoute = computed<RawLocation>(() => {
    return {
      name: 'order-items-bulk-customize',
      query: {
        orderItemIds: bulkCustomizableOrderItems.value.map((item) => item.item_id.toString())
      }
    };
  });

  return {
    bulkCustomizableOrderItems,
    bulkCustomizationRoute,
    hasBulkCustomizableOrderItems
  };
}
