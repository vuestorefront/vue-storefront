<template>
  <button
    @click="isToCompare ? removeFromCompare(product) : addToCompare(product)"
    class="p0 inline-flex middle-xs bg-cl-transparent brdr-none action h5 pointer cl-secondary"
    type="button"
    data-testid="addToCompare"
  >
    <slot>
      <i class="pr5 material-icons">compare</i>
      <template v-if="!isToCompare">
        {{ $t('Add to compare') }}
      </template>
      <template v-else>
        {{ $t('Remove from compare') }}
      </template>
    </slot>
  </button>
</template>

<script>
import { IsToCompare } from '@vue-storefront/core/modules/compare/components/IsToCompare'
import { AddToCompare } from '@vue-storefront/core/modules/compare/components/AddToCompare'
import { RemoveFromCompare } from '@vue-storefront/core/modules/compare/components/RemoveFromCompare'

export default {
  mixins: [IsToCompare, AddToCompare, RemoveFromCompare]
}
</script>
