<template>
  <div class="order-item-actions">
    <div
      class="_actions-with-messages"
      v-if="actionsListGroups.actionsWithMessagesList.length"
    >
      <div
        v-for="action in actionsListGroups.actionsWithMessagesList"
        :key="action.code + ';' + action.name"
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
        v-for="actionItem in actionsListGroups.availableActionsList"
        :key="actionItem.action.code + ';' + actionItem.action.name"
        class="_available-action sf-button"
        :is="actionItem.component"
        v-bind="actionItem.props"
      >
        <span class="_action-name">{{ actionItem.action.name }}</span>
      </component>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api';
import { SfButton } from '@storefront-ui/vue';

import { OrderItemAvailableAction } from '../types/order-item-available-action';

interface ActionItem {
  action: OrderItemAvailableAction,
  component: string,
  props: Record<string, string | undefined>
}

interface ActionsListGroups {
  actionsWithMessagesList: OrderItemAvailableAction[],
  availableActionsList: ActionItem[]
}

export default defineComponent({
  name: 'OrderItemActions',
  components: {
    SfButton
  },
  props: {
    actionsList: {
      type: Array as PropType<OrderItemAvailableAction[]>,
      required: true
    }
  },
  setup (props) {
    const actionsListGroups = computed<ActionsListGroups>(() => {
      const actionsWithMessagesList: OrderItemAvailableAction[] = [];
      const availableActionsList: ActionItem[] = [];

      for (const action of props.actionsList) {
        if (action.blocking_progress) {
          actionsWithMessagesList.push(action);
          continue;
        }

        const actionItem: ActionItem = {
          action,
          component: 'SfButton',
          props: {}
        };

        if (action.url) {
          actionItem.component = 'a';
          actionItem.props = {
            href: action.url,
            target: '_blank'
          }
        }

        availableActionsList.push(actionItem);
      }

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
      background-color: var(--c-warning);
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
