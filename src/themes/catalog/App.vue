<template>
  <div id="app">
    <notification />
    <overlay v-if="overlayActive" />
    <wishlist />
    <main-header />
    <router-view />
    <main-footer />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import MainHeader from 'theme/components/core/blocks/Header/Header'
import MainFooter from 'theme/components/core/blocks/Footer/Footer'
import Notification from 'theme/components/core/Notification'

import Wishlist from 'theme/components/core/blocks/Wishlist/Wishlist'
import Overlay from 'theme/components/core/Overlay'

import Head from 'theme/resource/head'

export default {
  computed: {
    ...mapState({
      overlayActive: state => state.ui.overlay
    })
  },
  metaInfo: Head,
  components: {
    MainHeader,
    MainFooter,
    Notification,
    Wishlist,
    Overlay
  }
}
</script>

<style lang="scss" src="./css/main.scss">
