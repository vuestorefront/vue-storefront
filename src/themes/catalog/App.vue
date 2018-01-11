<template>
  <div id="app">
    <main-header />
    <router-view />
    <main-footer />
  </div>
</template>

<script>
import MainHeader from 'theme/components/core/blocks/Header/Header'
import MainFooter from 'theme/components/core/blocks/Footer/Footer'
export default {
  components: {
    MainHeader,
    MainFooter
  }
}
</script>

<style lang="scss" src="./css/main.scss">

