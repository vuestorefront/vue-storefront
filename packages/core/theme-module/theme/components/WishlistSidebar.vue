<template>
  <div id="wishlist">
    <SfSidebar
      :visible="isWishlistSidebarOpen"
      :button="false"
      title="My Wishlist"
      @close="toggleWishlistSidebar"
      class="sidebar sf-sidebar--right"
    >
      <template #title>
        <div class="heading__wrapper">
          <SfHeading :level="3" title="My wishlist" class="sf-heading--left" />
          <button
            data-cy="wishlist-sidebar-button_toggle-wishlist"
            class="heading__close-button"
            aria-label="Wishlist sidebar close button"
            @click="toggleWishlistSidebar"
          >
            <SfIcon icon="cross" size="14px" color="gray-primary" />
          </button>
        </div>
      </template>
      <transition name="fade" mode="out-in">
        <div v-if="totalItems" class="my-wishlist" key="my-wishlist">
          <div class="my-wishlist-items">
            Total items: <strong>{{ totalItems }}</strong>
          </div>

          <div class="collected-product-list">
            <transition-group name="fade" tag="div">
              <SfCollectedProduct
                data-cy="collected-product-wishlist-sidebar"
                v-for="product in products"
                :key="wishlistGetters.getItemSku(product)"
                :image="wishlistGetters.getItemImage(product)"
                :title="wishlistGetters.getItemName(product)"
                :regular-price="
                  wishlistGetters.getFormattedPrice(
                    wishlistGetters.getItemPrice(product).regular
                  )
                "
                :special-price="
                  wishlistGetters.getFormattedPrice(
                    wishlistGetters.getItemPrice(product).special
                  )
                "
                :stock="99999"
                image-width="180"
                image-height="200"
                @click:remove="removeFromWishlist(product)"
                class="collected-product"
              >
              </SfCollectedProduct>
            </transition-group>
          </div>
          <div class="sidebar-bottom">
            <SfProperty class="sf-property--full-width my-wishlist__total-price">
              <template #name>
                <span class="my-wishlist__total-price-label">Total price:</span>
              </template>
              <template #value>
                <SfPrice
                  :regular="wishlistGetters.getFormattedPrice(totals.subtotal)"
                />
              </template>
            </SfProperty>
            <nuxt-link to="/checkout/personal-details">
              <SfButton
                data-cy="wishlist-sidebar-btn_checkout"
                class="sf-button--full-width color-secondary"
                >Go to checkout</SfButton
              >
            </nuxt-link>
          </div>
        </div>
        <div v-else class="empty-wishlist" key="empty-wishlist">
          <div class="empty-wishlist__banner">
            <img
              src="@storefront-ui/shared/icons/empty_cart.svg"
              alt
              class="empty-wishlist__icon"
            />
            <h3 class="empty-wishlist__label">Your bag is empty</h3>
            <p class="empty-wishlist__description">
              Looks like you haven’t added any items to the bag yet. Start
              shopping to fill it in.
            </p>
          </div>
          <SfButton
            data-cy="wishlist-sidebar-btn_start-shopping"
            class="sf-button--full-width color-secondary"
            >Start shopping</SfButton
          >
        </div>
      </transition>
    </SfSidebar>
  </div>
</template>
<script>
import {
  SfSidebar,
  SfHeading,
  SfButton,
  SfIcon,
  SfProperty,
  SfPrice,
  SfCollectedProduct
} from '@storefront-ui/vue';
import { computed } from '@vue/composition-api';
import { useWishlist, wishlistGetters } from '<%= options.composables %>';
import { onSSR } from '@vue-storefront/core';
import uiState from '~/assets/ui-state';

const { isWishlistSidebarOpen, toggleWishlistSidebar } = uiState;

export default {
  name: 'Wishlist',
  components: {
    SfSidebar,
    SfButton,
    SfHeading,
    SfIcon,
    SfProperty,
    SfPrice,
    SfCollectedProduct
  },
  setup() {
    const { wishlist, loadWishlist, removeFromWishlist } = useWishlist();
    console.log(wishlist);
    const products = computed(() => wishlistGetters.getItems(wishlist.value));
    const totals = computed(() => wishlistGetters.getTotals(wishlist.value));
    const totalItems = computed(() =>
      wishlistGetters.getTotalItems(wishlist.value)
    );
    onSSR(async () => {
      await loadWishlist();
    });

    return {
      wishlist,
      isWishlistSidebarOpen,
      toggleWishlistSidebar,
      products,
      removeFromWishlist,
      loadWishlist,
      totals,
      totalItems,
      wishlistGetters
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";

.sidebar {
  --sidebar-top-padding: var(--spacer-lg) var(--spacer-base) 0
    var(--spacer-base);
  --sidebar-content-padding: var(--spacer-lg) var(--spacer-base);
}

.my-wishlist {
  flex: 1;
  display: flex;
  flex-direction: column;
  &__total-items {
    font: var(--font-normal) var(--font-xl) / 1.6 var(--font-family-secondary);
    color: var(--c-dark-variant);
    margin: 0;
  &__total-price {
    --property-name-font-size: var(--font-xl);
  }
    --price-font-size: var(--font-xl);
    margin: 0 0 var(--spacer-xl) 0;

    &-label {
      font: var(--font-normal) var(--font-xl) / 1.6 var(--font-family-secondary);
      color: var(--c-dark-variant);
    }
  }
}
.empty-wishlist {
  display: flex;
  flex: 1;
  flex-direction: column;
  &__banner {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  &__label,
  &__description {
    text-align: center;
  }
  &__label {
    margin: var(--spacer-2xl) 0 0 0;
    font: var(--font-normal) var(--font-lg) / 1.6 var(--font-family-secondary);
  }
  &__description {
    margin: var(--spacer-xl) 0 0 0;
    font: var(--font-light) var(--font-base) / 1.6 var(--font-family-primary);
  }
  &__icon {
    width: 18.125rem;
    height: 12.3125rem;
    margin-left: 60%;
    @include for-desktop {
      margin-left: 50%;
    }
  }
}
.heading {
  &__wrapper {
    --heading-title-color: var(--c-dark-variant);
    --heading-title-font-weight: var(--font-normal);
    display: flex;
    justify-content: space-between;
  }
  &__close-button {
    background: none;
    border: none;
  }
}

.sidebar-bottom {
  margin: auto 0 0 0;
}

.collected-product {
  margin: var(--spacer-base) 0;

  &__properties {
    margin: var(--spacer-sm) 0 0 0;
  }
}
</style>
