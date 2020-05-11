<template>
  <div>
    <SfHeader
      active-sidebar="activeSidebar"
      @click:cart="toggleCartSidebar"
      @click:wishlist="isWishlistOpen = !isWishlistOpen"
      @click:account="onAccountClicked"
      :cartItemsQty="cartTotalItems"
    >
      <!-- TODO: add mobile view buttons after SFUI team PR -->
      <template #logo>
        <nuxt-link :to="localePath('/')" class="sf-header__logo">
          <SfImage
            src="/icons/logo.svg"
            alt="Vue Storefront Next"
            class="sf-header__logo-image"
          />
        </nuxt-link>
      </template>
      <template #navigation>
        <SfHeaderNavigationItem>
          <nuxt-link :to="localePath('/c/women')">
            WOMEN
          </nuxt-link>
        </SfHeaderNavigationItem>
        <SfHeaderNavigationItem>
          <nuxt-link :to="localePath('/c/men')">
            MEN
          </nuxt-link>
        </SfHeaderNavigationItem>
        <SfHeaderNavigationItem>
          <nuxt-link :to="localePath('/c/kids')">
            KIDS
          </nuxt-link>
        </SfHeaderNavigationItem>
      </template>
    </SfHeader>
    <FakeWishlist />
  </div>
</template>

<script>
import FakeWishlist from './FakeWishlist';
import { SfHeader, SfImage } from '@storefront-ui/vue';
import uiState from '~/assets/ui-state';
import { useCart, useUser, cartGetters } from '@vue-storefront/about-you';
import { computed, ref } from '@vue/composition-api';
const { toggleCartSidebar, toggleLoginModal } = uiState;
export default {
  components: {
    SfHeader,
    SfImage,
    FakeWishlist
  },
  setup(props, { root }) {
    const isWishlistOpen = ref(false);
    const { isAuthenticated } = useUser();

    const onAccountClicked = () => {
      isAuthenticated && isAuthenticated.value
        ? root.$router.push('/my-account')
        : toggleLoginModal();
    };
    const { cart } = useCart();
    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      // TODO: remove once resolved by UI team: https://github.com/DivanteLtd/storefront-ui/issues/1061
      return count ? count.toString() : null;
    });
    return {
      isWishlistOpen,
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
