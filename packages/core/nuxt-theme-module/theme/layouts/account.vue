<template>
  <div>
    <TopBar class="desktop-only" />
    <div id="layout" >
      <AppHeader />
      <nuxt />
      <BottomNavigation />
      <CartSidebar />
      <AuthModal />
    </div>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue';
import BottomNavigation from '~/components/BottomNavigation.vue';
import TopBar from '~/components/TopBar.vue';
import CartSidebar from '~/components/CartSidebar.vue';
import AuthModal from '~/components/Auth/AuthModal.vue';

export default {
  components: {
    TopBar,
    AppHeader,
    BottomNavigation,
    CartSidebar,
    AuthModal
  }
};
</script>

<style lang="scss">
@import "~@storefront-ui/vue/styles";

body {
  padding: 0;
  margin: 0;
}

#layout {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: auto;
  }
}
</style>
