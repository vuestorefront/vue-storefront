<template>
<!-- TODO: create logic with isActive prop for BottomNavigationItems -->
  <SfBottomNavigation class="mobile-only">
    <nuxt-link data-cy="bottom-navigation-url_home" to="/">
      <SfBottomNavigationItem :class="$route.path == '/' ? 'sf-bottom-navigation__item--active' : ''" icon="home" size="20px" label="Home"/>
    </nuxt-link>
    <SfBottomNavigationItem data-cy="bottom-navigation-url_menu" icon="menu" size="20px" label="Menu"/>
    <SfBottomNavigationItem data-cy="bottom-navigation-url_wishlist" icon="heart" size="20px" label="Wishlist" @click="toggleWishlistSidebar()" />
    <SfBottomNavigationItem data-cy="bottom-navigation-url_account" icon="profile" size="20px" label="Account" @click="onAccountClicked()"/>
    <!-- TODO: add logic for label - if on Home then Basket, if on PDC then AddToCart etc. -->
    <SfBottomNavigationItem data-cy="bottom-navigation-url_add-to-cart"
      label="Basket"
      icon="add_to_cart"
      @click="toggleCartSidebar()"
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
import uiState from '~/assets/ui-state';
import { useUser } from '<%= options.composables %>';
const { toggleCartSidebar, toggleWishlistSidebar, toggleLoginModal } = uiState;

export default {
  components: {
    SfBottomNavigation,
    SfIcon,
    SfCircleIcon
  },
  setup(props, { root }) {
    const { isAuthenticated } = useUser();
    const onAccountClicked = () => {
      isAuthenticated && isAuthenticated.value ? root.$router.push('/my-account') : toggleLoginModal();
    };
    return {
      toggleCartSidebar, onAccountClicked, toggleWishlistSidebar
    }
  }
};
</script>
