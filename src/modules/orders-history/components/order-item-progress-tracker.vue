<template>
  <div class="order-item-progress-tracker" :title="$t('Progress Tracker')">
    <div class="_step-counter -vertical" v-if="isVertical">
      {{ $t('Step {current} of {total}', {current: currentStepIndex + 1, total: filteredStatusesCount}) }}
    </div>

    <div
      class="_progress-tracker"
      :class="{'-vertical': isVertical}"
    >
      <div
        class="_status-item"
        :class="{
          '-active': status.statusData.id === activeStatus.id,
          '-completed': status.index < currentStepIndex || lastStatus.id === activeStatus.id
        }"
        :key="status.statusData.id"
        v-for="status in statusesToDisplay"
      >
        <div class="_step-counter" v-if="!isVertical && activeStatus.id === status.statusData.id">
          {{ $t('Step {current} of {total}', {current: currentStepIndex + 1, total: filteredStatusesCount}) }}
        </div>

        <div class="_mark" />

        <template v-if="shouldShowStatusName(status)">
          <span class="_name">
            {{ status.statusData.name }}
          </span>
        </template>
      </div>
    </div>
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
    },
    maxStatusesToDisplayHorizontal: {
      type: Number,
      default: 3
    }
  },
  components: {
  },
  setup (props) {
    const filteredStatusesList = computed<ProgressTrackerStatus[]>(() => {
      return props.filteredStatusesList;
    });
    const activeStatusIndex = computed<number>(() => {
      return filteredStatusesList.value.findIndex((status) => status.id === props.activeStatus.id);
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
      return filteredStatusesList.value.findIndex((status) => status.id === props.activeStatus.id);
    });
    const isFirstStepActive = computed<boolean>(() => {
      return props.activeStatus.id === firstStatus.value.id;
    });
    const isLastStepActive = computed<boolean>(() => {
      return props.activeStatus.id === lastStatus.value.id;
    });

    const statusesToDisplay = computed<StatusDisplayItem[]>(() => {
      const _statusesList = filteredStatusesList.value;

      if (_statusesList.length <= props.maxStatusesToDisplayHorizontal || props.isVertical) {
        return _statusesList.map(
          (status, index) => ({
            statusData: status,
            index
          })
        );
      }

      const statuses: StatusDisplayItem[] = [
        {
          statusData: firstStatus.value,
          index: 0
        }
      ];

      if (isFirstStepActive.value) {
        statuses.push({
          statusData: _statusesList[1],
          index: 1
        });
      } else if (isLastStepActive.value) {
        const index = _statusesList.length - 2;

        statuses.push({
          statusData: _statusesList[index],
          index
        });
      } else if (props.activeStatus) {
        statuses.push({
          statusData: props.activeStatus,
          index: activeStatusIndex.value
        });
      }

      statuses.push({
        statusData: lastStatus.value,
        index: _statusesList.length - 1
      });

      return statuses;
    });

    function shouldShowStatusName (status: StatusDisplayItem): boolean {
      return [props.activeStatus.id, firstStatus.value.id, lastStatus.value.id].includes(status.statusData.id) || props.isVertical;
    }

    return {
      currentStepIndex,
      filteredStatusesCount,
      firstStatus,
      lastStatus,
      shouldShowStatusName,
      statusesToDisplay
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
  font-size: var(--font-xs);

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
    position: absolute;
    bottom: 117%;
    white-space: nowrap;

    &.-vertical {
      position: relative;
      bottom: auto;
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
