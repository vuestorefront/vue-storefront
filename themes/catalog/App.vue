<template>
  <div id="app">
    <notification />
    <overlay />
    <wishlist />
    <main-header />
    <router-view />    
    <main-footer />
  </div>
</template>

<script>
import MainHeader from 'theme/components/core/blocks/Header/Header'
import MainFooter from 'theme/components/core/blocks/Footer/Footer'
import Notification from 'theme/components/core/Notification'

import Wishlist from 'theme/components/core/blocks/Wishlist/Wishlist'
import Overlay from 'theme/components/core/Overlay'

export default {
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

