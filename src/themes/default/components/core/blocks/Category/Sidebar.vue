<template> 
    <div class="sidebar">
        <h4>Filter</h4>
        <h5>Color</h5>
        <color-button class="color-select gray active mr10"/><color-button class="color-select blue"/>
        <h5>Size</h5>
        <size-button class="size-select mr10"/>
        <size-button class="size-select disabled mr10"/>
        <size-button class="size-select mr10"/>
        <size-button class="size-select active mr10"/>
        <size-button class="size-select"/>
        <h5>Price</h5>
        <price-button class="price-select active mb10"/>
        <price-button class="price-select mb10"/>
        <price-button class="price-select mb10"/>
        <price-button class="price-select mb10"/>
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
    
    .color-select {
        width: 40px;
        height: 40px;
    }

    .color-select.size-select.gray:before {
        background-color: #6E6E6E;
    }

    .color-select.blue:before {
        background-color: #305B95;
    }

    .size-select {
        width: 40px;
        height: 40px;
    }

    .price-select {
        display: block;
        width: 20px;
        height: 20px;
    }

</style>
