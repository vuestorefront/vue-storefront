<template>
  <button
    type="button"
    class="bg-cl-transparent brdr-none inline-flex"
    @click="openSidebarMenu"
    :aria-label="$t('Open menu')"
  >
    <i class="material-icons">dehaze</i>
  </button>
</template>

<script>
import hamburgerIcon from 'core/components/blocks/Header/HamburgerIcon'

export default {
  mixins: [hamburgerIcon]
}
</script>
