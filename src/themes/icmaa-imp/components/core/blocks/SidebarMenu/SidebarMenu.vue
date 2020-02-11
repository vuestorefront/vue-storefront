<template>
  <sidebar class="t-min-h-screen">
    <template v-slot:top>
      <top-button icon="person" :text="loginButtonText" :tab-index="2" class="t-text-base-light" @click.native="login" />
    </template>
    <template v-slot:default>
      <div class="t-flex t-flex-wrap t--mx-1 t--mb-2">
        <navigation-item v-for="link in getMainNavigation" v-bind="link" :key="link.id" />
      </div>
    </template>
    <template v-slot:footer>
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
          <flag-icon :iso="country" width="20" height="20" class="t-flex-initial t-w-5 t-h-5 t-cursor-pointer" @click.native="showLanguageSwitcher" />
        </div>
      </div>
    </template>
  </sidebar>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import Sidebar from 'theme/components/core/blocks/AsyncSidebar/Sidebar'
import TopButton from 'theme/components/core/blocks/AsyncSidebar/TopButton'
import NavigationItem from 'theme/components/core/blocks/SidebarMenu/NavigationItem'
import FlagIcon from 'theme/components/core/blocks/FlagIcon'

export default {
  name: 'SidebarMenu',
  components: {
    Sidebar,
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
    ...mapGetters('user', ['isLoggedIn']),
    getMainNavigation () {
      return this.getJsonBlockByIdentifier('navigation-main')
    },
    metaNavigation () {
      return this.getJsonBlockByIdentifier('navigation-meta')
    },
    country: () => currentStoreView().i18n.defaultCountry,
    loginButtonText () {
      return this.isLoggedIn ? 'My Account' : 'Login'
    }
  },
  methods: {
    closeMenu () {
      this.$store.dispatch('ui/closeAll')
    },
    login () {
      this.closeMenu()
      if (!this.isLoggedIn) {
        this.$bus.$emit('modal-toggle', 'modal-signup')
      } else {
        this.$store.dispatch('ui/setUserSidebar', true)
      }
    },
    showLanguageSwitcher () {
      this.closeMenu()
      this.$bus.$emit('modal-toggle-switcher')
    }
  }
}
</script>
