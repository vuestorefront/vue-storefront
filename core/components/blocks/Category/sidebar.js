import Vue from 'vue'
import ColorSelector from '../../colorSelector'
import SizeSelector from '../../sizeSelector'
import PriceSelector from '../../priceSelector'

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
