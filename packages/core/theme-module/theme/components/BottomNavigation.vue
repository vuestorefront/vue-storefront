<template>
  <SfBottomNavigation class="mobile-only">
    <nuxt-link to="/">
      <SfBottomNavigationItem :class="$route.path == '/' ? 'sf-bottom-navigation__item--active' : ''">
        <SfIcon icon="home" size="20px" />
      </SfBottomNavigationItem>
    </nuxt-link>
    <SfBottomNavigationItem>
      <SfIcon icon="menu" size="20px" style="width: 25px" />
    </SfBottomNavigationItem>
    <SfBottomNavigationItem>
      <SfIcon icon="heart" size="20px" />
    </SfBottomNavigationItem>
    <SfBottomNavigationItem>
      <SfIcon icon="profile" size="20px" />
    </SfBottomNavigationItem>
    <SfBottomNavigationItem class="bottom-navigation-circle">
      <SfCircleIcon class="sf-bottom-navigation__floating-icon sf-circle-icon--big">
        <SfIcon icon="add_to_cart" size="20px" color="white" style="margin-right: 4px;" />
      </SfCircleIcon>
    </SfBottomNavigationItem>
  </SfBottomNavigation>
</template>

<script>
import { SfBottomNavigation, SfIcon, SfCircleIcon } from '@storefront-ui/vue';

export default {
  components: {
    SfBottomNavigation,
    SfIcon,
    SfCircleIcon
  }
};
</script>
