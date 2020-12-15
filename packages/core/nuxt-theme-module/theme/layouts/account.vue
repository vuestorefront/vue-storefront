<template>
  <div>
    <TopBar class="desktop-only" />
    <div id="layout" >
      <AppHeader />
      <nuxt />
      <BottomNavigation />
      <CartSidebar v-if="isCartSidebarOpen" />
      <LoginModal v-if="isLoginModalOpen" />
    </div>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue';
import BottomNavigation from '~/components/BottomNavigation.vue';
import TopBar from '~/components/TopBar.vue';
import { useUiState } from '~/composables';

export default {
  components: {
    TopBar,
    AppHeader,
    BottomNavigation,
    CartSidebar: () => import(/* webpackChunkName: "CartSidebar" */ '~/components/CartSidebar.vue'),
    LoginModal: () => import(/* webpackChunkName: "LoginModal" */ '~/components/LoginModal.vue')
  },
  setup() {
    const { isCartSidebarOpen, isLoginModalOpen } = useUiState();

    return {
      isCartSidebarOpen,
      isLoginModalOpen
    };
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
