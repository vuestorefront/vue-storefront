export default {
  name: 'BaseTextarea',
  data () {
    return {
      iconActive: false,
      icon: 'visibility'
    }
  },
  props: {
    type: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    },
    name: {
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
    focus: {
      type: Boolean,
      required: false,
      default: false
    },
    autofocus: {
      type: Boolean,
      required: false,
      default: false
    },
    validation: {
      type: Object,
      required: false,
      default: () => {}
    },
    validations: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  mounted () {
    if (this.focus) {
      this.$refs[this.name].focus()
    }
  }
}
