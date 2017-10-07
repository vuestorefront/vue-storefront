<template>
    <span>
        <button class="brdr-gray brdr-1 position-relative bg-transparent mr10">
            <div class="cntr display-block position-absolute bg-transparent"></div>
        </button> 
        <span>{{ content }}</span>
    </span>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/blocks/Category/PriceButton')]
}
</script>

<style scoped>

    button {
        width: 20px;
        height: 20px;
    }

    button > div {
        width: 80%;
        height: 80%;
    }

</style>
