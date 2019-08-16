<template>
  <div id="default-layout">
    <AppHeader />
    <slot />
    <SfBottomNavigation class="mobile-only">
        <SfBottomNavigationItem>
          <router-link to="/"><SfIcon path="home" size="20px"/></router-link>
        </SfBottomNavigationItem>
        <SfBottomNavigationItem>
          <SfIcon path="menu" size="20px" style="width: 25px" />
        </SfBottomNavigationItem>
        <SfBottomNavigationItem>
          <SfIcon path="heart" size="20px"/>
        </SfBottomNavigationItem>
        <SfBottomNavigationItem>
          <SfIcon path="profile" size="20px"/>
        </SfBottomNavigationItem>
        <SfBottomNavigationItem class="sf-bottom-navigation__floating-icon">
          <SfCircleIcon class="sf-circle-icon--big">
            <SfIcon path="add_to_cart" size="20px" color="white" style="margin-right: 4px;"/>
          </SfCircleIcon>
        </SfBottomNavigationItem>    
    </SfBottomNavigation>
    <CartSidebar />
  </div>
</template>

<script>
import { SfBottomNavigation, SfIcon, SfCircleIcon } from '@storefrontui/vue'
import AppHeader from 'src/themes/capybara/components/Header'
import CartSidebar from 'src/themes/capybara/components/CartSidebar'

export default {
  components: {
    AppHeader,
    CartSidebar,
    SfBottomNavigation,
    SfIcon,
    SfCircleIcon
  }
}
</script>

<style lang="scss">
@import "~@storefrontui/vue/src/css/all";
@import "~@storefrontui/shared/styles/helpers/visibility";
</style>