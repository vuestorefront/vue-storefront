<template>
  <button class="brdr-none bg-transparent">
    Remove <i class="material-icons h6">remove_shopping_cart</i>
  </button>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/blocks/Wishlist/RemoveButton')]
}
</script>

<style scoped>
  button:hover {
    cursor: pointer;
  }
</style>
