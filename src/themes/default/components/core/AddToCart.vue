<template>
  <!-- Add to cart button example with addToCart action from cart store -->
  <button
    type="button"
    class="ripple"
    @click="addToCart(product)"
    v-focus-clean="{ class: 'no-outline' }"
  >
    {{ $t('Add to cart') }}
  </button>
</template>

<script>
import { coreComponent } from 'lib/themes'
import focusClean from 'theme/components/theme/directives/focusClean'

export default {
  mixins: [coreComponent('core/AddToCart')],
  directives: { focusClean }
}
</script>
