<template>
  <button class="brdr-none bg-cl-transparent">
    {{ $t('Remove') }}
    <i class="material-icons h6">remove_shopping_cart</i>
  </button>
</template>

<script>
import removeButton from 'core/components/blocks/Wishlist/removeButton'

export default {
  mixins: [removeButton]
}
</script>
