export default {
  name: 'BaseSelect',
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
  }
}
