<template>
  <SfHeader
    data-cy="app-header"
    active-sidebar="activeSidebar"
    @click:cart="toggleCartSidebar"
    @click:wishlist="toggleWishlistSidebar"
    @click:account="onAccountClicked"
    :cartItemsQty="cartTotalItems"
    :accountIcon="accountIcon"
    class="sf-header--has-mobile-search"
  >
    <!-- TODO: add mobile view buttons after SFUI team PR -->
    <template #logo>
      <nuxt-link data-cy="app-header-url_logo" :to="localePath('/')" class="sf-header__logo">
        <SfImage src="/icons/logo.svg" alt="Vue Storefront Next" class="sf-header__logo-image"/>
      </nuxt-link>
    </template>
    <template #navigation>
      <SfHeaderNavigationItem>
        <nuxt-link data-cy="app-header-url_women" :to="localePath('/c/women')">
          WOMEN
        </nuxt-link>
      </SfHeaderNavigationItem>
      <SfHeaderNavigationItem>
        <nuxt-link data-cy="app-header-url_men" :to="localePath('/c/men')">
          MEN
        </nuxt-link>
      </SfHeaderNavigationItem>
      <SfHeaderNavigationItem>
        <nuxt-link data-cy="app-header-url_kids" :to="localePath('/c/kids')">
          KIDS
        </nuxt-link>
      </SfHeaderNavigationItem>
    </template>
    <template #aside>
      <LocaleSelector class="mobile-only" />
    </template>
  </SfHeader>
</template>

<script>
import { SfHeader, SfImage } from '@storefront-ui/vue';
import uiState from '~/assets/ui-state';
import { useCart, useWishlist, useUser, cartGetters } from '<%= options.generate.replace.composables %>';
import { computed } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
import LocaleSelector from './LocaleSelector';

const { toggleCartSidebar, toggleWishlistSidebar, toggleLoginModal } = uiState;

export default {
  components: {
    SfHeader,
    SfImage,
    LocaleSelector
  },
  setup(props, { root }) {
    const { isAuthenticated } = useUser();
    const { cart, loadCart } = useCart();
    const { loadWishlist } = useWishlist();
    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      return count ? count.toString() : null;
    });

    const accountIcon = computed(() => isAuthenticated.value ? 'profile_fill' : 'profile');

    const onAccountClicked = () => {
      isAuthenticated && isAuthenticated.value ? root.$router.push('/my-account') : toggleLoginModal();
    };

    onSSR(async () => {
      await loadCart();
      await loadWishlist();
    });

    return {
      accountIcon,
      cartTotalItems,
      toggleLoginModal,
      onAccountClicked,
      toggleCartSidebar,
      toggleWishlistSidebar
    };
  }
};
</script>

<style lang="scss" scoped>
.sf-header__logo-image {
  height: 100%;
}
</style>
