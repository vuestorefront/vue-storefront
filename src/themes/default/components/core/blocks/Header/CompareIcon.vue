<template>
  <router-link to="/compare" class="compare-icon no-underline inline-flex" v-if="isActive">
    <i class="material-icons">compare</i>
  </router-link>
</template>

<script>
import compareIcon from 'core/components/blocks/Header/compareIcon'

export default {
  mixins: [compareIcon]
}
</script>
