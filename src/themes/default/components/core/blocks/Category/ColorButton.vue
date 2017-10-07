<template>
    <button class="bg-transparent position-relative brdr-1 brdr-circle">
        <div class="brdr-circle display-block cntr" :style="'background-color: ' + color"></div>
    </button>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/blocks/Category/ColorButton')]
}
</script>

<style scoped>
    
    button {
        width: 40px;
        height: 40px;
        border-color: rgba(113,113,113,0);
    }

    button > div {
        width: 89%;
        height: 89%;
    }

</style>
