<template>
  <button class="brdr-none bg-cl-th-transparent">
    {{ $t('Remove') }}
    <i class="material-icons h6">remove_shopping_cart</i>
  </button>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

export default {
  mixins: [coreComponent('blocks/Wishlist/RemoveButton')]
}
</script>
