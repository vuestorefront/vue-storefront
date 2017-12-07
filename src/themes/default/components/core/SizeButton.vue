<template>
    <button class="bg-white c-gray brdr-1 brdr-gray" :class="{ active: active }" @click="switchFilter(id, label)">
        {{ label }}
    </button>
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
  },
  methods: {
    switchFilter (id, label) {
      this.$bus.$emit('filter-changed-' + this.context, { attribute_code: this.code, id: id, label: label })
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
      border-radius: 0;
      border-color: #BDBDBD;
      font-size: 14px;
      color: #BDBDBD;
    }
    button.active {
      border-color: #828282;
      border-width: 2px;
      color: #828282;
    }
    button:disabled {
      border-color: #E0E0E0;
      color: #E0E0E0;
      cursor: not-allowed;
    }

</style>
