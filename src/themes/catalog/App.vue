<template>
  <div id="app">
    <main-header />
    <router-view></router-view>
  </div>
</template>

<script>
import MainHeader from 'theme/components/core/blocks/Header/Header'
export default {
  components: {
    MainHeader
  }
}
</script>

<style lang="scss" src="./css/main.scss">

