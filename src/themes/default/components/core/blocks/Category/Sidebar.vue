<template> 
    <div class="sidebar">
        <h4>Filter</h4>
        <div v-if="filters.color.length">
            <h5>Color</h5> 
            <color-button :attribute_code="color" class="color-select mr10" v-for="(color, index) in filters.color" :key="index" :id="color.id" :label="color.label" />
        </div>
        <div v-if="filters.size.length">
            <h5>Size</h5>
            <size-button :attribute_code="size" class="size-select mr10" v-for="(size, index) in filters.size" :key="index" :id="size.id" :label="size.label" />
        </div>

        <div v-if="filters.price.length">
            <h5>Price</h5>
            <price-button :attribute_code="price" class="price-select mb10" v-for="(price, index) in filters.price" :key="index" :id="price.id" :content="'$' + price" />
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
