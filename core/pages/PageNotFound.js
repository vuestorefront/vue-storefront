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
    const response = await store.dispatch('product/list', {
      query: ourBestsellersQuery,
      size: 8,
      sort: 'created_at:desc'
    })
    if (response) {
      store.state.homepage.bestsellers = response.items
    }
  },
  metaInfo () {
    return {
      title: this.$route.meta.title || i18n.t('404 Page Not Found'),
      meta: this.$route.meta.description ? [{ vmid: 'description', name: 'description', content: this.$route.meta.description }] : []
    }
  }
}
