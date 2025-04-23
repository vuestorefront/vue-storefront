<template>
  <div class="order-item-progress-tracker" :title="$t('Progress Tracker')">
    <template v-if="!isCancelled">
      <div
        class="_status-item"
        :class="{
          '-active': status.id === activeStatusId,
        }"
        :key="status.id"
        v-for="status in statusesList"
      >
        <span class="_name">
          {{ status.name }}
        </span>
      </div>
    </template>

    <div class="_cancelled" v-else>
      {{ $t('Order is Cancelled') }}
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, computed } from '@vue/composition-api';

import { ProgressTrackerStatus } from '../types/progress-tracker-status';
import { ProgressTrackerData } from '../types/progress-tracker-data';

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
      return props.progressTracker.is_cancelled
    });
    const activeStatusId = computed<number>(() => {
      return props.progressTracker.status_id
    });

    return {
      statusesList,
      isCancelled,
      activeStatusId
    }
  }
})
</script>

<style lang="scss" scoped>
.order-item-progress-tracker {
  display: flex;
  flex-wrap: wrap;
  row-gap: var(--spacer-2xs);

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
