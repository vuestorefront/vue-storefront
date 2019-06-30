import i18n from '@vue-storefront/i18n'
import { Logger } from '@vue-storefront/core/lib/logger'

export default {
  name: 'Error',
  asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data
    return new Promise((resolve, reject) => {
      Logger.log('Calling asyncData for Error page ' + new Date())()
      if (context) {
        context.output.cacheTags.add(`error`)
      }
      resolve()
    })
  },
  metaInfo () {
    return {
      title: this.$route.meta.title || i18n.t('Internal Server Error 500'),
      meta: this.$route.meta.description ? [{ vmid: 'description', name: 'description', content: this.$route.meta.description }] : []
    }
  }
}
