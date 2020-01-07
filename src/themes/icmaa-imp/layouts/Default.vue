<template>
  <div class="default-layout">
    <overlay v-if="overlayActive" />
    <loader />
    <div id="viewport" class="w-100 relative">
      <main-header />
      <no-ssr>
        <advice tags="2" />
      </no-ssr>
      <async-sidebar
        :async-component="SearchPanel"
        :is-open="isSearchPanelOpen"
        :wide="true"
        @close="$store.dispatch('ui/setSearchpanel')"
      />
      <async-sidebar
        :async-component="Microcart"
        :is-open="isMicrocartOpen"
        @close="$store.dispatch('ui/setMicrocart')"
      />
      <async-sidebar
        :async-component="SidebarMenu"
        :is-open="isSidebarOpen"
        @close="$store.dispatch('ui/setSidebar')"
        direction="left"
      />
      <async-sidebar
        :async-component="Wishlist"
        :is-open="isWishlistOpen"
        @close="$store.dispatch('ui/setWishlist')"
      />
      <main class="t-bg-base-lightest">
        <div class="t-clearfix" />
        <slot />
        <div class="t-clearfix" />
      </main>
      <main-footer />
      <notifications />
      <sign-up />
      <cookie-notification />
      <offline-badge />
      <order-confirmation :orders-data="ordersData" v-if="loadOrderConfirmation" />
    </div>
    <vue-progress-bar />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import AsyncSidebar from 'theme/components/theme/blocks/AsyncSidebar/AsyncSidebar'
import MainHeader from 'theme/components/core/blocks/Header/Header'
import Advice from 'theme/components/core/blocks/Advice/Advice'
import MainFooter from 'theme/components/core/blocks/Footer/Footer'
import Overlay from 'theme/components/core/Overlay'
import Loader from 'theme/components/core/Loader'
import Notifications from 'theme/components/core/blocks/Notification/Notifications'
import SignUp from 'theme/components/core/blocks/Auth/SignUp'
import CookieNotification from 'theme/components/core/CookieNotification'
import OfflineBadge from 'theme/components/core/OfflineBadge'
import { isServer } from '@vue-storefront/core/helpers'
import viewportMixin from 'theme/mixins/viewportMixin.ts'
import NoSSR from 'vue-no-ssr'

const SidebarMenu = () => import(/* webpackPreload: true */ /* webpackChunkName: "vsf-sidebar-menu" */ 'theme/components/core/blocks/SidebarMenu/SidebarMenu')
const Microcart = () => import(/* webpackPreload: true */ /* webpackChunkName: "vsf-microcart" */ 'theme/components/core/blocks/Microcart/Microcart')
const Wishlist = () => import(/* webpackPreload: true */ /* webpackChunkName: "vsf-wishlist" */ 'theme/components/core/blocks/Wishlist/Wishlist')
const SearchPanel = () => import(/* webpackChunkName: "vsf-search-panel" */ 'theme/components/core/blocks/SearchPanel/SearchPanel')
const OrderConfirmation = () => import(/* webpackChunkName: "vsf-order-confirmation" */ 'theme/components/core/blocks/Checkout/OrderConfirmation')

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
  mixins: [viewportMixin],
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
    ...mapGetters({ getMetaData: 'icmaaMeta/getData' }),
    onOrderConfirmation (payload) {
      this.loadOrderConfirmation = true
      this.ordersData = payload
      this.$bus.$emit('modal-show', 'modal-order-confirmation')
    },
    fetchMetaData () {
      return this.$store.dispatch('icmaaMeta/load')
    },
    fetchCmsData () {
      return Promise.all([
        this.$store.dispatch('icmaaCmsBlock/single', { value: 'navigation-main' }),
        this.$store.dispatch('icmaaCmsBlock/single', { value: 'navigation-meta' }),
        this.$store.dispatch('icmaaCmsBlock/single', { value: 'footer' })
      ])
    }
  },
  serverPrefetch () {
    return Promise.all([
      this.fetchMetaData(),
      this.fetchCmsData()
    ])
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
  metaInfo () {
    return this.getMetaData()
  },
  components: {
    MainHeader,
    Advice,
    MainFooter,
    SidebarMenu, // eslint-disable-line vue/no-unused-components
    Overlay,
    Loader,
    Notifications,
    SignUp,
    CookieNotification,
    OfflineBadge,
    OrderConfirmation,
    AsyncSidebar,
    'no-ssr': NoSSR
  }
}
</script>

<style lang="scss" src="theme/css/main.scss"></style>
