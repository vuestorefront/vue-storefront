import { isServer } from '@vue-storefront/core/helpers'

export default {
  async asyncData ({ store, route }) {
    /**
     * @todo Find out why the state.route isn't ready when getter is called
     * @see https://github.com/DivanteLtd/vue-storefront/issues/3328
     *
     * On client-side site requests (via navigation) the state.route of the getCurrentCategory() getter isn't already
     * the current route and so can't get the correct current category. The vuex-router-sync module which
     * syncs the current router to store seems sometimes be still the last one when get called in getter.
     *   route.params -> is correct
     *   rootState.route.params (in getter) -> not
     *
     * The current solution is to fetch the data in the traditional VueJs way using mounted() and serverPrefetch().
     * */
    // const category = store.getters['category-next/getCurrentCategory']
    // return store.dispatch('icmaaCategoryExtras/single', { value: category.url_key })
  },
  async serverPrefetch () {
    await this.fetchAsyncData()
  },
  mounted () {
    this.fetchAsyncData()
  },
  watch: {
    getCurrentCategory: function () {
      this.fetchAsyncData()
    }
  },
  methods: {
    fetchContentHeader (urlKey) {
      // Only load them client-side, we use the queue in this action which won't work on SSR
      return !isServer ? this.$store.dispatch('icmaaCategoryExtras/loadContentHeader', urlKey) : true
    },
    async fetchAsyncData () {
      const category = this.$store.getters['category-next/getCurrentCategory']
      if (category) {
        await Promise.all([
          this.$store.dispatch('icmaaSpotify/fetchRelatedArtists', category),
          this.fetchContentHeader(category.url_key)
        ])
      }
    }
  }
}
