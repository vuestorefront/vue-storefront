<template>
  <div class="order-item-actions">
    <div
      class="_actions-with-messages"
      v-if="actionsListGroups.blockingActionsList.length"
    >
      <div
        v-for="actionItem in actionsListGroups.blockingActionsList"
        :key="actionItem.action.code + ';' + actionItem.action.name"
        class="_action-with-message-container"
        :class="{'-blocking': actionItem.action.blocking_progress}"
      >
        <span class="_action-with-message">{{ actionItem.action.message }}</span>

        <component
          :is="actionItem.component"
          :disabled="disabledItems[actionItem.action.code]"
          class="_available-action sf-button color-secondary"
          v-bind="actionItem.props"
          v-on="actionItem.handlers"
          v-if="actionItem.component"
        >
          <span class="_action-name">
            {{ actionItem.action.name }}
          </span>
        </component>
      </div>
    </div>

    <div
      class="_available-actions"
      v-if="actionsListGroups.nonBlockingActionsList.length"
    >
      <component
        v-for="actionItem in actionsListGroups.nonBlockingActionsList"
        :key="actionItem.action.code + ';' + actionItem.action.name"
        class="_available-action sf-button color-secondary"
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

import { OrderItem } from '../types/order-item';
import { OrderItemAvailableAction } from '../types/order-item-available-action';
import { OrderItemAvailableActionCode } from '../types/order-item-available-action.code';
import { REORDER_ITEM_ACTION, IS_REORDERING_ITEM } from '..';

interface ActionItem {
  action: OrderItemAvailableAction,
  component?: 'SfButton' | 'a',
  props: Record<string, string | undefined>,
  handlers: Record<string, () => Promise<void>>
}

interface ActionsListGroups {
  blockingActionsList: ActionItem[],
  nonBlockingActionsList: ActionItem[]
}

export default defineComponent({
  name: 'OrderItemActions',
  components: {
    SfButton
  },
  props: {
    orderItem: {
      type: Object as PropType<OrderItem>,
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

    async function onCustomizeOrderItemActionClick (): Promise<void> {
      root.$router.push({
        name: 'forevers-customize',
        query: {
          orderItemId: props.orderItem.item_id.toString(),
          sku: props.orderItem.product.sku
        }
      });
    }

    async function onReorderActionClick (): Promise<void> {
      if (disabledItems.value[OrderItemAvailableActionCode.RE_ORDER]) {
        return;
      }

      try {
        await root.$store.dispatch(
          REORDER_ITEM_ACTION,
          { orderItemId: props.orderItem.item_id }
        );

        root.$store.dispatch('notification/spawnNotification', {
          type: 'success',
          message: root.$t('Product has been added to the cart!'),
          action1: { label: root.$t('OK') }
        });
      } catch (error) {
        root.$store.dispatch('notification/spawnNotification', {
          type: 'danger',
          message: error.message,
          action1: { label: root.$t('OK') }
        });
      }
    }

    const actionsListGroups = computed<ActionsListGroups>(() => {
      const blockingActionsList: ActionItem[] = [];
      const nonBlockingActionsList: ActionItem[] = [];

      for (const action of props.actionsList) {
        const actionItem: ActionItem = {
          action,
          component: undefined,
          props: {},
          handlers: {}
        };

        if (action.code === OrderItemAvailableActionCode.RE_ORDER) {
          actionItem.handlers.click = onReorderActionClick;
          actionItem.component = 'SfButton';
          nonBlockingActionsList.push(actionItem);
          continue;
        }

        if (action.code === OrderItemAvailableActionCode.AWAITING_CUSTOMIZATION) {
          if (props.orderItem.extension_attributes?.support_bulk_customization) {
            continue;
          }

          actionItem.handlers.click = onCustomizeOrderItemActionClick;
          actionItem.component = 'SfButton';
          blockingActionsList.push(actionItem);
          continue;
        }

        if (action.url) {
          actionItem.component = 'a';
          actionItem.props = {
            href: action.url,
            target: '_blank'
          }
        }

        if (action.blocking_progress) {
          blockingActionsList.push(actionItem);
          continue;
        }

        if (!actionItem.component) {
          continue;
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
  row-gap: var(--spacer-xs);

  ._actions-with-messages {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: var(--spacer-xs);
  }

  ._action-with-message-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: var(--spacer-xs);

    &.-blocking {
      ._action-with-message {
        padding: var(--spacer-xs) var(--spacer-sm);
        background-color: var(--c-warning);
        color: var(--c-white);
      }
    }
  }

  ._available-actions {
    display: flex;
    flex-wrap: wrap;
    row-gap: var(--spacer-xs);
    column-gap: var(--spacer-xs);
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
