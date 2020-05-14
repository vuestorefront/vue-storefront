import { htmlDecode } from '@vue-storefront/core/filters/html-decode'
import Composite from '@vue-storefront/core/mixins/composite'
import { Logger } from '@vue-storefront/core/lib/logger'

export default {
  name: 'CmsPage',
  mixins: [Composite],
  computed: {
    pageTitle () {
      return this.$store.state.cmsPage.current ? this.$store.state.cmsPage.current.meta_title || this.$store.state.cmsPage.current.title : ''
    },
    pageDescription () {
      return this.$store.state.cmsPage.current ? this.$store.state.cmsPage.current.meta_description : ''
    },
    pageKeywords () {
      return this.$store.state.cmsPage.current ? this.$store.state.cmsPage.current.meta_keywords : ''
    }
  },
  watch: {
    '$route': 'validateRoute'
  },
  asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data
    return new Promise((resolve, reject) => {
      if (context) context.output.cacheTags.add(`cmsPage`)
      store.dispatch('cmsPage/single', {
        value: route.params.slug,
        setCurrent: true
      }).then(page => {
        resolve(page)
      }).catch(err => {
        Logger.error(err)()
        reject(err)
      })
    })
  },
  methods: {
    validateRoute () {
      this.$store.dispatch('cmsPage/single', { value: this.$route.params.slug, setCurrent: true }).then(cmsPage => {
        if (!cmsPage) {
          this.$router.push(this.localizedRoute('/'))
        }
      })
    }
  },
  metaInfo () {
    return {
      title: htmlDecode(this.pageTitle || this.$route.meta.title),
      meta: [
        { vmid: 'description', name: 'description', content: htmlDecode(this.pageDescription || this.$route.meta.description) },
        { vmid: 'keywords', name: 'keywords', content: htmlDecode(this.pageKeywords) }
      ]
    }
  }
}
