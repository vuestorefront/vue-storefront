import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({ viewport: 'ui/getViewport' })
  },
  async asyncData ({ context }) {
    if (context) {
      context.output.cacheTags.add(`category`)
    }
  }
}
