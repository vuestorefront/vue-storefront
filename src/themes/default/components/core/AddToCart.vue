<template>
  <button-full @click.native="addToCart(product)" :disabled="canBeAdded(product)" data-testid="addToCart">
    {{ $t('Add to cart') }}
  </button-full>
</template>

<script>
import focusClean from 'theme/components/theme/directives/focusClean'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import addToCart from 'core/components/addToCart'
import { formatProductMessages } from 'core/filters/product-messages'

export default {
  mixins: [addToCart],
  directives: { focusClean },
  components: { ButtonFull },
  methods: {
    canBeAdded (product) {
      return formatProductMessages(product.errors) !== ''
    }
  }
}
</script>
