<template>
    <button class="bg-white c-lightgray brdr-1 brdr-gray" @click="switchFilter(id, label)">
        {{ label }}
    </button>
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
  mixins: [coreComponent('core/SizeButton')]
}
</script>

<style scoped>

    button {
        width: 40px;
        height: 40px;
    }
    
</style>
