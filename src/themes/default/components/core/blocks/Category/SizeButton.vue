<template>
    <button>
        
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
        border: 1px solid;
        border-color: #BDBDBD;
        border-radius: 0;
        color: #BDBDBD;
        background-color: transparent;
    }

    button.active {
        border-color: #4F4F4F;
        color: #4F4F4F;
        background-color: #E0E0E0;
    }

    button.disabled {
        border-color: #E0E0E0;
        content: #E0E0E0;
    }
    
</style>
