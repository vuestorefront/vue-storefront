<template>
  <div class="search-icon inline-flex" @click="toggleSearchpanel">
    <i class="material-icons md-18">search</i>
  </div>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

export default {
  mixins: [coreComponent('blocks/Header/SearchIcon')]
}
</script>
