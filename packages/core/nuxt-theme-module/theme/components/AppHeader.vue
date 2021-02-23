<template>
  <SfHeader
    data-cy="app-header"
    @enter:search="changeSearchTerm"
    @change:search="p => term = p"
    :searchValue="term"
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
  </SfHeader>
</template>

<script>
import { SfHeader, SfImage, SfIcon, SfButton, SfBadge } from '@storefront-ui/vue';
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
    LocaleSelector,
    SfIcon,
    SfButton,
    SfBadge
  },
  setup(props, { root }) {
    const { toggleCartSidebar, toggleWishlistSidebar, toggleLoginModal } = useUiState();
    const { changeSearchTerm, getFacetsFromURL } = useUiHelpers();
    const { isAuthenticated, load: loadUser } = useUser();
    const { cart, load: loadCart } = useCart();
    const { load: loadWishlist } = useWishlist();
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
      await loadUser();
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

.cart-badge {
  position: absolute;
  bottom: 40%;
  left: 40%;
}
</style>
