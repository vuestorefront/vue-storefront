<template>
    <div class="bg-transparent brdr-1 brdr-circle color" :class="{ active: active }">
        <div class="brdr-circle" :style="'background-color: ' + label" @click="switchFilter(id, label)"></div>
    </div>
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
  mixins: [coreComponent('core/ColorButton')]
}
</script>

<style scoped>
    
    .color {
        width: 44px;
        height: 44px;
        border-color: rgba(113,113,113,0);
        position: relative;
        display: inline-flex;
        cursor: pointer;
    }

    .color.active {
        border-color: #a3a3a3;
    }

    .color > div {
        width: 90%;
        height: 90%;
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%)
    }

</style>
