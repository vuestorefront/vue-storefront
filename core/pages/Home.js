import { mapGetters } from 'vuex'

import EventBus from '@vue-storefront/core/plugins/event-bus'
import i18n from '@vue-storefront/i18n'

import Composite from '@vue-storefront/core/mixins/composite'

export default {
  name: 'Home',
  mixins: [Composite],
  computed: {
    ...mapGetters({
      rootCategories: 'category/list'
    })
  },
  asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data
    return new Promise((resolve, reject) => {
      if (context) context.ssrCacheTags.add(`home`)
      console.log('Entering asyncData for Home root ' + new Date())
      EventBus.$emitFilter('home-after-load', { store: store, route: route }).then((results) => {
        return resolve()
      }).catch((err) => {
        console.error(err)
        reject(err)
      })
    })
  },
  beforeMount () {
    this.$store.dispatch('category/reset')
  },
  metaInfo () {
    return {
      title: this.$route.meta.title || i18n.t('Home Page'),
      meta: this.$route.meta.description ? [{ vmid: 'description', description: this.$route.meta.description }] : []
    }
  }
}
