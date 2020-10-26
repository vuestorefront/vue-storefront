<template>
  <SfHeader
    data-cy="app-header"
    @click:cart="toggleCartSidebar"
    @click:wishlist="toggleWishlistSidebar"
    @click:account="handleAccountClick"
    @enter:search="changeSearchTerm"
    @change:search="p => term = p"
    :searchValue="term"
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
      <SfHeaderNavigationItem class="nav-item" data-cy="app-header-url_women" label="WOMEN" :link="localePath('/c/women')" />
      <SfHeaderNavigationItem class="nav-item"  data-cy="app-header-url_men" label="MEN" :link="localePath('/c/men')" />
      <SfHeaderNavigationItem class="nav-item" data-cy="app-header-url_kids" label="KIDS" :link="localePath('/c/kids')" />
    </template>
    <template #aside>
      <LocaleSelector class="smartphone-only" />
    </template>
  </SfHeader>
</template>

<script>
import { SfHeader, SfImage } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import { useCart, useWishlist, useUser, cartGetters } from '<%= options.generate.replace.composables %>';
import { computed, ref } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useUiHelpers } from '~/composables';
import LocaleSelector from './LocaleSelector';

export default {
  components: {
    SfHeader,
    SfImage,
    LocaleSelector
  },
  setup(props, { root }) {
    const { toggleCartSidebar, toggleWishlistSidebar, toggleLoginModal } = useUiState();
    const { changeSearchTerm, getFacetsFromURL } = useUiHelpers();
    const { isAuthenticated, load } = useUser();
    const { cart, loadCart } = useCart();
    const { loadWishlist } = useWishlist();
    const term = ref(getFacetsFromURL().term);

    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      return count ? count.toString() : null;
    });

    const accountIcon = computed(() => isAuthenticated.value ? 'profile_fill' : 'profile');

    // TODO: https://github.com/DivanteLtd/vue-storefront/issues/4927
    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        return root.$router.push('/my-account');
      }

      toggleLoginModal();
    };

    onSSR(async () => {
      await load();
      await loadCart();
      await loadWishlist();
    });

    return {
      accountIcon,
      cartTotalItems,
      handleAccountClick,
      toggleCartSidebar,
      toggleWishlistSidebar,
      changeSearchTerm,
      term
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";

.sf-header {
  --header-padding:  var(--spacer-sm);
  @include for-desktop {
    --header-padding: 0;
  }
  &__logo-image {
      height: 100%;
  }
}

.nav-item {
  --header-navigation-item-margin: 0 var(--spacer-base);
}

</style>
