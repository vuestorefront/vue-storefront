import { mapState } from 'vuex'

export default {
  name: 'RecentlyViewed',
  computed: {
    ...mapState('recently-viewed', [
      'items'
    ])
  }
}
