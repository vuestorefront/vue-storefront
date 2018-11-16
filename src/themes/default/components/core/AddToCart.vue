<template>
  <button-full @click.native="addToCart(product)" :disabled="canBeAdded(product)" data-testid="addToCart">
    {{ $t('Add to cart') }}
  </button-full>
</template>

<script lang="ts">
import Product from '@vue-storefront/core/modules/catalog/types/Product'
import { formatProductMessages } from '@vue-storefront/core/filters/product-messages/typed'
import focusClean from 'theme/components/theme/directives/focusClean'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import { AddToCart } from '@vue-storefront/core/modules/cart/components/AddToCart'

export default {
  mixins: [AddToCart],
  directives: { focusClean },
  components: { ButtonFull },
  methods: {
    onAfterRemovedVariant () {
      this.$forceUpdate()
    },
    canBeAdded (product: Product): boolean {
      return formatProductMessages(product.errors) !== ''
    }
  },
  beforeMount () {
    this.$bus.$on('product-after-removevariant', this.onAfterRemovedVariant)
  },
  beforeDestroy () {
    this.$bus.$off('product-after-removevariant')
  }
}
</script>
