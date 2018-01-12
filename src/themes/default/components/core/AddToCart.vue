<template>
  <!-- Add to cart button example with addToCart action from cart store-->
  <button  class="ripple" v-on:click="addToCart(product)" v-focus-clean="{class: 'no-outline'}">Add to cart</button>
</template>
<script>
import { coreComponent } from 'lib/themes'
import focusClean from 'theme/components/theme/directives/focusClean'
export default {
  mixins: [coreComponent('core/AddToCart')],
  directives: { focusClean }
}
</script>

<style scoped>
  button {
    cursor: pointer;
  }
</style>
