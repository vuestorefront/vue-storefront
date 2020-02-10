<template>
  <div>
    <TopBar />
    <div id="layout" >
      <AppHeader />
      <nuxt />
      <BottomNavigation />
      <AppFooter />
      <CartSidebar />
      <LoginModal />
    </div>
    <Version />
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue'
import BottomNavigation from '~/components/BottomNavigation.vue'
import AppFooter from '~/components/AppFooter.vue'
import TopBar from '~/components/TopBar.vue'
import Version from '~/components/Version.vue'
import CartSidebar from '~/components/CartSidebar.vue'
import LoginModal from '~/components/LoginModal.vue'
// const CartSidebar = () => import(/* webpackChunkName: "CartSidebar" */ '~/components/CartSidebar.vue')
// const LoginModal = () => import(/* webpackChunkName: "LoginModal" */ '~/components/LoginModal.vue')

export default {
  components: {
    TopBar,
    AppHeader,
    BottomNavigation,
    AppFooter,
    CartSidebar,
    LoginModal,
    Version
  }
}
</script>

<style lang="scss">
@import "~@storefront-ui/vue/styles";
@import "~@storefront-ui/shared/styles/helpers/visibility";
@import "~@storefront-ui/vue/src/utilities/transitions/transitions";

body {
  padding: 0;
  margin: 0;
}

#layout {
  box-sizing: border-box;
  @media screen and (min-width: $desktop-min) {
    max-width: 1240px;
    margin: auto;
  }
}
</style>
