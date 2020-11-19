import { htmlDecode } from '@vue-storefront/core/filters/html-decode'
import Composite from '@vue-storefront/core/mixins/composite'
import { Logger } from '@vue-storefront/core/lib/logger'
import { CmsModule } from '@vue-storefront/core/modules/cms'
import { registerModule } from '@vue-storefront/core/lib/modules'

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
  async asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data
    registerModule(CmsModule)
    if (context) context.output.cacheTags.add(`cmsPage`)
    try {
      await store.dispatch('cmsPage/single', {
        value: route.params.slug,
        setCurrent: true
      })
    } catch (err) {
      Logger.error(err)()
    }
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
