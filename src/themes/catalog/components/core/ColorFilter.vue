<template>
    <div @click="switchFilter(id, from, to)" class="color-filter b b-circle inline-flex middle-xs center-xs pointer" :class="{ active : active }">
        <div class="b b-circle" :style="'background-color:' + color"></div>
    </div>
</template>

<script>
export default {
  props: {
    color: { type: String, required: true },
    active: { type: Boolean, required: true },
    id: { type: Number, required: true }
  },
  data () {
    return {
      context: 'product',
      code: 'color'
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
    switchFilter (id, from, to) {
      this.$bus.$emit('filter-changed-' + this.context, { attribute_code: this.code, id: id, from: from, to: to })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/vars/colors';

.color-filter {
  width: 40px;
  height: 40px;
  border-color: transparent;
}
.color-filter.active {
  border-color: darken($c-border, 20%);
}
.color-filter > div {
  width: 34px;
  height: 34px;
}
</style>