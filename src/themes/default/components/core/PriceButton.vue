<template>
    <span>
        <button class="brdr-c-gray brdr-1 bg-transparent mr10" @click="switchFilter(id, label, from, to)">
            <div class="bg-transparent"></div>
        </button> 
        <span>{{ content }}</span>
    </span>
</template>

<script>
import { coreComponent } from 'lib/themes'
import EventBus from 'src/event-bus/event-bus'

export default { // TODO: move logic to parent component
  methods: {
    switchFilter (id, label, from, to) {
      EventBus.$emit('filter-changed', { attribute_code: this.code, id: id, label: label, from: from, to: to })
    }
  },
  mixins: [coreComponent('core/PriceButton')]
}
</script>

<style scoped>

    button {
        width: 20px;
        height: 20px;
        position: relative;
    }

    button > div {
        width: 80%;
        height: 80%;
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }

</style>
