import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({ viewport: 'ui/getViewport' })
  }
}
