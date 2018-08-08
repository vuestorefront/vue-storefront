export default {
  name: 'BaseSelect',
  model: {
    prop: 'selected',
    event: 'change'
  },
  props: {
    id: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: false,
      default: ''
    },
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    selected: {
      type: String,
      required: false,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    autocomplete: {
      type: String,
      required: false,
      default: ''
    },
    validations: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  computed: {
    listeners () {
      return {
        ...this.$listeners,
        change: event => this.$emit('change', event.target.value)
      }
    }
  }
}
