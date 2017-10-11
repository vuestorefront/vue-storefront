<template>
    <button class="bg-transparent brdr-1 brdr-circle">
        <div class="brdr-circle" :style="'background-color: ' + color" @click="switchFilter()"></div>
    </button>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  methods: {
    switchFilter () {
      console.log('Switch Filter')
    }
  },
  mixins: [coreComponent('core/blocks/Category/ColorButton')]
}
</script>

<style scoped>
    
    button {
        width: 40px;
        height: 40px;
        border-color: rgba(113,113,113,0);
        position: relative;
    }

    button > div {
        width: 89%;
        height: 89%;
        display: block;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }

</style>
