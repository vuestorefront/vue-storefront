<template>
  <div class="order-item-progress-tracker" :title="$t('Progress Tracker')">
    <template v-if="!isCancelled && !isOnHold">
      <div class="_heading-container">
        <SfHeading class="_heading" :title="$t('Progress')" :level="5" />

        <SfButton
          v-if="showExpandProgressButton"
          class="sf-button--text"
          @click="onExpandProgressButtonClicked"
        >
          {{ expandProgressButtonText }}
        </SfButton>
      </div>

      <div class="_step-counter -expanded" v-show="showExpandedProgressTracker">
        {{ $t('Step {current} of {total}', {current: currentStepIndex + 1, total: filteredStatusesCount}) }}
      </div>

      <div
        class="_progress-tracker"
        :class="{'-expanded': showExpandedProgressTracker}"
      >
        <div
          class="_status-item"
          :class="{
            '-active': status.statusData.id === activeStatusId,
            '-completed': status.index < currentStepIndex || lastStatus.id === activeStatusId
          }"
          :key="status.statusData.id"
          v-for="status in statusesToDisplay"
        >
          <div class="_step-counter" v-if="!showExpandedProgressTracker && activeStatusId === status.statusData.id">
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
    </template>

    <div class="_cancelled" v-else>
      {{ isCancelled ? $t('Order is Cancelled') : $t('Order is On Hold') }}
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, computed, ref } from '@vue/composition-api';
import { SfButton, SfHeading } from '@storefront-ui/vue';

import { ProgressTrackerStatus } from '../types/progress-tracker-status';
import { ProgressTrackerData } from '../types/progress-tracker-data';

const ON_HOLD_STATUS_ID = 14;
const STATUSES_TO_DISPLAY_COUNT = 3;

interface StatusDisplayItem {
  statusData: ProgressTrackerStatus,
  index: number
}

export default defineComponent({
  name: 'OrderItemProgressTracker',
  props: {
    progressTracker: {
      type: Object as PropType<ProgressTrackerData>,
      required: true
    }
  },
  components: {
    SfButton,
    SfHeading
  },
  setup (props, { root }) {
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

      return _activeStatus.id === ON_HOLD_STATUS_ID;
    });

    const filteredStatusesList = computed<ProgressTrackerStatus[]>(() => {
      return statusesList.value.filter((status) =>
        status.id !== ON_HOLD_STATUS_ID
      );
    });
    const activeStatusIndex = computed<number>(() => {
      return filteredStatusesList.value.findIndex((status) => status.id === activeStatusId.value);
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

    const showExpandedView = ref<boolean>(false);
    const showExpandProgressButton = computed<boolean>(() => {
      return filteredStatusesCount.value > STATUSES_TO_DISPLAY_COUNT;
    });
    const showExpandedProgressTracker = computed<boolean>(() => {
      return showExpandProgressButton.value && showExpandedView.value;
    });
    const expandProgressButtonText = computed<string>(() => {
      return showExpandedProgressTracker.value
        ? root.$t('collapse').toString()
        : root.$t('expand').toString();
    });

    function onExpandProgressButtonClicked () {
      showExpandedView.value = !showExpandedView.value;
    }

    const statusesToDisplay = computed<StatusDisplayItem[]>(() => {
      const _statusesList = filteredStatusesList.value;

      if (_statusesList.length <= STATUSES_TO_DISPLAY_COUNT || showExpandedView.value) {
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
      } else if (activeStatus.value) {
        statuses.push({
          statusData: activeStatus.value,
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
      return [activeStatusId.value, firstStatus.value.id, lastStatus.value.id].includes(status.statusData.id) || showExpandedProgressTracker.value;
    }

    return {
      activeStatusId,
      currentStepIndex,
      expandProgressButtonText,
      filteredStatusesCount,
      filteredStatusesList,
      firstStatus,
      isCancelled,
      isOnHold,
      lastStatus,
      onExpandProgressButtonClicked,
      shouldShowStatusName,
      showExpandProgressButton,
      showExpandedProgressTracker,
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
    justify-content: space-between;
    row-gap: var(--spacer-2xs);
    padding-top: var(--spacer-sm);
    margin-top: var(--spacer-xs);

    &.-expanded {
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

        &.-completed,
        &.-active {
          ._mark {
            &::before,
            &::after {
              width: $mark-border-width;
              height: calc(calc(50% - #{$mark-size / 2}) - #{$mark-border-width / 2});
            }

            &::before {
              border-left: 0;
            }
          }
        }

        &.-completed {
          ._mark {
            &::after {
              border-left: 0;
            }
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
          border-left: 2px dashed var(--c-secondary);
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

  ._heading-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  ._heading {
    --heading-padding: 0;

    text-align: start;
  }

  ._step-counter {
    position: absolute;
    bottom: 100%;
    white-space: nowrap;

    &.-expanded {
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
      border: $mark-border-width solid var(--c-secondary);

      &::before,
      &::after {
        content: "";
        width: calc(calc(50% - #{$mark-size / 2}) - #{$mark-border-width / 2});
        top: calc(#{$mark-size / 2} + #{$mark-border-width / 2});
        border-top: $mark-border-width dashed var(--c-secondary);
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
        background-color: var(--c-secondary);

        &::before {
          background-color: var(--c-success);
          height: $mark-border-width;
          border-top: 0;
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
          height: $mark-border-width;
          border-top: 0;
        }
      }
    }
  }
}
</style>
