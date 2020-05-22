<template>
  <div class="default-layout">
    <overlay v-if="overlayActive" />
    <loader />
    <div id="viewport" class="w-100 relative">
      <main-header />
      <async-sidebar
        :async-component="SearchPanel"
        :is-open="isSearchPanelOpen"
        @close="$store.commit('ui/setSearchpanel')"
      />
      <async-sidebar
        :async-component="Microcart"
        :is-open="isMicrocartOpen"
        @close="$store.commit('ui/setMicrocart')"
      />
      <async-sidebar
        :async-component="SidebarMenu"
        :is-open="isSidebarOpen"
        @close="$store.commit('ui/setSidebar')"
        direction="left"
      />
      <async-sidebar
        :async-component="Wishlist"
        :is-open="isWishlistOpen"
        @close="$store.commit('ui/setWishlist')"
      />
      <slot />
      <main-footer />
      <notification />
      <sign-up />
      <cookie-notification />
      <offline-badge />
      <order-confirmation :orders-data="ordersData" v-if="loadOrderConfirmation" />
    </div>
    <vue-progress-bar />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AsyncSidebar from 'theme/components/theme/blocks/AsyncSidebar/AsyncSidebar.vue'
import MainHeader from 'theme/components/core/blocks/Header/Header.vue'
import MainFooter from 'theme/components/core/blocks/Footer/Footer.vue'
import Overlay from 'theme/components/core/Overlay.vue'
import Loader from 'theme/components/core/Loader.vue'
import Notification from 'theme/components/core/Notification.vue'
import SignUp from 'theme/components/core/blocks/Auth/SignUp.vue'
import CookieNotification from 'theme/components/core/CookieNotification.vue'
import OfflineBadge from 'theme/components/core/OfflineBadge.vue'
import { isServer } from '@vue-storefront/core/helpers'
import Head from 'theme/head'
import config from 'config'

const SidebarMenu = () => import(/* webpackPreload: true */ /* webpackChunkName: "vsf-sidebar-menu" */ 'theme/components/core/blocks/SidebarMenu/SidebarMenu.vue')
const Microcart = () => import(/* webpackPreload: true */ /* webpackChunkName: "vsf-microcart" */ 'theme/components/core/blocks/Microcart/Microcart.vue')
const Wishlist = () => import(/* webpackPreload: true */ /* webpackChunkName: "vsf-wishlist" */ 'theme/components/core/blocks/Wishlist/Wishlist.vue')
const SearchPanel = () => import(/* webpackChunkName: "vsf-search-panel" */ 'theme/components/core/blocks/SearchPanel/SearchPanel.vue')
const OrderConfirmation = () => import(/* webpackChunkName: "vsf-order-confirmation" */ 'theme/components/core/blocks/Checkout/OrderConfirmation.vue')

export default {
  data () {
    return {
      loadOrderConfirmation: false,
      ordersData: [],
      Microcart,
      Wishlist,
      SearchPanel,
      SidebarMenu
    }
  },
  computed: {
    ...mapState({
      overlayActive: state => state.ui.overlay,
      isSearchPanelOpen: state => state.ui.searchpanel,
      isSidebarOpen: state => state.ui.sidebar,
      isMicrocartOpen: state => state.ui.microcart,
      isWishlistOpen: state => state.ui.wishlist
    })
  },
  methods: {
    onOrderConfirmation (payload) {
      this.loadOrderConfirmation = true
      this.ordersData = payload
      this.$bus.$emit('modal-show', 'modal-order-confirmation')
    },
    fetchMenuData () {
      return this.$store.dispatch('category-next/fetchMenuCategories', {
        level: config.entities.category.categoriesDynamicPrefetch && config.entities.category.categoriesDynamicPrefetchLevel >= 0
          ? config.entities.category.categoriesDynamicPrefetchLevel
          : null,
        skipCache: isServer
      })
    }
  },
  serverPrefetch () {
    return this.fetchMenuData()
  },
  beforeMount () {
    // Progress bar on top of the page
    this.$router.beforeEach((to, from, next) => {
      this.$Progress.start()
      this.$Progress.increase(40)
      next()
    })
    this.$router.afterEach((to, from) => {
      this.$Progress.finish()
    })
    this.$bus.$on('offline-order-confirmation', this.onOrderConfirmation)
  },
  beforeDestroy () {
    this.$bus.$off('offline-order-confirmation', this.onOrderConfirmation)
  },
  metaInfo: Head,
  components: {
    MainHeader,
    MainFooter,
    SidebarMenu, // eslint-disable-line vue/no-unused-components
    Overlay,
    Loader,
    Notification,
    SignUp,
    CookieNotification,
    OfflineBadge,
    OrderConfirmation,
    AsyncSidebar
  }
}
</script>

<style lang="scss" src="theme/css/main.scss"></style>
