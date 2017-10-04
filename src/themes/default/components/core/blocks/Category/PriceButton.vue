<template>
    <span>
        <button></button> <span>{{ content }}</span>
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
        margin-right: 10px;
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

    span {
        position: relative;
        bottom: 3px;
    }

    .active button:before {
        background-color: #333333;
    }

    .active span {
        font-weight: 400;
    }

</style>
