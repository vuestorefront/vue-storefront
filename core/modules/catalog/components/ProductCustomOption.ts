import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
export const ProductCustomOption = {
  name: 'ProductCustomOption',
  props: {
    label: {
      type: String,
      required: false,
      default: ''
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
    EventBus.$on('filter-reset', this.filterReset)
    EventBus.$on('filter-changed-' + this.context, this.filterChanged)
  },
  beforeDestroy () {
    EventBus.$off('filter-reset', this.filterReset)
    EventBus.$off('filter-changed-' + this.context, this.filterChanged)
  },
  methods: {
    filterChanged (filterOption) {
      if (filterOption.attribute_code === this.code) {
        this.active = filterOption.id === this.id ? !this.active : false
      }
    },
    filterReset (filterOption) {
      this.active = false
    },
    switchFilter (id, label) {
      EventBus.$emit('filter-changed-' + this.context, { attribute_code: this.code, id: id, label: label })
    }
  }
}
