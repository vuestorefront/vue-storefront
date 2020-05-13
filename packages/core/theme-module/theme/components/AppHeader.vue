<template>
  <SfHeader
    data-cy="app-header"
    active-sidebar="activeSidebar"
    @click:cart="toggleCartSidebar"
    @click:account="onAccountClicked"
    :cartItemsQty="cartTotalItems"
    :accountIcon="accountIcon"
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
  </SfHeader>
</template>

<script>
import { SfHeader, SfImage } from '@storefront-ui/vue';
import uiState from '~/assets/ui-state';
import { useCart, useUser, cartGetters } from '<%= options.composables %>';
import { computed } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';

const { toggleCartSidebar, toggleLoginModal } = uiState;

export default {
  components: {
    SfHeader,
    SfImage
  },
  setup(props, { root }) {
    const { isAuthenticated } = useUser();
    const { cart, loadCart } = useCart();
    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      // TODO: remove once resolved by UI team: https://github.com/DivanteLtd/storefront-ui/issues/1061
      return count ? count.toString() : null;
    });

    const accountIcon = computed(() => isAuthenticated.value ? 'profile_fill' : 'profile');

    const onAccountClicked = () => {
      isAuthenticated && isAuthenticated.value ? root.$router.push('/my-account') : toggleLoginModal();
    };

    onSSR(async () => {
      loadCart();
    });

    return {
      accountIcon,
      cartTotalItems,
      toggleLoginModal,
      onAccountClicked,
      toggleCartSidebar
    };
  }
};
</script>

<style lang="scss" scoped>
.sf-header__logo-image {
  height: 100%;
}
</style>
