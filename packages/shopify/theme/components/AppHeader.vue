<template>
  <SfHeader
    data-cy="app-header"
    active-sidebar="activeSidebar"
    @click:cart="toggleCartSidebar"
    @click:wishlist="toggleWishlistSidebar"
    @click:account="onAccountClicked"
    @change:search="onSearchQueryChanged"
    :search-value="searchQuery"
    :cartItemsQty="cartTotalItems"
    :accountIcon="accountIcon"
    class="sf-header--has-mobile-search"
  >
    <!-- TODO: add mobile view buttons after SFUI team PR -->
    <template #logo>
      <nuxt-link
        data-cy="app-header-url_logo"
        :to="localePath('/')"
        class="sf-header__logo"
      >
        <SfImage
          src="/icons/logo.svg"
          alt="Vue Storefront Next"
          class="sf-header__logo-image"
        />
      </nuxt-link>
    </template>
    <template #navigation>
      <SfHeaderNavigationItem
        :data-cy="'app-header-url_' + category.handle"
        v-for="category in categories"
        :key="category.id"
      >
        <nuxt-link :to="'/c/' + category.handle">
          {{ category.title }}
        </nuxt-link>
      </SfHeaderNavigationItem>
      <div class="search-container">
        <div class="o-search">
          <search-results
            :visible="showSearchResults"
            :categories="categoriesFound"
            :products="productsFound"
            @hideSearchBox="hideSearchContainer()"
          />
        </div>
      </div>
      <div class="sf-overlay overlay" v-if="showSearchResults" @click="hideSearchContainer()"></div>
    </template>
    <template #aside>
      <LocaleSelector class="mobile-only" />
    </template>
  </SfHeader>
</template>

<script>
import { SfHeader, SfImage } from '@storefront-ui/vue';
import uiState from '~/assets/ui-state';
import {
  useCart,
  useWishlist,
  useUser,
  useCategory,
  useSearch,
  cartGetters
} from '@vue-storefront/shopify';
import { computed, ref } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
import SearchResults from './SearchResults';
import LocaleSelector from './LocaleSelector';

const { toggleCartSidebar, toggleWishlistSidebar, toggleLoginModal } = uiState;

export default {
  components: {
    SfHeader,
    SfImage,
    SearchResults,
    LocaleSelector
  },
  setup(props, context) {
    const { isAuthenticated } = useUser();
    const { cart, loadCart } = useCart();
    const { loadWishlist } = useWishlist();
    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      return count ? count.toString() : null;
    });

    const accountIcon = computed(() =>
      isAuthenticated.value ? 'profile_fill' : 'profile'
    );

    const onAccountClicked = () => {
      isAuthenticated && isAuthenticated.value
        ? context.root.$router.push('/my-account')
        : toggleLoginModal();
    };
    const { search: productSearch, searchResults } = useSearch();
    const searchQuery = ref('');
    const showSearchResults = ref(false);
    const categoriesFound = computed(() => {
      return searchResults.value?.categories;
    });
    const productsFound = computed(() => searchResults.value?.products);
    const suggestionsFound = computed(() => searchResults.value?.suggestions);
    const onSearchQueryChanged = value => {
      searchQuery.value = value;
      if (value.length > 2) {
        showSearchResults.value = true;
        productSearch({ term: searchQuery.value });
      } else {
        showSearchResults.value = false;
      }
    };
    const { categories, search } = useCategory('categories');

    const hideSearchContainer = () => {
      searchQuery.value = '';
      showSearchResults.value = false;
    };

    onSSR(async () => {
      await search({ slug: '' });
      await loadCart();
      await loadWishlist();
    });

    return {
      accountIcon,
      productsFound,
      categoriesFound,
      suggestionsFound,
      searchQuery,
      searchResults,
      showSearchResults,
      cartTotalItems,
      categories,
      toggleLoginModal,
      onAccountClicked,
      onSearchQueryChanged,
      toggleCartSidebar,
      toggleWishlistSidebar,
      hideSearchContainer
    };
  }
};
</script>
<style lang="scss" scoped>
.sf-header__logo-image {
  height: 100%;
}
.search-container {
  display: flex;
  z-index: 2;
  .o-search {
    flex-grow: 1;
  }
}
</style>
