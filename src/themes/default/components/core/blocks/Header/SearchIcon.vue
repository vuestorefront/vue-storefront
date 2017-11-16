<template>
  <div class="search-icon inline-flex" @click="toggleSearchpanel">
    <i class="material-icons md-18">search</i>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/blocks/Header/SearchIcon')]
}
</script>

<style lang="scss" scoped>
  
</style>