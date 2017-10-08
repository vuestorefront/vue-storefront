<template>
    <div class="hamburger-icon box" @click="toggleSidebarMenu">
        <i class="material-icons md-18">dehaze</i>
    </div>
</template>

<script>
import { coreComponent } from 'lib/themes'
import EventBus from 'src/event-bus/event-bus'

export default {
  methods: {
    toggleSidebarMenu () {
      EventBus.$emit('toggle-sidebar-menu')
      EventBus.$emit('toggle-overlay')
    }
  },
  mixins: [coreComponent('core/blocks/Header/HamburgerIcon')]
}
</script>

<style scoped>
    .hamburger-icon {
      display: inline-flex;
    }
</style>
