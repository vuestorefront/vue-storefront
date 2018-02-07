<template>
  <span @click="switchFilter(id, from, to)">
    <button
      class="relative brdr-c-gray brdr-1 bg-transparent mr10 pointer price-button"
      :class="{ active: active }"
      :aria-label="'Price ' + content"
    >
      <div class="bg-transparent absolute block square"/>
    </button>
    <span>{{ content }}</span>
  </span>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default { // TODO: move logic to parent component
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
    switchFilter (id, from, to) {
      this.$bus.$emit('filter-changed-' + this.context, { attribute_code: this.code, id: id, from: from, to: to })
    }
  },
  mixins: [coreComponent('core/PriceButton')]
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/global_vars';
  $lightgray-secondary: map-get($colors, lightgray-secondary);
  $darkgray: map-get($colors, darkgray);

  .price-button {
    width: 20px;
    height: 20px;

    &:hover,
    &:focus {
      .square {
        background-color: $lightgray-secondary;
      }
    }

    &.active {
      .square {
        background-color: $darkgray;
      }
    }
  }

  .square {
    width: 80%;
    height: 80%;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
</style>
