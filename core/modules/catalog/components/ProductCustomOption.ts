import rootStore from '@vue-storefront/core/store'

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
    },
    checked: {
      type: Boolean,
      required: false,
      default: () => false
    },    
  },
  data () {
    return {
      active: this.checked
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
      if(rootStore.state.config.filters.multipleSelect && this.context === 'category'){
        if (filterOption.id === this.id) {
          this.active = !this.active
        }
      } else {
        if (filterOption.attribute_code === this.code) {
          if (filterOption.id === this.id) {
            this.active = !this.active
          } else {
            this.active = false
          }
        }
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
