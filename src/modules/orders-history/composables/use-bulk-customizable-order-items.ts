import { RawLocation } from 'vue-router';
import { Ref, computed } from 'vue';

import { BudsieStatus } from 'src/modules/shared';

import { OrderItem } from '../types/order-item';

export function useBulkCustomizableOrderItems (orderItems: Ref<OrderItem[]>) {
  const bulkCustomizableOrderItems = computed<OrderItem[]>(() => {
    return orderItems.value.filter((item: OrderItem) => {
      return item.extension_attributes?.support_bulk_customization &&
        item.progress_tracker.status_id === BudsieStatus.AWAITING_CUSTOMIZATION;
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
