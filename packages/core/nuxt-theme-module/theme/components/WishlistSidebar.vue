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
          <SfHeading :level="3" title="My wishlist" class="sf-heading--left"/>
          <SfButton data-cy="wishlist-sidebar-button_toggle-wishlist" class="heading__close-button sf-button--pure" aria-label="Wishlist sidebar close button" @click="toggleWishlistSidebar">
            <SfIcon icon="cross" size="14px" color="gray-primary"/>
          </SfButton>
        </div>
      </template>
      <transition name="fade" mode="out-in">
        <div v-if="totalItems" class="my-wishlist" key="my-wishlist">
          <div class="my-wishlist__total-items">Total items: <strong>{{ totalItems }}</strong></div>
          <div class="collected-product-list">
            <transition-group name="fade" tag="div">
              <SfCollectedProduct
                data-cy="collected-product-wishlist-sidebar"
                v-for="product in products"
                :key="wishlistGetters.getItemSku(product)"
                :image="wishlistGetters.getItemImage(product)"
                :title="wishlistGetters.getItemName(product)"
                :regular-price="$n(wishlistGetters.getItemPrice(product).regular, 'currency')"
                :special-price="wishlistGetters.getItemPrice(product).special && $n(wishlistGetters.getItemPrice(product).special, 'currency')"
                :stock="99999"
                image-width="180"
                image-height="200"
                @click:remove="removeItem({ product })"
                class="collected-product"
              >
               <template #configuration>
                  <div class="collected-product__properties">
                    <SfProperty v-for="(attribute, key) in wishlistGetters.getItemAttributes(product, ['color', 'size'])" :key="key" :name="key" :value="attribute"/>
                  </div>
                </template>
                <template #input="{}">&nbsp;</template>
              </SfCollectedProduct>
            </transition-group>
          </div>
          <div class="sidebar-bottom">
          <SfProperty class="sf-property--full-width my-wishlist__total-price">
            <template #name>
              <span class="my-wishlist__total-price-label">Total price:</span>
            </template>
            <template #value>
              <SfPrice :regular="$n(totals.subtotal, 'currency')" />
            </template>
          </SfProperty>
          </div>
        </div>
        <div v-else class="empty-wishlist" key="empty-wishlist">
          <div class="empty-wishlist__banner">
            <SfImage src="/icons/empty-cart.svg" alt="Empty bag" class="empty-wishlist__icon" />
            <SfHeading
              title="Your bag is empty"
              description="Looks like you haven’t added any items to the bag yet. Start
              shopping to fill it in."
              class="empty-wishlist__label"
            />
          </div>
        </div>
      </transition>
      <template #content-bottom>
        <SfButton data-cy="wishlist-sidebar-btn_start-shopping" @click="toggleWishlistSidebar" class="sf-button--full-width color-secondary">
          {{ $t('Start shopping') }}
        </SfButton>
      </template>
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
  SfCollectedProduct,
  SfImage
} from '@storefront-ui/vue';
import { computed } from '@vue/composition-api';
import { useWishlist, useUser, wishlistGetters } from '<%= options.generate.replace.composables %>';
import { onSSR } from '@vue-storefront/core';
import { useUiState } from '~/composables';

export default {
  name: 'Wishlist',
  components: {
    SfSidebar,
    SfButton,
    SfHeading,
    SfIcon,
    SfProperty,
    SfPrice,
    SfCollectedProduct,
    SfImage
  },
  setup() {
    const { isWishlistSidebarOpen, toggleWishlistSidebar } = useUiState();
    const { wishlist, removeItem, load: loadWishlist } = useWishlist();
    const { isAuthenticated } = useUser();
    const products = computed(() => wishlistGetters.getItems(wishlist.value));
    const totals = computed(() => wishlistGetters.getTotals(wishlist.value));
    const totalItems = computed(() => wishlistGetters.getTotalItems(wishlist.value));

    onSSR(async () => {
      await loadWishlist();
    });

    return {
      isAuthenticated,
      products,
      removeItem,
      isWishlistSidebarOpen,
      toggleWishlistSidebar,
      totals,
      totalItems,
      wishlistGetters
    };
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  --sidebar-z-index: 3;
  --overlay-z-index: 3;
  --sidebar-top-padding: var(--spacer-lg) var(--spacer-base) 0 var(--spacer-base);
  --sidebar-content-padding: var(--spacer-lg) var(--spacer-base);
}

.my-wishlist {
  flex: 1;
  display: flex;
  flex-direction: column;
  &__total-items {
    font: var(--font-weight--normal) var(--font-size--lg) / 1.6 var(--font-family--secondary);
    color: var(--c-link);
    margin: 0;
  }
  &__total-price {
    --property-name-font-size: var(--font-size--xl);
    --price-font-size: var(--font-size--xl);
    margin: 0 0 var(--spacer-xl) 0;
    &-label {
      font: var(--font-weight--normal) var(--font-size--2xl) / 1.6 var(--font-family--secondary);
      color: var(--c-link);
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
    --heading-description-margin: 0 0 var(--spacer-xl) 0;
    --heading-title-margin: 0 0 var(--spacer-xl) 0;
    --heading-title-color: var(--c-primary);
    --heading-title-font-weight: var(--font-weight--semibold);
      @include for-desktop {
      --heading-title-font-size: var(--font-size--xl);
      --heading-title-margin: 0 0 var(--spacer-sm) 0;
  }
  }
  &__icon {
    --image-width: 16rem;
    margin: 0 0 var(--spacer-2xl) 7.5rem;
  }
}
.heading {
  &__wrapper {
    --heading-title-color: var(--c-link);
    --heading-title-font-weight: var(--font-weight--semibold);
    display: flex;
    justify-content: space-between;
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
