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
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
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
    validationIf: {
      type: Boolean,
      required: false,
      default: false
    },
    validationText: {
      type: String,
      required: false,
      default: ''
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
  }
}
</script>
