<template>
    <div class="bg-transparent brdr-1 brdr-circle color" :class="{ active: active }">
        <div class="brdr-circle brdr-1" :style="'background-color: ' + label" @click="switchFilter(id, label)"></div>
    </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  data () {
    return {
      active: false
    }
  },
  beforeMount () {
    if (this.$route.name !== 'product') {
      this.$bus.$on('filter-changed-' + this.context, (filterOption) => {
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
    }
  },
  methods: {
    switchFilter (id, label) {
      this.$bus.$emit('filter-changed-' + this.context, { attribute_code: this.code, id: id, label: label })
    }
  },
  mixins: [coreComponent('core/ColorButton')]
}
</script>

<style scoped>

    .color {
        width: 40px;
        height: 40px;
        border-color: rgba(113,113,113,0);
        position: relative;
        display: inline-flex;
        cursor: pointer;
    }

    .color.active {
        border-color: #4f4f4f;
    }

    .color > div {
        width: 34px;
        height: 34px;
        display: block;
        position: absolute;
        border-color: #E0E0E0;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%)
    }

</style>
