import Vue from 'vue'
import GenericSelector from 'core/components/GenericSelector'
import PriceSelector from 'core/components/PriceSelector'

export default Vue.component('CategorySidebar', {
  props: {
    filters: {
      type: Object,
      required: true
    }
  },
  components: {
    GenericSelector,
    PriceSelector
  }
})
