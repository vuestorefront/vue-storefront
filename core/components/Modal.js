import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
// should be in theme
export default {
  name: 'Modal',

  props: {
    name: {
      required: true,
      type: String
    },
    delay: {
      required: false,
      type: Number,
      default: 300
    }
  },
  mixins: [onEscapePress]
}
