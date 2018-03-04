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

export default {
  computed: {
    ...mapState({
      overlayActive: state => state.ui.overlay
    })
  },
  metaInfo: {
    title: 'Vue Storefront',
    titleTemplate: '%s  - Vue Storefront',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { description: 'Vue Storefront is a standalone PWA storefront for your eCommerce, possible to connect with any eCommerce backend (eg. Magento, Prestashop or Shopware) through the API.' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, minimal-ui' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'theme-color', content: '#f60' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
    ]
  },
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
