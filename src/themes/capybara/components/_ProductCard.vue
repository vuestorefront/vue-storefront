<template src="@storefrontui/vue/src/components/molecules/SfProductCard/SfProductCard.html" />

<script>
import { SfProductCard } from '@storefrontui/vue/js.js'
import merge from 'lodash-es/merge'

/** Maps default `regularPrice`, `specialPrice`, `image`, `title` properties to just a single `product` prop */
const SfProductCardExtended = merge(SfProductCard, {
  props: {
    product: {
      required: true,
      type: Object
    }
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
  },
})

delete SfProductCardExtended.props.regularPrice
delete SfProductCardExtended.props.specialPrice
delete SfProductCardExtended.props.image
delete SfProductCardExtended.props.title

export default SfProductCardExtended
</script>

<style lang="scss" scoped>
@import "~@storefrontui/shared/styles/components/SfProductCard.scss";
</style>
