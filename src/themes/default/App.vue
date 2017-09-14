<template>
  <div id="app">
    <div id="viewport">
      <microcart />
      <div class="container">
        <main-header />
        <router-view></router-view>
        <main-footer />
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from './components/core/blocks/Header/Header.vue'
import MainFooter from './components/core/blocks/Footer/Footer.vue'

import Microcart from './components/core/blocks/Microcart/Microcart.vue'

export default {
  components: {
    MainHeader,
    MainFooter,
    Microcart
  }
}
</script>
<style src="./css/grid.css"></style>
<style src="./css/margin.css"></style>
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