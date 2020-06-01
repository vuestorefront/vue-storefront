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
    @change:search="onSearchQueryChanged"
    :search-value="searchQuery"
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
      <search-results :visible="showSearchResults" :categories="categoriesFound" :products="productsFound"/>
    </template>
    <template #aside>
      <LocaleSelector class="mobile-only"/>
    </template>
  </SfHeader>
</template>

<script>
import { SfHeader, SfImage } from '@storefront-ui/vue';
import uiState from '~/assets/ui-state';
import { useCart, useWishlist, useUser, cartGetters, useSearch } from '@vue-storefront/about-you';
import { computed, ref } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
import LocaleSelector from './LocaleSelector';
import SearchResults from './SearchResults';

const { toggleCartSidebar, toggleWishlistSidebar, toggleLoginModal } = uiState;

export default {
  components: {
    SfHeader,
    SfImage,
    SearchResults,
    LocaleSelector
  },
  setup(props, { root }) {
    const { isAuthenticated } = useUser();
    const { cart, loadCart } = useCart();
    const { loadWishlist } = useWishlist();
    const { search, searchResults } = useSearch();
    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      return count ? count.toString() : null;
    });
    const searchQuery = ref('');
    const showSearchResults = ref(false);
    const categoriesFound = computed(() => {
      return searchResults.value?.categories;
    });
    const productsFound = computed(() => searchResults.value?.products);
    const suggestionsFound = computed(() => searchResults.value?.suggestions);

    const accountIcon = computed(() => isAuthenticated.value ? 'profile_fill' : 'profile');

    const onAccountClicked = () => {
      isAuthenticated && isAuthenticated.value ? root.$router.push('/my-account') : toggleLoginModal();
    };

    const onSearchQueryChanged = value => {
      searchQuery.value = value;
      if (value.length > 2) {
        showSearchResults.value = true;
        search({ term: searchQuery.value });
      } else {
        showSearchResults.value = false;
      }
    };

    onSSR(async () => {
      await loadCart();
      await loadWishlist();
    });

    return {
      accountIcon,
      cartTotalItems,
      categoriesFound,
      productsFound,
      suggestionsFound,
      searchQuery,
      searchResults,
      showSearchResults,
      toggleCartSidebar,
      toggleLoginModal,
      toggleWishlistSidebar,
      onAccountClicked,
      onSearchQueryChanged
    };
  }
};
</script>

<style lang="scss" scoped>
.sf-header__logo-image {
  height: 100%;
}
</style>
