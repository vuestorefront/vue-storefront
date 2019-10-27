<template>
  <component
    v-if="component"
    :is="component"
    :productOptions="productOptions"
    @input="(currentOptions) => $emit('input', currentOptions)"
  />
</template>

<script>
import { computed, ref, watch } from '@vue/composition-api'
import ConfigurableProductDetails from './ConfigurableProductDetails'
import BundleProductDetails from './BundleProductDetails'

export default {
  props: {
    productOptions: Array,
    productType: String,
  },
  setup({ productType }, { emit }) {
    const component = computed(() => {
      if (productType === 'configurable') {
        return 'ConfigurableProductDetails'
      }

      if (productType === 'bundle') {
        return 'BundleProductDetails'
      }

      return null
    })

    return {
      component
    }
  },
  components: {
    ConfigurableProductDetails,
    BundleProductDetails
  }
}

</script>
