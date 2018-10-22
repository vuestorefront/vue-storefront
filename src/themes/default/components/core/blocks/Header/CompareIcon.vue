<template>
  <router-link :to="localizedRoute('/compare')" class="compare-icon no-underline inline-flex" v-if="isActive">
    <i class="material-icons">compare</i>
  </router-link>
</template>

<script>
import CompareIcon from '@vue-storefront/core/components/blocks/Header/CompareIcon'

export default {
  mixins: [CompareIcon]
}
</script>
