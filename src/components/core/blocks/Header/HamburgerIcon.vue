<template>
  <div class="hamburger-icon" @click="toggleSidebarMenu">
    Core Hamburger
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'hamburger-icon',
  computed: mapState({
    isOpen: state => state.ui.sidebar
  }),
  methods: {
    toggleSidebarMenu () {
      this.$store.commit('ui/setSidebar', !this.isOpen)
    }
  }
}
</script>
