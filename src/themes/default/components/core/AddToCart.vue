<template>
  <button-full @click.native="addToCart(product)" :disabled="product.errors && Object.keys(product.errors).length > 0">
    {{ $t('Add to cart') }}
  </button-full>
</template>

<script>
import { coreComponent } from 'core/lib/themes'
import focusClean from 'theme/components/theme/directives/focusClean'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'

export default {
  mixins: [coreComponent('AddToCart')],
  directives: { focusClean },
  components: { ButtonFull }
}
</script>
