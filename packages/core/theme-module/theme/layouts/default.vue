<template>
  <div>
    <TopBar class="desktop-only" />
    <div id="layout" >
      <AppHeader />
      <nuxt :key="$route.fullPath"/>
      <BottomNavigation />
      <AppFooter />
      <CartSidebar />
      <WishlistSidebar />
      <LoginModal />
    </div>
    <Version />
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue';
import BottomNavigation from '~/components/BottomNavigation.vue';
import AppFooter from '~/components/AppFooter.vue';
import TopBar from '~/components/TopBar.vue';
import Version from '~/components/Version.vue';
import CartSidebar from '~/components/CartSidebar.vue';
import WishlistSidebar from '~/components/WishlistSidebar.vue';
import LoginModal from '~/components/LoginModal.vue';
// const CartSidebar = () => import(/* webpackChunkName: "CartSidebar" */ '~/components/CartSidebar.vue')
// const LoginModal = () => import(/* webpackChunkName: "LoginModal" */ '~/components/LoginModal.vue')

export default {
  components: {
    TopBar,
    AppHeader,
    BottomNavigation,
    AppFooter,
    CartSidebar,
    WishlistSidebar,
    LoginModal,
    Version
  }
};
</script>

<style lang="scss">
@import "~@storefront-ui/vue/styles";

#layout {
  box-sizing: border-box;
  @media screen and (min-width: $desktop-min) {
    max-width: 1240px;
    margin: auto;
  }
}
</style>
