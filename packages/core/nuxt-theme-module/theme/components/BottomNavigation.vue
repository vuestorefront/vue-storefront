<template>
<!-- TODO: create logic with isActive prop for BottomNavigationItems -->
  <SfBottomNavigation class="smartphone-only">
    <nuxt-link data-cy="bottom-navigation-url_home" to="/">
      <SfBottomNavigationItem :class="$route.path == '/' ? 'sf-bottom-navigation__item--active' : ''" icon="home" size="20px" label="Home"/>
    </nuxt-link>
    <SfBottomNavigationItem data-cy="bottom-navigation-url_menu" icon="menu" size="20px" label="Menu"/>
    <SfBottomNavigationItem data-cy="bottom-navigation-url_wishlist" icon="heart" size="20px" label="Wishlist"/>
    <SfBottomNavigationItem data-cy="bottom-navigation-url_account" icon="profile" size="20px" label="Account"/>
    <!-- TODO: add logic for label - if on Home then Basket, if on PDC then AddToCart etc. -->
    <SfBottomNavigationItem data-cy="bottom-navigation-url_add-to-cart"
      label="Basket"
      icon="add_to_cart"
      >
      <template #icon>
        <SfCircleIcon aria-label="Add to cart">
          <SfIcon
            icon="add_to_cart"
            color="white"
            size="25px"
            :style="{margin: '0 0 0 -2px'}"
          />
        </SfCircleIcon>
      </template>
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
