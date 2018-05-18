<template>
  <button-full @click.native="addToCart(product)" :disabled="canBeAdded(product)">
    {{ $t('Add to cart') }}
  </button-full>
</template>

<script>
import { coreComponent } from 'core/lib/themes'
import focusClean from 'theme/components/theme/directives/focusClean'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import { formatProductMessages } from 'core/filters/product-messages'

export default {
  mixins: [coreComponent('AddToCart')],
  directives: { focusClean },
  components: { ButtonFull },
  methods: {
    canBeAdded (product) {
      return formatProductMessages(product.errors) !== ''
    }
  }
}
</script>
