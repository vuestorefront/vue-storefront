<template>
  <div class="order-item-progress-tracker" :title="$t('Progress Tracker')">
    <template v-if="!isCancelled && !isOnHold">
      <div class="_step-counter">
        {{ $t('Step {current} of {total}', {current: currentStepIndex + 1, total: filteredStatusesCount}) }}
      </div>

      <div class="_progress-tracker">
        <div
          class="_status-item"
          :class="{
            '-active': status.id === activeStatusId,
          }"
          :key="status.id"
          v-for="status in statusesToDisplay"
        >
          <span class="_name">
            {{ status.name }}
          </span>
        </div>
      </div>
    </template>

    <div class="_cancelled" v-else>
      {{ isCancelled ? $t('Order is Cancelled') : $t('Order is On Hold') }}
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, computed } from '@vue/composition-api';

import { ProgressTrackerStatus } from '../types/progress-tracker-status';
import { ProgressTrackerData } from '../types/progress-tracker-data';

const CANCELLED_STATUS_NAME = 'cancelled';
const ON_HOLD_STATUS_NAME = 'on hold';
const STATUSES_TO_DISPLAY_COUNT = 3;

export default defineComponent({
  name: 'OrderItemProgressTracker',
  props: {
    progressTracker: {
      type: Object as PropType<ProgressTrackerData>,
      required: true
    }
  },
  setup (props) {
    const statusesList = computed<ProgressTrackerStatus[]>(() => {
      return props.progressTracker.status_list
    });
    const isCancelled = computed<boolean>(() => {
      return props.progressTracker.cancelled
    });
    const activeStatusId = computed<number>(() => {
      return props.progressTracker.status_id
    });
    const activeStatus = computed<ProgressTrackerStatus | undefined>(() => {
      return statusesList.value.find((status) => status.id === activeStatusId.value);
    });
    const isOnHold = computed<boolean>(() => {
      const _activeStatus = activeStatus.value;

      if (!_activeStatus) {
        return false;
      }

      return _activeStatus.name.toLowerCase() === ON_HOLD_STATUS_NAME;
    });

    const filteredStatusesList = computed<ProgressTrackerStatus[]>(() => {
      return statusesList.value.filter((status) =>
        status.name.toLowerCase() !== CANCELLED_STATUS_NAME && status.name.toLowerCase() !== ON_HOLD_STATUS_NAME
      );
    });
    const filteredStatusesCount = computed<number>(() => {
      return filteredStatusesList.value.length;
    });

    const firstStatus = computed<ProgressTrackerStatus>(() => {
      return filteredStatusesList.value[0];
    });
    const lastStatus = computed<ProgressTrackerStatus>(() => {
      return filteredStatusesList.value[filteredStatusesList.value.length - 1];
    });
    const currentStepIndex = computed<number>(() => {
      return filteredStatusesList.value.findIndex((status) => status.id === activeStatusId.value);
    });
    const isFirstStepActive = computed<boolean>(() => {
      return props.progressTracker.status_id === firstStatus.value.id;
    });
    const isLastStepActive = computed<boolean>(() => {
      return props.progressTracker.status_id === lastStatus.value.id;
    });

    const statusesToDisplay = computed<ProgressTrackerStatus[]>(() => {
      const _statusesList = filteredStatusesList.value;

      if (_statusesList.length <= STATUSES_TO_DISPLAY_COUNT) {
        return _statusesList;
      }

      const statuses: ProgressTrackerStatus[] = [firstStatus.value];

      if (isFirstStepActive.value) {
        statuses.push(_statusesList[1]);
      } else if (isLastStepActive.value) {
        statuses.push(_statusesList[_statusesList.length - 2]);
      } else if (activeStatus.value) {
        statuses.push(activeStatus.value);
      }

      statuses.push(lastStatus.value);

      return statuses;
    });

    return {
      activeStatusId,
      currentStepIndex,
      filteredStatusesCount,
      isCancelled,
      isOnHold,
      statusesToDisplay,
      statusesList
    }
  }
})
</script>

<style lang="scss" scoped>
.order-item-progress-tracker {
  display: flex;
  flex-direction: column;

  ._progress-tracker {
    display: flex;
    flex-wrap: wrap;
    row-gap: var(--spacer-2xs);
  }

  ._status-item {
    border: 1px solid var(--c-secondary);
    padding: var(--spacer-2xs) var(--spacer-sm);
    box-sizing: border-box;
    font-size: var(--font-xs);

    &.-active {
      background-color: var(--c-secondary);
    }
  }
}
</style>
