<template>
  <div class="order-item-extended-info">
    <cart-item-configuration
      :customizations="customizations"
      :customization-state="customizationState"
    />
  </div>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from '@vue/composition-api';

import { CartItemConfiguration, CustomizationStateItem, Customization } from 'src/modules/customization-system';

import { OrderItemExtensionAttributes } from '../types/order-item-extension-attributes';

export default defineComponent({
  name: 'OrderItemExtendedInfo',
  components: {
    CartItemConfiguration
  },
  props: {
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
