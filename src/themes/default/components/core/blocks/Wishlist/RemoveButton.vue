<template>
  <button class="brdr-none bg-transparent">
    {{ $t('Remove') }}
    <i class="material-icons h6">remove_shopping_cart</i>
  </button>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('blocks/Wishlist/RemoveButton')]
}
</script>
