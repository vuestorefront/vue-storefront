import Vue from 'vue'
import ColorSelector from 'core/components/ColorSelector'
import SizeSelector from 'core/components/SizeSelector'
import PriceSelector from 'core/components/PriceSelector'

export default Vue.component('CategorySidebar', {
  props: {
    filters: {
      type: Object,
      required: true
    }
  },
  components: {
    ColorSelector,
    SizeSelector,
    PriceSelector
  }
})
