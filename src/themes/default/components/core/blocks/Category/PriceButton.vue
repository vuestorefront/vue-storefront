<template>
    <button>
        
    </button>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/blocks/Category/PriceButton')]
}
</script>

<style scoped>

    button {
        border: 1px solid;
        border-color: #BDBDBD;
        background-color: transparent;
        position: relative;
    }

    button:before {
        content: "";
        width: 80%;
        height: 80%;
        left: 50%;
        top: 50%;
        position: absolute;
        display: block;
        transform: translate(-50%,-50%);
        background-color: transparent;
    }

    button.active:before {
        background-color: #333333;
    }

</style>
