<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import Vue from 'vue'
import Head from 'src/themes/capybara/head'

const DefaultLayout = () => import(/* webpackChunkName: "vsf-layout-default" */ './layouts/Default')

export default {
  metaInfo: Head,
  computed: {
    layout () {
      return `${(this.$route.meta.layout || 'default')}-layout`
    }
  },
  components: {
    DefaultLayout
  }
}
</script>
