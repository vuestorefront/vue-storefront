<template>
  <button-full @click.native="addToCart(product)">
    {{ $t('Add to cart') }}
  </button-full>
</template>

<script>
import { coreComponent } from 'lib/themes'
import focusClean from 'theme/components/theme/directives/focusClean'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'

export default {
  mixins: [coreComponent('AddToCart')],
  directives: { focusClean },
  components: { ButtonFull }
}
</script>
