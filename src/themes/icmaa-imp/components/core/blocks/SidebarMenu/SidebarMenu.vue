<template>
  <div class="sidebar-menu t-scrolling-touch t-w-full t-min-h-screen t-flex t-flex-col" ref="container">
    <top>
      <top-button icon="person" text="Account" tabindex="2" class="t-text-base-light" @click.native="login" />
    </top>
    <div @click="closeMenu" class="t-p-3 t-pt-4 t-flex t-flex-wrap">
      <navigation-item v-for="link in getMainNavigation" v-bind="link" :key="link.id" />
    </div>
    <div class="t-flex-expand t-bg-base-lightest t-p-4">
      <div class="t-flex t-items-center t-w-full">
        <div class="t-flex t-items-center t-w-full" @click="closeMenu">
          <template v-for="(link, index) in metaNavigation">
            <router-link :to="localizedRoute(link.route)" class="t-flex t-flex-fit t-mr-6 t-text-xs t-uppercase t-text-base-tone" :key="index">
              {{ link.name }}
            </router-link>
          </template>
        </div>
        <div class="t-flex-expand t-border-base-lighter t-border-r t-h-8 t-mx-4" />
        <flag-icon :iso="country" width="20" height="20" class="t-flex-initial t-w-5 t-h-5" @click.native="showLanguageSwitcher" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import Top from 'theme/components/theme/blocks/AsyncSidebar/Top'
import TopButton from 'theme/components/theme/blocks/AsyncSidebar/TopButton'
import NavigationItem from 'theme/components/core/blocks/SidebarMenu/NavigationItem'
import FlagIcon from 'theme/components/core/blocks/FlagIcon'

export default {
  name: 'SidebarMenu',
  components: {
    Top,
    TopButton,
    NavigationItem,
    FlagIcon
  },
  data () {
    return {
      loadLanguagesModal: false
    }
  },
  computed: {
    ...mapState({
      submenu: state => state.ui.submenu,
      currentUser: state => state.user.current
    }),
    ...mapGetters('icmaaCmsBlock', ['getJsonBlockByIdentifier']),
    getMainNavigation () {
      return this.getJsonBlockByIdentifier('navigation-main')
    },
    metaNavigation () {
      return this.getJsonBlockByIdentifier('navigation-meta')
    },
    country: () => currentStoreView().i18n.defaultCountry
  },
  methods: {
    closeMenu () {
      this.$store.commit('ui/setSidebar', false)
      this.$store.commit('ui/setMicrocart', false)
    },
    login () {
      this.closeMenu()
      this.$bus.$emit('modal-toggle', 'modal-signup')
    },
    showLanguageSwitcher () {
      this.closeMenu()
      this.$bus.$emit('modal-toggle-switcher')
    }
  },
  mounted () {
    disableBodyScroll(this.$refs.container)
  },
  destroyed () {
    clearAllBodyScrollLocks()
  }
}
</script>
