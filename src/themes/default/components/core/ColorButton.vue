<template>
    <div class="bg-transparent brdr-1 brdr-circle color">
        <div class="brdr-circle" :style="'background-color: ' + label" @click="switchFilter()"></div>
    </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  methods: {
    switchFilter () {
      console.log('Switch Filter')
    }
  },
  mixins: [coreComponent('core/ColorButton')]
}
</script>

<style scoped>
    
    .color {
        width: 45px;
        height: 45px;
        border-color: rgba(113,113,113,0);
        position: relative;
        display: inline-flex;
    }

    .color > div {
        width: 100%;
        height: 100%;
        display: block;
    }

</style>
