<template>
  <div
    class="order-item-progress-tracker"
    :class="{'-compact': !isVertical}"
    :title="$t('Progress Tracker')"
  >
    <template v-if="isVertical">
      <div class="_step-counter -vertical">
        {{ $t('Step {current} of {total}', {current: currentStepIndex + 1, total: filteredStatusesCount}) }}
      </div>

      <div class="_progress-tracker -vertical">
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
  $line-color: #4F7D8F;

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
        background-color: var(--c-primary);
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
            color: var(--c-primary);
            font-weight: var(--font-bold);
        }
        &.-end {
           text-align: right;
        }
      }
    }
  }

  ._progress-tracker {
    display: flex;
    justify-content: space-between;
    row-gap: var(--spacer-2xs);
    padding-top: var(--spacer-base);

    &.-vertical {
      flex-direction: column;
      align-items: flex-start;
      row-gap: 0;
      margin-top: 0;
      padding-top: 0;

      ._status-item {
        flex-direction: row;
        align-items: center;
        flex-basis: 32px;
        column-gap: var(--spacer-xs);

        ._mark {
          &::before,
          &::after {
            border-left-style: solid
          }
        }
      }

      ._name {
        margin-top: 0;
      }

      ._mark {
        &::before,
        &::after {
          height: calc(calc(50% - #{$mark-size / 2}) - #{$mark-border-width / 2});
          width: 2px;
          left: 6px;
          border-left: 2px dashed $line-color;
          border-top: 0;
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

    }
  }

  ._step-counter {
    white-space: nowrap;

    &.-vertical {
      position: relative;
      margin-top: var(--spacer-xs);
    }
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
      border: $mark-border-width solid $line-color;
      background-color: var(--c-white);

      &::before,
      &::after {
        content: "";
        width: calc(calc(50% - #{$mark-size / 2}) - #{$mark-border-width});
        top: calc(#{$mark-size / 2} + #{$mark-border-width / 2});
        border-top: $mark-border-width dashed $line-color;
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
      align-items: flex-start;

      ._mark {
        &::before {
          display: none;
        }

        &::after {
          width: calc(100% - #{$mark-size + $mark-border-width * 2});
        }
      }
    }

    &:last-of-type {
      align-items: flex-end;

      ._mark {
        &::after {
          display: none;
        }

        &::before {
          width: calc(100% - #{$mark-size + $mark-border-width * 2});
        }
      }
    }

    ._name {
      margin-top: var(--spacer-2xs);
    }

    &.-active {
      ._mark {
        background-color: var(--c-blue);
        border-color: var(--c-blue);

        &::before {
          border-color: var(--c-blue);
        }
      }

      ._name {
        color: var(--c-blue);
        font-weight: var(--font-bold);
      }
    }

    &.-completed {
      ._mark {
        background-color: var(--c-blue);
        border-color: var(--c-blue);

        &::before,
        &::after {
          border-color: var(--c-blue);
        }
      }

      ._name {
        font-weight: var(--font-semibold);
      }
    }
  }
}
</style>
