<template>
  <div id="app">
    <div id="viewport">
      <overlay />
      <microcart />
      <sidebar-menu />
      <div class="container">
        <main-header />
      </div>
      <div class="container">
        <router-view></router-view>
      </div>
      <div class="container">
        <main-footer />
      </div>
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

<style src="./css/grid.css"></style>
<style src="./css/margin.css"></style>
<style src="./css/padding.css"></style>

<style>
body {
  margin: 0;
  padding: 0;
}
#viewport {
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}
</style>