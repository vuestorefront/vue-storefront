<template>
  <div class="order-item-extended-info">
    <div class="_heading-container">
      <SfHeading class="_heading" :title="$t('Item details')" :level="5" />
    </div>

    <div class="_quantity">
      {{ $t('Quantity') + ': ' + item.quantity }}
    </div>

    <cart-item-configuration
      :customizations="customizations"
      :customization-state="customizationState"
    />
  </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from '@vue/composition-api';
import { SfHeading } from '@storefront-ui/vue';

import { CartItemConfiguration, CustomizationStateItem, Customization } from 'src/modules/customization-system';

import { OrderItemExtensionAttributes } from '../types/order-item-extension-attributes';
import { OrderItem } from '../types/order-item';

export default defineComponent({
  name: 'OrderItemExtendedInfo',
  components: {
    CartItemConfiguration,
    SfHeading
  },
  props: {
    item: {
      type: Object as PropType<OrderItem>,
      required: true
    },
    extensionAttributes: {
      type: Object as PropType<OrderItemExtensionAttributes>,
      required: true
    }
  },
  setup (props) {
    const customizationState = computed<CustomizationStateItem[]>(() => {
      return props.extensionAttributes.customization_states;
    });

    const customizations = computed<Customization[]>(() => {
      return props.extensionAttributes.customizations;
    });

    return {
      customizations,
      customizationState
    }
  }
})

</script>

<style lang="scss" scoped>
.order-item-extended-info {
  ._heading-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  ._heading {
    --heading-padding: 0;
    --heading-title-font-size: var(--font-size-base);
    text-align: start;
  }

  ._quantity {
    margin-top: var(--spacer-xs);
  }

  .cart-item-configuration {
    --cart-item-configuration-font-size: var(--font-size-base);
  }
}
</style>
