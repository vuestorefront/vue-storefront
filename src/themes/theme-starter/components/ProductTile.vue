<template>
  <div class="product-tile">
    <transition name="fade" appear>
      <img
        v-if="instant"
        :src="thumbnail"
        :key="thumbnail"
        v-img-placeholder="placeholder"
        :alt="product.name"
      >
      <img
        v-if="!instant"
        :src="placeholder"
        v-lazy="thumbnail"
        :key="thumbnail"
        :alt="product.name"
      >
    </transition>
    {{ product.name }}
    {{ product.priceInclTax }}
  </div>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

export default {
  mixins: [coreComponent('ProductTile')]
}
</script>
