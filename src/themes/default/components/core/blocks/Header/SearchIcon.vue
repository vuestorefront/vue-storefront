<template>
  <button
    type="button"
    class="search-icon bg-cl-transparent brdr-none inline-flex"
    @click="toggleSearchpanel"
  >
    <i class="material-icons md-18">search</i>
  </button>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

export default {
  mixins: [coreComponent('blocks/Header/SearchIcon')]
}
</script>
