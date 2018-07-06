<template>
  <button
    type="button"
    :aria-label="$t('Open search panel')"
    class="bg-cl-transparent brdr-none inline-flex"
    @click="toggleSearchpanel"
    data-testid="openSearchPanelButton"
  >
    <i class="material-icons">search</i>
  </button>
</template>

<script>
import SearchIcon from 'core/components/blocks/Header/SearchIcon'

export default {
  mixins: [SearchIcon]
}
</script>
