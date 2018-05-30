import { mapGetters } from 'vuex'

export default {
  name: 'CompareIcon',
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
