<template>
  <div
    class="order-item-progress-tracker"
    :class="isVertical ? '-vertical' : '-compact'"
    :title="$t('Progress Tracker')"
  >
    <template v-if="isVertical">
      <div class="_step-counter">
        {{ $t('Step {current} of {total}', {current: currentStepIndex + 1, total: filteredStatusesCount}) }}
      </div>

      <div class="_progress-tracker">
        <div
          class="_status-item"
          :class="{
            '-active': status.statusData.id === activeStatus.id,
            '-completed': status.index < currentStepIndex || lastStatus.id === activeStatus.id
          }"
          :key="status.statusData.id"
          v-for="status in statusesToDisplay"
        >
          <div class="_mark" />
          <span class="_name">
            {{ status.statusData.name }}
          </span>
        </div>
      </div>
    </template>

    <template v-else>
      <div
        class="_progress-bar"
        role="progressbar"
        :aria-valuenow="currentStepIndex + 1"
        aria-valuemin="1"
        :aria-valuemax="filteredStatusesCount"
        :aria-label="$t('Order Progress')"
      >
        <div class="_bar-track">
          <div class="_bar-fill" :style="{ width: `${progressPercentage}%` }" />
        </div>
      </div>

      <div class="_labels">
        <span class="_label -start">
          {{ activeStatus ? activeStatus.name : '' }}
        </span>
        <span class="_label -end">
          {{ lastStatus ? lastStatus.name : '' }}
        </span>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, computed } from '@vue/composition-api';

import { ProgressTrackerStatus } from '../types/progress-tracker-status';

interface StatusDisplayItem {
  statusData: ProgressTrackerStatus,
  index: number
}

export default defineComponent({
  name: 'OrderItemProgressTracker',
  props: {
    activeStatus: {
      type: Object as PropType<ProgressTrackerStatus>,
      default: undefined
    },
    filteredStatusesList: {
      type: Array as PropType<ProgressTrackerStatus[]>,
      required: true
    },
    isVertical: {
      type: Boolean,
      default: false
    }
  },
  components: {
  },
  setup (props) {
    const filteredStatusesList = computed<ProgressTrackerStatus[]>(() => {
      return props.filteredStatusesList;
    });
    const filteredStatusesCount = computed<number>(() => {
      return filteredStatusesList.value.length;
    });

    const lastStatus = computed<ProgressTrackerStatus>(() => {
      return filteredStatusesList.value[filteredStatusesList.value.length - 1];
    });
    const currentStepIndex = computed<number>(() => {
      return filteredStatusesList.value.findIndex((status) => status.id === props.activeStatus.id);
    });

    const progressPercentage = computed<number>(() => {
      if (filteredStatusesCount.value <= 1) return 0;
      return (currentStepIndex.value / (filteredStatusesCount.value - 1)) * 100;
    });

    const statusesToDisplay = computed<StatusDisplayItem[]>(() => {
      const _statusesList = filteredStatusesList.value;
      return _statusesList.map((status, index) => ({ statusData: status, index }));
    });

    return {
      currentStepIndex,
      filteredStatusesCount,
      lastStatus,
      statusesToDisplay,
      progressPercentage
    }
  }
})
</script>

<style lang="scss" scoped>
.order-item-progress-tracker {
  $mark-size: 10px;
  $mark-border-width: 2px;
  $color-step-active: var(--c-primary);
  $color-step-completed: var(--c-blue);
  $color-step-incomplete: var(--c-text-muted);

  display: flex;
  flex-direction: column;

  &.-compact {
    font-size: var(--font-xs);

    ._progress-bar {
      width: 100%;
      margin: var(--spacer-xs) 0;

      ._bar-track {
        height: .6em;
        background-color: var(--c-divider);
        overflow: hidden;
        position: relative;
      }

      ._bar-fill {
        height: 100%;
        background-color: $color-step-active;
        transition: width 0.3s ease;
      }
    }

    ._labels {
      display: flex;
      justify-content: space-between;
      width: 100%;

      ._label {
        color: var(--c-text-muted);

        &.-start {
          color: $color-step-active;
          font-weight: var(--font-bold);
        }

        &.-end {
          text-align: right;
        }
      }
    }
  }

  &.-vertical {
    ._step-counter {
      white-space: nowrap;
      position: relative;
      margin-top: var(--spacer-xs);
    }

    ._progress-tracker {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      row-gap: 0;

      ._status-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-basis: 32px;
        column-gap: var(--spacer-xs);
        position: relative;
        box-sizing: border-box;

        ._mark {
          border-radius: 50%;
          width: $mark-size;
          height: $mark-size;
          border: $mark-border-width solid $color-step-incomplete;
          background-color: var(--c-white);

          &::before,
          &::after {
            content: "";
            position: absolute;
            height: calc(calc(50% - #{$mark-size / 2}) - #{$mark-border-width / 2});
            width: 2px;
            left: 6px;
            border-left: 2px solid $color-step-incomplete;
          }

          &::after {
            bottom: 0;
            top: auto;
          }

          &::before {
            top: 0;
            bottom: auto;
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
          color: $color-step-incomplete;
          margin-top: 0;
        }

        &.-active {
          ._mark {
            background-color: $color-step-active;
            border-color: $color-step-active;

            &::before {
              border-color: $color-step-completed;
            }
          }

          ._name {
            color: $color-step-active;
            font-weight: var(--font-semibold);
          }
        }

        &.-completed {
          ._mark {
            background-color: $color-step-completed;
            border-color: $color-step-completed;

            &::before,
            &::after {
              border-color: $color-step-completed;
            }
          }

          ._name {
            color: var(--c-text);
          }
        }
      }
    }
  }
}
</style>
