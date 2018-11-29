import { htmlDecode } from '@vue-storefront/core/filters/html-decode'
import Composite from '@vue-storefront/core/mixins/composite'

export default {
  name: 'CmsPage',
  mixins: [Composite],
  computed: {
    pageTitle () {
      return this.$store.state.cmsPage.current ? this.$store.state.cmsPage.current.title : ''
    }
  },
  watch: {
    '$route': 'validateRoute'
  },
  asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data
    return new Promise((resolve, reject) => {
      if (context) context.output.cacheTags.add(`cmsPage`)
      store.dispatch('cmsPage/single', {
        value: route.params.slug
      }).then(res => {
        if (res) {
          store.state.cmsPage.current = res
          return resolve(res)
        }
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    })
  },
  mounted () {
    this.savePage(this.$store.state.cmsPage.current)
  },
  methods: {
    savePage (page) {
      return this.$store.state['cmsPage'] && Object.keys(page).length > 0 ? this.$store.dispatch('cmsPage/addItem', page) : false
    },
    validateRoute () {
      this.$store.dispatch('cmsPage/single', { key: 'slug', value: this.$route.params.slug }).then(cmsPage => {
        if (!cmsPage) {
          this.$router.push('/')
        }
      })
    }
  },
  metaInfo () {
    return {
      title: htmlDecode(this.pageTitle || this.$route.meta.title),
      meta: this.$route.meta.description ? [{ vmid: 'description', description: htmlDecode(this.$route.meta.description) }] : []
    }
  }
}
