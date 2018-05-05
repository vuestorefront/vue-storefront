<script>
export default {
  name: 'BaseRadiobutton',
  props: {
    id: {
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      required: true
    },
    validation: {
      type: Object,
      required: false,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
