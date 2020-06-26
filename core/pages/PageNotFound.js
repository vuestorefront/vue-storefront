import { prepareQuery } from '@vue-storefront/core/modules/catalog/queries/common'

import i18n from '@vue-storefront/i18n'
import Composite from '@vue-storefront/core/mixins/composite'
import { Logger } from '@vue-storefront/core/lib/logger'

export default {
  name: 'PageNotFound',
  mixins: [Composite],
  async asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data
    Logger.log('Entering asyncData for PageNotFound ' + new Date())()
    if (context) {
      context.output.cacheTags.add(`page-not-found`)
      context.server.response.statusCode = 404
    }
    let ourBestsellersQuery = prepareQuery({ queryConfig: 'bestSellers' })
    const { items } = await store.dispatch('product/findProducts', {
      query: ourBestsellersQuery,
      size: 8,
      sort: 'created_at:desc',
      options: {
        populateRequestCacheTags: false,
        prefetchGroupProducts: false
      }
    })
    if (items.length) {
      store.state.homepage.bestsellers = items
    }
  },
  metaInfo () {
    return {
      title: this.$route.meta.title || i18n.t('404 Page Not Found'),
      meta: this.$route.meta.description ? [{ vmid: 'description', name: 'description', content: this.$route.meta.description }] : []
    }
  }
}
