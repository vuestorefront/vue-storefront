<template> 
    <div class="sidebar">
        <h4>Filter</h4>
        <h5>Color</h5>
        <color-button class="color-select mr10" v-for="(color, index) in filters.color" :key="index" :class="color.label"/>
        <h5>Size</h5>
        <size-button class="size-select mr10" v-for="(size, index) in filters.size" :key="index" :content="size.label"/>
        <h5>Price</h5>
        <price-button class="price-select mb10" v-for="(price, index) in filters.price" :key="index" :content="'$'+price"/>
    </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

import ColorButton from './ColorButton'
import SizeButton from './SizeButton'
import PriceButton from './PriceButton'

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
