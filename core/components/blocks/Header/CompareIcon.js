import { mapGetters } from 'vuex'

export default {
  props: {
    product: {
      type: Object,
      required: false,
      default: () => { }
    }
  },
  computed: {
    ...mapGetters('compare', [
      'isActive'
    ])
  }
}
