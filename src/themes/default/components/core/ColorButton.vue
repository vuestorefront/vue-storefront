<template>
    <div class="bg-transparent brdr-1 brdr-circle color">
        <div class="brdr-circle" :style="'background-color: ' + label" @click="switchFilter(id, label)"></div>
    </div>
</template>

<script>
import { coreComponent } from 'lib/themes'
import EventBus from 'src/event-bus/event-bus'

export default {
  methods: {
    switchFilter (id, label) {
      EventBus.$emit('filter-changed', { attribute_code: this.code, id: id, label: label })
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
