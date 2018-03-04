<template>
  <div id="app">
    <overlay v-if="overlayActive"/>
    <loader/>
    <div id="viewport" class="w-100 relative">
      <microcart/>
      <search-panel/>
      <wishlist/>
      <sidebar-menu/>
      <main-header/>
      <router-view/>
      <main-footer/>
      <notification/>
      <sign-up/>
      <newsletter-popup/>
      <cookie-notification/>
      <offline-badge/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import MainHeader from './components/core/blocks/Header/Header.vue'
import MainFooter from './components/core/blocks/Footer/Footer.vue'

import Wishlist from './components/core/blocks/Wishlist/Wishlist.vue'
import Microcart from './components/core/blocks/Microcart/Microcart.vue'
import SidebarMenu from './components/core/blocks/SidebarMenu/SidebarMenu.vue'
import SearchPanel from './components/core/blocks/SearchPanel/SearchPanel.vue'

import Overlay from './components/core/Overlay.vue'
import Loader from './components/core/Loader.vue'
import Modal from './components/core/Modal.vue'
import Notification from './components/core/Notification.vue'
import SignUp from './components/core/blocks/Auth/SignUp.vue'
import NewsletterPopup from './components/core/NewsletterPopup.vue'
import CookieNotification from './components/core/CookieNotification.vue'
import OfflineBadge from './components/core/OfflineBadge.vue'

export default {
  computed: {
    ...mapState({
      overlayActive: state => state.ui.overlay
    })
  },
  mounted () {
    this.$store.dispatch('user/startSession')
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
    Microcart,
    Wishlist,
    SearchPanel,
    SidebarMenu,
    Overlay,
    Loader,
    Notification,
    Modal,
    SignUp,
    NewsletterPopup,
    CookieNotification,
    OfflineBadge
  }
}
</script>

<style lang="scss" src="./css/main.scss">
