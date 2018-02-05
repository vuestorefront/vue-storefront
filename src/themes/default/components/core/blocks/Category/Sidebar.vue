<template>
  <div class="sidebar">
    <h4>Filter</h4>
    <div v-if="filters.color.length">
      <h5>Color</h5>
      <color-button
        context="category"
        :attribute_code="color"
        code="color"
        v-for="(color, index) in filters.color"
        :key="index"
        :id="color.id"
        :label="color.label"
      />
    </div>
    <div v-if="filters.size.length">
      <h5>Size</h5>
      <size-button
        context="category"
        :attribute_code="size"
        code="size"
        class="size-select mr10 mb10"
        v-for="(size, index) in filters.size"
        :key="index"
        :id="size.id"
        :label="size.label"
      />
    </div>
    <div v-if="filters.price.length">
      <h5>Price</h5>
      <price-button
        context="category"
        :attribute_code="price"
        class="price-select mb10"
        code="price"
        v-for="(price, index) in filters.price"
        :key="index"
        :id="price.id"
        :from="price.from"
        :to="price.to"
        :content="price.label"
        :label="price.label"
      />
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

import ColorButton from '../../ColorButton.vue'
import SizeButton from '../../SizeButton.vue'
import PriceButton from '../../PriceButton.vue'

export default {
  components: {
    ColorButton,
    SizeButton,
    PriceButton
  },
  mixins: [coreComponent('core/blocks/Category/Sidebar')]
}
</script>

<style scoped>
.price-select {
  display: block;
}
</style>
