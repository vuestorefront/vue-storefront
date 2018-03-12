<template>
  <button
    type="button"
    class="bg-cl-transparent brdr-none inline-flex"
    @click="openSidebarMenu"
    :aria-label="$t('Open menu')"
  >
    <i class="material-icons md-18">dehaze</i>
  </button>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

export default {
  mixins: [coreComponent('blocks/Header/HamburgerIcon')]
}
</script>
