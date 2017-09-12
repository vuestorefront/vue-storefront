<template>
  <div id="app">
     <main-header />
     <router-view></router-view>
     <main-footer />
  </div>
</template>

<script>
import MainHeader from './components/core/blocks/Header/Header.vue'
import MainFooter from './components/core/blocks/Footer/Footer.vue'

export default {
  components: {
    MainHeader,
    MainFooter
  }
}
</script>

<style src="./css/grid.css"></style>
