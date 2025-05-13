<template>
  <div class="order-item-actions">
    <div
      class="_actions-with-messages"
      v-if="actionsListGroups.blockingActionsList.length"
    >
      <div
        v-for="action in actionsListGroups.blockingActionsList"
        :key="action.code + ';' + action.name"
        class="_action-with-message"
        :class="{'-blocking': action.blocking_progress}"
      >
        <span class="_message">{{ action.message }}</span>
      </div>
    </div>

    <div
      class="_available-actions"
      v-if="actionsListGroups.nonBlockingActionsList.length"
    >
      <component
        v-for="actionItem in actionsListGroups.nonBlockingActionsList"
        :key="actionItem.action.code + ';' + actionItem.action.name"
        class="_available-action sf-button"
        :is="actionItem.component"
        :disabled="disabledItems[actionItem.action.code]"
        v-bind="actionItem.props"
        v-on="actionItem.handlers"
      >
        <span class="_action-name">{{ actionItem.action.name }}</span>
      </component>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api';
import { SfButton } from '@storefront-ui/vue';

import { IS_CART_SYNCING } from '@vue-storefront/core/modules/cart';

import { OrderItemAvailableAction } from '../types/order-item-available-action';
import { OrderItemAvailableActionCode } from '../types/order-item-available-action.code';
import { REORDER_ITEM_ACTION, IS_REORDERING_ITEM } from '..';

interface ActionItem {
  action: OrderItemAvailableAction,
  component: string,
  props: Record<string, string | undefined>,
  handlers: Record<string, () => Promise<void>>
}

interface ActionsListGroups {
  blockingActionsList: OrderItemAvailableAction[],
  nonBlockingActionsList: ActionItem[]
}

export default defineComponent({
  name: 'OrderItemActions',
  components: {
    SfButton
  },
  props: {
    orderItemId: {
      type: Number,
      required: true
    },
    actionsList: {
      type: Array as PropType<OrderItemAvailableAction[]>,
      required: true
    }
  },
  setup (props, { root }) {
    const disabledItems = computed<Record<string, boolean>>(() => {
      const items: Record<string, boolean> = {};

      items[OrderItemAvailableActionCode.RE_ORDER] = root.$store.getters[IS_CART_SYNCING] || root.$store.getters[IS_REORDERING_ITEM];

      return items;
    });

    async function onReorderActionClick (): Promise<void> {
      if (disabledItems.value[OrderItemAvailableActionCode.RE_ORDER]) {
        return;
      }

      try {
        await root.$store.dispatch(
          REORDER_ITEM_ACTION,
          { orderItemId: props.orderItemId }
        );
      } catch (_) {
        root.$store.dispatch('notification/spawnNotification', {
          type: 'danger',
          message: root.$t('Failed to reorder item'),
          action1: { label: root.$t('OK') }
        });
      }
    }

    const actionsListGroups = computed<ActionsListGroups>(() => {
      const blockingActionsList: OrderItemAvailableAction[] = [];
      const nonBlockingActionsList: ActionItem[] = [];

      for (const action of props.actionsList) {
        if (action.blocking_progress) {
          blockingActionsList.push(action);
          continue;
        }

        const actionItem: ActionItem = {
          action,
          component: 'SfButton',
          props: {},
          handlers: {}
        };

        if (action.code === OrderItemAvailableActionCode.RE_ORDER) {
          actionItem.handlers.click = onReorderActionClick;
          nonBlockingActionsList.push(actionItem);
          continue;
        }

        if (action.url) {
          actionItem.component = 'a';
          actionItem.props = {
            href: action.url,
            target: '_blank'
          }
        }

        nonBlockingActionsList.push(actionItem);
      }

      return {
        blockingActionsList,
        nonBlockingActionsList
      }
    });

    return {
      actionsListGroups,
      disabledItems
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
