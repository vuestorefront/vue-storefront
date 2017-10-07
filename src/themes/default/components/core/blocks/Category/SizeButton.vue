<template>
    <button class="bg-transparent clr-lightgray brdr-1 brdr-gray brdr-square">
        {{ content }}
    </button>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/blocks/Category/SizeButton')]
}
</script>

<style scoped>

    button {
        width: 40px;
        height: 40px;
    }
    
</style>
