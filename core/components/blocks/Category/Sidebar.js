import GenericSelector from 'core/components/GenericSelector'
import PriceSelector from 'core/components/PriceSelector'

export default {
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
}
