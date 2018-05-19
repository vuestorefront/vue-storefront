<template>
  <button
    type="button"
    :aria-label="$t('Open search panel')"
    class="bg-cl-transparent brdr-none inline-flex"
    @click="toggleSearchpanel"
  >
    <i class="material-icons">search</i>
  </button>
</template>

<script>
import searchIcon from 'core/components/blocks/Header/searchIcon'

export default {
  mixins: [searchIcon]
}
</script>
