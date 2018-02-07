<template>
  <div class="hamburger-icon">
    <!--
        methods:
        openSidebarMenu - opens sidebar menu
    -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HamburgerIcon',
  computed: mapState({
    isOpen: state => state.ui.sidebar
  }),
  methods: {
    openSidebarMenu () {
      this.$store.commit('ui/setSidebar', !this.isOpen)
    }
  }
}
</script>
