<template>
  <div v-if="isOverlay" class="t-w-10 t-h-10 lg:t-w-12 lg:t-h-12 t-bg-base-dark t-opacity-25 t-flex t-items-center t-justify-center t-cursor-pointer" @click="toggleWishlist" data-testid="addToWishlist">
    <material-icon :icon="favoriteIcon" class="t-text-white" />
    <span class="t-sr-only">{{ !isOnWishlist ? $t('Add to favorite') : $t('Remove') }}</span>
  </div>
  <button-component v-else :type="buttonType" :icon="favoriteIcon" :icon-only="true" @click.native="toggleWishlist" data-testid="addToWishlist">
    <slot>
      {{ !isOnWishlist ? $t('Add to favorite') : $t('Remove') }}
    </slot>
  </button-component>
</template>

<script>
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'
import ButtonComponent from 'theme/components/core/blocks/Button'
import { IsOnWishlist } from '@vue-storefront/core/modules/wishlist/components/IsOnWishlist'
import { AddToWishlist } from '@vue-storefront/core/modules/wishlist/components/AddToWishlist'
import { RemoveFromWishlist } from '@vue-storefront/core/modules/wishlist/components/RemoveFromWishlist'
import { htmlDecode } from '@vue-storefront/core/lib/store/filters'
import i18n from '@vue-storefront/i18n'

export default {
  mixins: [ IsOnWishlist, AddToWishlist, RemoveFromWishlist ],
  components: {
    MaterialIcon,
    ButtonComponent
  },
  props: {
    isOverlay: {
      type: Boolean,
      default: false
    },
    buttonType: {
      type: String,
      default: 'ghost'
    }
  },
  computed: {
    favoriteIcon () {
      return this.isOnWishlist ? 'favorite' : 'favorite_border'
    }
  },
  methods: {
    toggleWishlist () {
      return this.isOnWishlist ? this.removeProductFromWhishList(this.product) : this.addProductToWhishlist(this.product)
    },
    addProductToWhishlist (product) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: i18n.t('Product {productName} has been added to wishlist!', { productName: htmlDecode(product.name) }),
        action1: { label: i18n.t('OK') }
      }, { root: true })
      this.addToWishlist(product)
    },
    removeProductFromWhishList (product) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: i18n.t('Product {productName} has been removed from wishlist!', { productName: htmlDecode(product.name) }),
        action1: { label: i18n.t('OK') }
      }, { root: true })
      this.removeFromWishlist(product)
    }
  }
}
</script>
