<template>
  <div id="app" :class="{ noScroll: !scroll }">
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
import EventBus from 'src/event-bus/event-bus'

import MainHeader from './components/core/blocks/Header/Header.vue'
import MainFooter from './components/core/blocks/Footer/Footer.vue'

import Microcart from './components/core/blocks/Microcart/Microcart.vue'
import SidebarMenu from './components/core/blocks/SidebarMenu/SidebarMenu.vue'

import Overlay from './components/core/Overlay.vue'

export default {
  data () {
    return {
      scroll: true
    }
  },
  created () {
    EventBus.$on('toggle-overlay', () => {
      this.scroll = !this.scroll
    })
    EventBus.$on('hide-overlay', () => {
      this.scroll = true
    })
  },
  components: {
    MainHeader,
    MainFooter,
    Microcart,
    SidebarMenu,
    Overlay,
    EventBus
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
#app.noScroll {
  height: 100%;
  overflow: hidden;
}
#viewport {
  width: 100%;
  position: relative;
  overflow-x: hidden;
}
</style>
