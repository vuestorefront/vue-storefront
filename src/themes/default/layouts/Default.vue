<template>
  <div class="default-layout">
    <overlay v-if="overlayActive"/>
    <loader/>
    <div id="viewport" class="w-100 relative">
      <microcart/>
      <search-panel/>
      <no-ssr>
        <transition name="slide-right">
          <wishlist v-if="wishlistActive"/>
        </transition>
      </no-ssr>
      <sidebar-menu/>
      <main-header/>
      <slot/>
      <main-footer/>
      <notification/>
      <sign-up/>
      <newsletter-popup/>
      <cookie-notification/>
      <offline-badge/>
      <modal-switcher/>
      <order-confirmation :orders-data="ordersData"/>
    </div>
    <vue-progress-bar />
  </div>
</template>

<script>
import NoSSR from 'vue-no-ssr'
import { mapState } from 'vuex'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'

import MainHeader from 'theme/components/core/blocks/Header/Header.vue'
import MainFooter from 'theme/components/core/blocks/Footer/Footer.vue'

import Microcart from 'theme/components/core/blocks/Microcart/Microcart.vue'
import SidebarMenu from 'theme/components/core/blocks/SidebarMenu/SidebarMenu.vue'
import SearchPanel from 'theme/components/core/blocks/SearchPanel/SearchPanel.vue'

import Overlay from 'theme/components/core/Overlay.vue'
import Loader from 'theme/components/core/Loader.vue'
import Modal from 'theme/components/core/Modal.vue'
import Notification from 'theme/components/core/Notification.vue'
import SignUp from 'theme/components/core/blocks/Auth/SignUp.vue'
import NewsletterPopup from 'theme/components/core/NewsletterPopup.vue'
import CookieNotification from 'theme/components/core/CookieNotification.vue'
import OfflineBadge from 'theme/components/core/OfflineBadge.vue'
import ModalSwitcher from 'theme/components/core/blocks/Switcher/Language.vue'
import OrderConfirmation from 'theme/components/core/blocks/Checkout/OrderConfirmation.vue'

import Head from 'theme/resource/head'

export default {
  data () {
    return {
      ordersData: []
    }
  },
  computed: {
    ...mapState({
      overlayActive: state => state.ui.overlay,
      wishlistActive: state => state.ui.wishlist
    })
  },
  methods: {
    onOrderConfirmation (payload) {
      this.ordersData = payload
      EventBus.$emit('modal-show', 'modal-order-confirmation')
    }
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
    EventBus.$on('offline-order-confirmation', this.onOrderConfirmation)
  },
  beforeDestroy () {
    EventBus.$off('offline-order-confirmation', this.onOrderConfirmation)
  },
  metaInfo: Head,
  components: {
    MainHeader,
    MainFooter,
    Microcart,
    'Wishlist': () => import(/* webpackChunkName: "wishlist" */'theme/components/core/blocks/Wishlist/Wishlist.vue'),
    SearchPanel,
    SidebarMenu,
    Overlay,
    Loader,
    Notification,
    Modal,
    SignUp,
    NewsletterPopup,
    CookieNotification,
    OfflineBadge,
    ModalSwitcher,
    OrderConfirmation,
    'no-ssr': NoSSR
  }
}
</script>

<style lang="scss" src="theme/css/main.scss">

</style>
<style lang="scss">
.slide-right-enter, .slide-right-leave-to  {
  transform: translateX(100%);
  transition: transform 300ms;
}
.slide-right-enter-to, .slide-right-leave {
  transform: translateX(0);
  transition: transform 300ms;
}
</style>
