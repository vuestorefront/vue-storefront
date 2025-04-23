<template>
  <div class="order-item-actions">
    <div
      class="_actions-with-messages"
      v-if="actionsListGroups.actionsWithMessagesList.length"
    >
      <div
        v-for="action in actionsListGroups.actionsWithMessagesList"
        :key="action.code"
        class="_action-with-message"
        :class="{'-blocking': action.blocking_progress}"
      >
        <span class="_message">{{ action.message }}</span>
      </div>
    </div>

    <div
      class="_available-actions"
      v-if="actionsListGroups.availableActionsList.length"
    >
      <component
        v-for="action in actionsListGroups.availableActionsList"
        :key="action.code"
        class="_available-action sf-button"
        :is="!!action.url ? 'a' : 'div'"
        :href="action.url"
        :target="action.url ? '_blank' : ''"
      >
        <span class="_action-name">{{ action.name }}</span>
      </component>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api';

import { OrderItemAvailableAction } from '../types/order-item-available-action';

interface ActionsListGroups {
  actionsWithMessagesList: OrderItemAvailableAction[],
  availableActionsList: OrderItemAvailableAction[]
}

export default defineComponent({
  name: 'OrderItemActions',
  props: {
    actionsList: {
      type: Array as PropType<OrderItemAvailableAction[]>,
      required: true
    }
  },
  setup (props) {
    const actionsListGroups = computed<ActionsListGroups>(() => {
      const actionsWithMessagesList: OrderItemAvailableAction[] = [];
      const blockingProgresssActionsList: OrderItemAvailableAction[] = [];
      const availableActionsList: OrderItemAvailableAction[] = [];

      for (const action of props.actionsList) {
        if (action.blocking_progress) {
          blockingProgresssActionsList.push(action);
          continue;
        }

        if (action.message) {
          actionsWithMessagesList.push(action);
          continue;
        }

        availableActionsList.push(action);
      }

      actionsWithMessagesList.unshift(...blockingProgresssActionsList)

      return {
        actionsWithMessagesList,
        availableActionsList
      }
    });

    return {
      actionsListGroups
    }
  }
});
</script>

<style lang="scss" scoped>
.order-item-actions {
  display: flex;
  flex-direction: column;
  row-gap: var(--spacer-sm);

  ._actions-with-messages {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: var(--spacer-xs);
  }

  ._action-with-message {
    &.-blocking {
      padding: var(--spacer-xs) var(--spacer-sm);
      background-color: var(--c-light);
    }
  }

  ._available-actions {
    display: flex;
    flex-wrap: wrap;
    row-gap: var(--spacer-xs);
    column-gap: var(--spacer-sm);
  }

  ._available-action {
    --button-font-size: var(--font-xs);
    --button-padding: var(--spacer-xs) var(--spacer-sm);

    &:hover {
      color: var(--c-white);
    }
  }
}

</style>
