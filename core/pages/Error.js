import i18n from '@vue-storefront/i18n'
import Composite from '@vue-storefront/core/mixins/composite'

export default {
  name: 'Error',
  mixins: [Composite],
  asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data
    return new Promise((resolve, reject) => {
      console.log('Entering asyncData for Error page ' + new Date())
      if (context) {
        contextserver.response.status(500)
        context.output.cacheTags.add(`error`)
      }
    })
  },
  metaInfo () {
    return {
      title: this.$route.meta.title || i18n.t('Internal Server Error 500'),
      meta: this.$route.meta.description ? [{ vmid: 'description', description: this.$route.meta.description }] : []
    }
  }
}
