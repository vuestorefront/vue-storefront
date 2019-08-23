<template src="@storefront-ui/vue/src/components/molecules/SfProductCard/SfProductCard.html" />

<script>
import { SfProductCard } from '@storefront-ui/vue/js'
import merge from 'lodash-es/merge'

/** Map default `regularPrice`, `specialPrice`, `image`, `title` properties to just a single `product` prop */
/** Remove Wishlist handlers and do everything internally */
const SfProductCardExtended = merge(SfProductCard, {
  props: {
    product: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
      onWishlist: false
    }
  },
  mounted () {
    this.$on('click:wishlist', function () {
      if (this.onWishlist) {
        this.$store.dispatch('wishlist/removeItem', this.product).then(() => {
          this.onWishlist = false
        })
      } else {
        this.$store.dispatch('wishlist/addItem', this.product).then(() => {
          this.onWishlist = true
        })
      }
    })
  },
  computed: {
    regularPrice () {
      return this.$options.filters.price(this.product.priceInclTax)
    },
    specialPrice () {
      return this.product.specialPriceInclTax ? this.$options.filters.price(this.product.specialPriceInclTax) : null
    },
    image () {
      return this.getThumbnail(this.product.image)
    },
    title () {
      return this.product.name
    }
  }
})

delete SfProductCardExtended.props.regularPrice
delete SfProductCardExtended.props.specialPrice
delete SfProductCardExtended.props.image
delete SfProductCardExtended.props.title
delete SfProductCardExtended.props.onWishlist

export default SfProductCardExtended
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/components/SfProductCard.scss";
</style>
