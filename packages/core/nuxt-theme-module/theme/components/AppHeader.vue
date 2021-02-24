<template>
  <div @mouseleave="searchOpen = false" >
    <div v-click-outside="closeSearchAndRemoveTerm">
      <SfHeader
        data-cy="app-header"
        class="sf-header--has-mobile-search"
        :class="{'header-on-top': searchOpen}"
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
        </template>
        <template #aside>
          <LocaleSelector class="smartphone-only" />
        </template>
        <template #header-icons>
          <div class="sf-header__icons">
            <SfButton
              class="sf-button--pure sf-header__action"
              @click="handleAccountClick"
            >
              <SfIcon
                :icon="accountIcon"
                size="1.25rem"
              />
            </SfButton>
            <SfButton
              class="sf-button--pure sf-header__action"
              @click="toggleWishlistSidebar"
            >
              <SfIcon
                class="sf-header__icon"
                icon="heart"
                size="1.25rem"
              />
            </SfButton>
            <SfButton
              class="sf-button--pure sf-header__action"
              @click="toggleCartSidebar"
            >
              <SfIcon
                class="sf-header__icon"
                icon="empty_cart"
                size="1.25rem"
              />
              <SfBadge v-if="cartTotalItems" class="sf-badge--number cart-badge">{{cartTotalItems}}</SfBadge>
            </SfButton>
          </div>
        </template>
        <template #search>
          <SfSearchBar
            ref="searchRef"
            :value="term"
            placeholder="Search for items"
            aria-label="Search"
            class="sf-header__search"
            @input="handleSearchInput"
            @keydown.enter="handleSearch"
            @focus="searchOpen = true"
            @keydown.esc="closeSearchAndRemoveTerm"
          >
            <template #icon>
              <SfButton
                v-if="!!term"
                class="sf-search-bar__button sf-button--pure"
                @click="handleCloseSearchButton"
              >
                <span class="sf-search-bar__icon">
                  <SfIcon color="var(--c-text)" size="18px" icon="cross" />
                </span>
              </SfButton>
              <SfButton
                v-else
                class="sf-search-bar__button sf-button--pure"
                @click="searchOpen ? searchOpen = false : searchOpen = true"
              >
                <span class="sf-search-bar__icon">
                  <SfIcon color="var(--c-text)" size="20px" icon="search" />
                </span>
              </SfButton>
            </template>
          </SfSearchBar>
        </template>
      </SfHeader>
      <SearchResults :visible="searchOpen" :result="result" @closeSearchResults="closeSearchAndRemoveTerm" />
    </div>
    <SfOverlay :visible="searchOpen" />
  </div>
</template>

<script>
import { SfHeader, SfImage, SfIcon, SfButton, SfBadge, SfSearchBar, SfOverlay } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import { useCart, useWishlist, useUser, cartGetters, useFacet } from '<%= options.generate.replace.composables %>';
import { computed, ref, onBeforeUnmount, watch } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useUiHelpers } from '~/composables';
import LocaleSelector from './LocaleSelector';
import SearchResults from '~/components/SearchResults';
import { clickOutside } from '@storefront-ui/vue/src/utilities/directives/click-outside/click-outside-directive.js';
import {
  mapMobileObserver,
  unMapMobileObserver
} from '@storefront-ui/vue/src/utilities/mobile-observer.js';
import debounce from 'lodash.debounce';

export default {
  components: {
    SfHeader,
    SfImage,
    LocaleSelector,
    SfIcon,
    SfButton,
    SfBadge,
    SfSearchBar,
    SearchResults,
    SfOverlay
  },
  directives: { clickOutside },
  setup(props, { root }) {
    const { toggleCartSidebar, toggleWishlistSidebar, toggleLoginModal } = useUiState();
    const { changeSearchTerm, getFacetsFromURL } = useUiHelpers();
    const { result, search } = useFacet();
    const { isAuthenticated, load: loadUser } = useUser();
    const { cart, load: loadCart } = useCart();
    const { load: loadWishlist } = useWishlist();
    const term = ref(getFacetsFromURL().term);
    const searchOpen = ref(false);
    const searchRef = ref(null);

    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      return count ? count.toString() : null;
    });

    const accountIcon = computed(() => isAuthenticated.value ? 'profile_fill' : 'profile');

    // TODO: https://github.com/DivanteLtd/vue-storefront/issues/4927
    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        if (searchOpen.value) {
          searchOpen.value = false;
        }
        return root.$router.push('/my-account');
      }

      toggleLoginModal();
    };

    onSSR(async () => {
      await loadUser();
      await loadCart();
      await loadWishlist();
    });

    const handleSearchInput = (input) => term.value = input;

    const closeSearchAndRemoveTerm = () => {
      term.value = '';
      searchOpen.value = false;
      changeSearchTerm(term.value);
    };

    const handleSearch = async (e) => {
      const term = e.target.value;
      changeSearchTerm(term);
      await search({ categorySlug: 'women-clothing-jackets', itemsPrePage: 20, filters: {} });
    };

    const debounceSearchInput = debounce(async () => {
      await search({ categorySlug: 'women-clothing-jackets', itemsPrePage: 20, filters: {} });
    }, 1000);

    const isMobile = computed(() => mapMobileObserver().isMobile.get());

    const handleCloseSearchButton = () => {
      if (isMobile.value) {
        return closeSearchAndRemoveTerm();
      } else {
        term.value = '';
        return searchRef.value.$el.children[0].focus();
      }
    };

    watch(() => term.value, (newVal, oldVal) => {
      if (term.value.length >= 3) {
        debounceSearchInput();
      }
      if (!isMobile.value && term.value.length > 0) {
        if ((!oldVal && newVal) || (newVal.length !== oldVal.length && searchOpen.value === false)) {
          searchOpen.value = true;
        }
      }
    });

    onBeforeUnmount(() => {
      unMapMobileObserver();
    });

    return {
      accountIcon,
      cartTotalItems,
      handleAccountClick,
      toggleCartSidebar,
      toggleWishlistSidebar,
      changeSearchTerm,
      term,
      searchOpen,
      closeSearchAndRemoveTerm,
      handleSearch,
      handleSearchInput,
      result,
      handleCloseSearchButton,
      searchRef,
      isMobile
    };
  }
};
</script>

<style lang="scss" scoped>
.sf-header {
  --header-padding:  var(--spacer-sm);
  @include for-desktop {
    --header-padding: 0;
  }
  &__logo-image {
      height: 100%;
  }
}
.header-on-top {
  z-index: 2;
}
.nav-item {
  --header-navigation-item-margin: 0 var(--spacer-base);
}

.cart-badge {
  position: absolute;
  bottom: 40%;
  left: 40%;
}
</style>
