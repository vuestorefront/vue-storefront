<template>
  <sidebar :title="$t('Wishlist')" :close-on-click="true">
    <template v-slot:top-after-title>
      <button-component v-if="productsInWishlist.length" type="transparent" size="sm" icon="delete" :icon-only="true" @click="clearWishlist">
        {{ $t('Clear wishlist') }}
      </button-component>
    </template>
    <div class="t-pb-20">
      <h4 v-if="!productsInWishlist.length" class="t-text-sm">
        {{ $t('Your wishlist is empty.') }}
      </h4>
      <div class="t-container">
        <ul>
          <product v-for="(wishlistProduct, i) in productsInWishlist" :key="wishlistProduct.id" :product="wishlistProduct" :class="{ 't-border-b': productsInWishlist.length !== (i + 1) }" />
        </ul>
      </div>
    </div>
  </sidebar>
</template>

<script>
import Sidebar from 'theme/components/core/blocks/AsyncSidebar/Sidebar'
import Wishlist from '@vue-storefront/core/compatibility/components/blocks/Wishlist/Wishlist'
import Product from 'theme/components/core/blocks/Wishlist/Product'
import ButtonComponent from 'theme/components/core/blocks/Button'

export default {
  components: {
    ButtonComponent,
    Sidebar,
    Product
  },
  props: {
    product: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  methods: {
    clearWishlist () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t('Are you sure you would like to remove all the items from the wishlist?'),
        action1: {
          label: this.$t('OK'),
          action: () => {
            this.$store.dispatch('wishlist/clear')
          }
        },
        action2: { label: this.$t('Cancel'), action: 'close' },
        hasNoTimeout: true
      })
    }
  },
  mixins: [Wishlist]
}
</script>
