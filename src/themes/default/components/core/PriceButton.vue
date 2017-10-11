<template>
    <span>
        <button class="brdr-c-gray brdr-1 bg-transparent mr10">
            <div class="bg-transparent"></div>
        </button> 
        <span>{{ content }}</span>
    </span>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/PriceButton')]
}
</script>

<style scoped>

    button {
        width: 20px;
        height: 20px;
        position: relative;
    }

    button > div {
        width: 80%;
        height: 80%;
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }

</style>
