import { Ref, computed } from 'vue';

import { BudsieStatus } from 'src/modules/shared';

import { ProgressTrackerData } from '../types/progress-tracker-data';
import { ProgressTrackerStatus } from '../types/progress-tracker-status';
import { OrderItem } from '../types/order-item';

export function useOrderItemProgressTracker (
  orderItem: Ref<OrderItem>,
  maxHorizontalStatusesToDisplayCount: number
) {
  const progressTrackerData = computed<ProgressTrackerData>(() => {
    return orderItem.value.progress_tracker;
  });

  const isOrderCancelled = computed<boolean>(() => {
    return progressTrackerData.value.cancelled;
  });

  const isOrderCompleted = computed<boolean>(() => {
    return progressTrackerData.value.completed;
  });

  const isOrderCancelledOrOnHoldOrCompleted = computed<boolean>(() => {
    return isOrderCancelled.value || isOrderCompleted.value || progressTrackerData.value.status_id === BudsieStatus.ON_HOLD;
  });

  const filteredStatusesList = computed<ProgressTrackerStatus[]>(() => {
    return progressTrackerData.value.status_list.filter((status) =>
      status.id !== BudsieStatus.ON_HOLD
    );
  });

  const activeStatus = computed<ProgressTrackerStatus | undefined>(() => {
    return progressTrackerData.value.status_list.find((status) => status.id === progressTrackerData.value.status_id);
  });

  const canShowProgressTracker = computed<boolean>(() => {
    return !!activeStatus.value && !isOrderCancelledOrOnHoldOrCompleted.value && orderItem.value.available_actions.every(
      (item) => {
        return !item.blocking_progress;
      }
    );
  });

  const canShowExtendedProgressTracker = computed<boolean>(() => {
    if (!canShowProgressTracker.value) {
      return false;
    }

    return filteredStatusesList.value.length > maxHorizontalStatusesToDisplayCount;
  });

  return {
    activeStatus,
    canShowExtendedProgressTracker,
    canShowProgressTracker,
    filteredStatusesList,
    isOrderCancelled,
    isOrderCompleted,
    isOrderCancelledOrOnHoldOrCompleted: isOrderCancelledOrOnHoldOrCompleted
  }
}
