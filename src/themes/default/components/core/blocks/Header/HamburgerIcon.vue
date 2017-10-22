<template>
    <div class="hamburger-icon box" @click="toggleSidebarMenu">
        <i class="material-icons md-18">dehaze</i>
    </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/blocks/Header/HamburgerIcon')]
}
</script>

<style scoped>
    .hamburger-icon {
      display: inline-flex;
    }
</style>
