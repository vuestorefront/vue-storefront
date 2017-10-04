<template>
    <button>
        
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
        border-radius: 50%;
        border: 1px solid;
        position: relative;
        border-color: rgba(113,113,113,0);
        background-color: transparent;
    }

    button:before {
        content: "";
        width: 89%;
        height: 89%;
        left: 50%;
        top: 50%;
        position: absolute;
        display: block;
        border-radius: 50%;
        transform: translate(-50%,-50%);
    }

    button.active {
        border-color: rgba(113,113,113,1);
    }

    .red:before {
        background-color: red;
    }

    .blue:before {
        background-color: #305B95;
    }

</style>
