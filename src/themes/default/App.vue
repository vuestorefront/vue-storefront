<template>
  <div id="app" :class="{ 'no-scroll': scroll }">
    <div id="viewport">
      <overlay />
      <microcart />
      <sidebar-menu />
      <main-header />
      <router-view></router-view>
      <main-footer />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import MainHeader from './components/core/blocks/Header/Header.vue'
import MainFooter from './components/core/blocks/Footer/Footer.vue'

import Microcart from './components/core/blocks/Microcart/Microcart.vue'
import SidebarMenu from './components/core/blocks/SidebarMenu/SidebarMenu.vue'

import Overlay from './components/core/Overlay.vue'

export default {
  computed: {
    ...mapState({
      scroll: state => state.ui.overlay
    })
  },
  components: {
    MainHeader,
    MainFooter,
    Microcart,
    SidebarMenu,
    Overlay
  }
}
</script>

<!-- Atomic styles & grid -->
<style src="./css/grid.css"></style>
<style src="./css/color.css"></style>
<style src="./css/margin.scss" lang="scss"></style>
<style src="./css/transitions.scss" lang="scss"></style>
<style src="./css/padding.css"></style>
<style src="./css/text.css"></style>
<style src="./css/border.css"></style>
<style src="./css/layout.scss" lang="scss"></style>
<style src="./css/visibility.scss" lang="scss"></style>

<style>
html,
body {
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
#app.no-scroll {
  height: 100%;
  overflow: hidden;
}
#viewport {
  width: 100%;
  position: relative;
  overflow-x: hidden;
}
</style>
