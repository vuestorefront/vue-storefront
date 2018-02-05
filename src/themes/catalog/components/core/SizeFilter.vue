<template>
  <button @click="switchFilter(id, from, to)" class="p0 b pointer" :class="{ 'c-primary active': active, 'c-secondary-lighter' : !active }">
    {{ size }}
  </button>
</template>

<script>
export default {
  props: {
    size: { type: String, required: true },
    active: { type: Boolean, required: true },
    id: { type: Number, required: true }
  },
  data () {
    return {
      context: 'product',
      code: 'size'
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
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/vars/colors';

button {
  width: 40px;
  height: 40px;
  border-color: $c-border;
  background: transparent;
}

button.active {
  border-color: $c-text-primary;
}
</style>
