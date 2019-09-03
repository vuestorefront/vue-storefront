<template>
  <div id="default-layout">
    <AppHeader />
    <slot />
    <SfBottomNavigation class="mobile-only">
      <SfBottomNavigationItem>
        <router-link to="/">
          <SfIcon icon="home" size="20px" />
        </router-link>
      </SfBottomNavigationItem>
      <SfBottomNavigationItem>
        <SfIcon icon="menu" size="20px" style="width: 25px" />
      </SfBottomNavigationItem>
      <SfBottomNavigationItem>
        <SfIcon icon="heart" size="20px" />
      </SfBottomNavigationItem>
      <SfBottomNavigationItem>
        <SfIcon icon="profile" size="20px" />
      </SfBottomNavigationItem>
      <SfBottomNavigationItem class="sf-bottom-navigation__floating-icon">
        <SfCircleIcon class="sf-circle-icon--big">
          <SfIcon icon="add_to_cart" size="20px" color="white" style="margin-right: 4px;" />
        </SfCircleIcon>
      </SfBottomNavigationItem>
    </SfBottomNavigation>
    <CartSidebar />
    <WishlistSidebar />
  </div>
</template>

<script>
import { SfBottomNavigation, SfIcon, SfCircleIcon } from '@storefront-ui/vue'
import AppHeader from 'src/themes/capybara/components/Header'

export default {
  components: {
    CartSidebar: () => import('src/themes/capybara/components/CartSidebar.vue'),
    WishlistSidebar: () => import('src/themes/capybara/components/WishlistSidebar.vue'),
    AppHeader,
    SfBottomNavigation,
    SfIcon,
    SfCircleIcon
  }
}
</script>

<style lang="scss">
@import "~@storefront-ui/vue/src/css/all";
@import "~@storefront-ui/vue/src/css/helpers";
</style>
