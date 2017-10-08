<template>
  <div id="app">
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
import MainHeader from './components/core/blocks/Header/Header.vue'
import MainFooter from './components/core/blocks/Footer/Footer.vue'

import Microcart from './components/core/blocks/Microcart/Microcart.vue'
import SidebarMenu from './components/core/blocks/SidebarMenu/SidebarMenu.vue'

import Overlay from './components/core/Overlay.vue'

export default {
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
<style src="./css/padding.css"></style>
<style src="./css/text.css"></style>
<style src="./css/border.css"></style>
<style src="./css/layout.css"></style>

<style>
body {
  margin: 0;
  padding: 0;
}
a {
  color: 
}
#viewport {
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}
</style>