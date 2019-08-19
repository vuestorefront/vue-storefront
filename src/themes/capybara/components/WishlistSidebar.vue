<template>
  <SfSidebar
    :visible="isOpen"
    @close="onClose"
    class="sf-sidebar--right"
  >
    <template v-if="productsInWishlist.length">
      <SfHeading title="My Wishlist" class="sf-heading--left sf-heading--no-underline" />
      <div class="wishlist-sidebar__content">
        {{ productsInWishlist }}
      </div>
    </template>

    <div class="wishlist-sidebar__empty-message" v-else>
      <img src="/assets/hearts.svg" alt="empty wishlist">
      <span class="empty-wishlist-heading">{{ $t('Your wishlist is empty') }}</span>
      <p>{{ $t('Tap any heart next to a product to favotite. We’ll save them for you here!') }}</p>
    </div>
  </SfSidebar>
</template>

<script>
import { SfSidebar, SfHeading } from '@storefrontui/vue'

export default {
  name: 'WishlistSidebar',
  computed: {
    isOpen () {
      return this.$store.state.ui.isWishlistSidebarOpen
    },
    productsInWishlist () {
      return this.$store.state.wishlist.items
    }
  },
  methods: {
    onClose () {
      this.$store.dispatch('ui/toggleWishlistSidebar')
    }
  },
  components: {
    SfSidebar,
    SfHeading
  }
}
</script>


<style lang="scss">
@import "~@storefrontui/vue/src/css/variables";

.wishlist-sidebar {
  .sf-sidebar__content {
    display: flex;
    flex-direction: column;
    & > * {
      width: 100%;
    }
  }

  &__content {
    padding: $spacer-big 0;
  }

  &__empty-message {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    .empty-wishlist-heading {
      margin-top: $spacer-big;
      font-weight: 400;
      font-size: $font-size-big-mobile;
      @media (min-width: $desktop-min) {
        font-size: $font-size-big-desktop;
      }
    }
  }
}
</style>
