import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.component('CompareIcon', {
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
})
