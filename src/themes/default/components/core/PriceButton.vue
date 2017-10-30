<template>
    <span @click="switchFilter(id, label, from, to)">
        <button class="brdr-c-gray brdr-1 bg-transparent mr10" :class="{ active: active }">
            <div class="bg-transparent"></div>
        </button> 
        <span>{{ content }}</span>
    </span>
</template>

<script>
import { coreComponent } from 'lib/themes'
import EventBus from 'src/event-bus/event-bus'

export default { // TODO: move logic to parent component
  data () {
    return {
      active: false
    }
  },
  beforeMount () {
    EventBus.$on('filter-changed-' + this.context, (filterOption) => {
      if (filterOption.attribute_code === this.code) {
        if (filterOption.id === this.id) {
          if (this.active) {
            this.active = false
            return
          } else {
            this.active = true
          }
        } else {
          this.active = false
        }
        // filterOption.id === this.id ? this.active = true : this.active = false
      }
    })
  },
  methods: {
    switchFilter (id, label, from, to) {
      EventBus.$emit('filter-changed-' + this.context, { attribute_code: this.code, id: id, label: label, from: from, to: to })
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
        cursor: pointer;
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

    button.active > div {
        background-color: black;
    }

</style>
