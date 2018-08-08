export default {
  name: 'BaseRadiobutton',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    id: {
      type: String,
      required: true
    },
    checked: {
      type: Boolean,
      required: true
    },
    validation: {
      type: Object,
      required: false,
      default: () => { }
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    listeners () {
      return {
        ...this.$listeners,
        change: event => this.$emit('change', event.target.checked)
      }
    }
  }
}
