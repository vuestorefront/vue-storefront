<script>
export default {
  name: 'BaseInput',
  data () {
    return {
      passType: 'password',
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
  methods: {
    togglePassType () {
      if (this.passType === 'password') {
        this.passType = 'text'
        this.icon = 'visibility_off'
      } else {
        this.passType = 'password'
        this.icon = 'visibility'
      }
    }
  },
  created () {
    if (this.type === 'password') {
      this.iconActive = true
    }
  },
  mounted () {
    if (this.focus) {
      this.$refs[this.name].focus()
    }
  }
}
</script>
