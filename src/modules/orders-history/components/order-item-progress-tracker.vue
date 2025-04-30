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
            '-completed': index < currentStepIndex || lastStatus.id === activeStatusId
          }"
          :key="status.id"
          v-for="(status, index) in filteredStatusesList"
        >
          <div class="_mark" />

          <template v-if="[activeStatusId, firstStatus.id, lastStatus.id].includes(status.id)">
            <span class="_name">
              {{ status.name }}
            </span>
          </template>
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
      filteredStatusesList,
      firstStatus,
      isCancelled,
      isOnHold,
      lastStatus,
      statusesToDisplay,
      statusesList
    }
  }
})
</script>

<style lang="scss" scoped>
.order-item-progress-tracker {
  $mark-size: 10px;
  $mark-border-width: 2px;

  display: flex;
  flex-direction: column;
  font-size: var(--font-xs);

  ._progress-tracker {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: var(--spacer-2xs);
  }

  ._status-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    flex: 1;
    text-align: center;

    ._mark {
      border-radius: 50%;
      width: $mark-size;
      height: $mark-size;
      border: $mark-border-width solid var(--c-secondary);

      &::before,
      &::after {
        content: "";
        width: calc(calc(50% - #{$mark-size / 2}) - #{$mark-border-width / 2});
        top: calc(#{$mark-size / 2} + #{$mark-border-width / 2});
        height: $mark-border-width;
        background-color: var(--c-secondary);
        position: absolute;
      }

      &::before {
        left: 0;
      }

      &::after {
        right: 0;
      }

    }

    &:first-of-type {
      ._mark {
        &::before {
          display: none;
        }
      }
    }

    &:last-of-type {
      ._mark {
        &::after {
          display: none;
        }
      }
    }

    ._name {
      margin-top: var(--spacer-2xs);
    }

    &.-active {
      ._mark {
        background-color: var(--c-secondary);

        &::before {
          background-color: var(--c-success);
        }
      }
    }

    &.-completed {
      ._mark {
        background-color: var(--c-success);
        border-color: var(--c-success);

        &::before,
        &::after {
          background-color: var(--c-success);
        }
      }
    }
  }

  // hide some status items on small screens
  @media (max-width: 456px) {
      // ._status-item {
        // hide even
        // &:nth-child(even) {
        //   display: none;
        // }
        //
        // &:first-of-type,
        // &:last-of-type,
        // &.-active {
        //   display: flex;
        // }

        // hide completed
        // &.-completed {
        //   display: none;
        // }
        //
        // &:first-of-type,
        // &:last-of-type,
        // &.-active {
        //   display: flex;
        // }
      // }
  }
}
</style>
