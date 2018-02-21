<template>
  <button>
    Core color button
  </button>
</template>

<script>
export default {
  name: 'ColorButton',
  props: {
    label: {
      type: null,
      default: ''
    },
    id: {
      type: null,
      default: ''
    },
    code: {
      type: null,
      default: ''
    },
    context: {
      type: null,
      default: ''
    }
  },
  data () {
    return {
      active: false
    }
  },
  beforeDestroy () {
    this.$bus.$off('filter-reset')
    this.$bus.$off('filter-changed-' + this.context)
  },
  beforeMount () {
    if (this.$route.name !== 'product') {
      this.$bus.$on('filter-reset', (filterOption) => {
        this.active = false
      })
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
    }
  },
  methods: {
    switchFilter (id, label) {
      this.$bus.$emit('filter-changed-' + this.context, { attribute_code: this.code, id: id, label: label })
    }
  }
}
</script>
