import { mapGetters } from 'vuex'
import { PageStateItem } from '../types/PageState'

export default {
  name: 'IcmaaCmsPage',
  computed: {
    ...mapGetters({ pageByIdentifier: 'icmaaCmsPage/pageByIdentifier' }),
    identifier (): string {
      return this.$route.params.identifier
    },
    page (): PageStateItem {
      return this.pageByIdentifier(this.identifier)
    }
  },
  async asyncData ({ store, route, context }) {},
  metaInfo () {}
}
