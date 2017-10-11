<template>
    <button class="bg-white c-lightgray brdr-1 brdr-gray">
        {{ size }}
    </button>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/SizeButton')]
}
</script>

<style scoped>

    button {
        width: 40px;
        height: 40px;
    }
    
</style>
