<template>
    <button class="bg-transparent c-lightgray brdr-1 brdr-gray" :class="{ active: active }" @click="switchFilter(id, label)">
        {{ label }}
    </button>
</template>

<script>
import { coreComponent } from 'lib/themes'
import EventBus from 'src/event-bus/event-bus'

export default {
  data () {
    return {
      active: false
    }
  },
  beforeMount () {
    EventBus.$on('filter-changed', (filterOption) => {
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
        cursor: pointer;
    }
    button.active {
        border-color: black;
        background-color: #BDBDBD;
        color: black;
    }
    
</style>
