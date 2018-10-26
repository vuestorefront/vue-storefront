import {mapState} from 'vuex'
import Composite from '@vue-storefront/core/mixins/composite'

export default {
  name: 'RecentlyViewed',
  mixins: [Composite],
  computed: {
    ...mapState('recently-viewed', [
      'items'
    ])
  }
}
