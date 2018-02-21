<template>
  <div class="hamburger-icon inline-flex" @click="openSidebarMenu">
    <i class="material-icons md-18">dehaze</i>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('blocks/Header/HamburgerIcon')]
}
</script>
