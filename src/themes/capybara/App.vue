<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import Head from 'src/themes/capybara/head'

export default {
  metaInfo: Head
}
</script>

<style lang="scss">
@import "~@storefrontui/vue/src/css/all";

</style>
