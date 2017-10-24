<template>
  <div class="product-listing">
    <div v-for="product in products" :key="product.id" class="p15" :class="'col-md-' + columns">
      <product-tile :product="product" />
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  props: ['products','columns'],
  mixins: [coreComponent('core/ProductListing')]
}
</script>
