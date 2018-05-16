<template>
  <button-full @click.native="addToCart(product)">
    {{ $t('Add to cart') }}
  </button-full>
</template>

<script>
import AddToCart from 'core/components/AddToCart'
import focusClean from 'theme/components/theme/directives/focusClean'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'

export default {
  mixins: [AddToCart],
  directives: { focusClean },
  components: { ButtonFull }
}
</script>
