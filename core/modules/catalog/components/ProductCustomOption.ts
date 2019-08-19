export const ProductCustomOption = {
  name: 'ProductCustomOption',
  props: {
    label: {
      type: String,
      required: false,
      default: () => false
    },
    id: {
      type: null,
      required: false,
      default: () => false
    },
    code: {
      type: null,
      required: false,
      default: () => false
    },
    context: {
      type: null,
      required: false,
      default: () => false
    }
  },
  data () {
    return {
      active: false
    }
  },
  beforeMount () {
    this.$bus.$on('filter-reset', this.filterReset)
    this.$bus.$on('filter-changed-' + this.context, this.filterChanged)
  },
  beforeDestroy () {
    this.$bus.$off('filter-reset', this.filterReset)
    this.$bus.$off('filter-changed-' + this.context, this.filterChanged)
  },
  methods: {
    filterChanged (filterOption) {
      if (filterOption.attribute_code === this.code) {
        if (filterOption.id === this.id) {
          this.active = !this.active
        } else {
          this.active = false
        }
        // filterOption.id === this.id ? this.active = true : this.active = false
      }
    },
    filterReset (filterOption) {
      this.active = false
    },
    switchFilter (id, label) {
      this.$bus.$emit('filter-changed-' + this.context, { attribute_code: this.code, id: id, label: label })
    }
  }
}
