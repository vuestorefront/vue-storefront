import { htmlDecode } from '@vue-storefront/core/filters/html-decode'
import Composite from '@vue-storefront/core/mixins/composite'

export default {
  name: 'CmsPage',
  mixins: [Composite],
  computed: {
    pageTitle () {
      return this.$store.state.cms_page.current ? this.$store.state.cms_page.current.title : ''
    }
  },
  watch: {
    '$route': 'validateRoute'
  },
  asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data
    return new Promise((resolve, reject) => {
      if (context) context.output.cacheTags.add(`cmsPage`)
      store.dispatch('cms_page/single', {
        value: route.params.slug
      }).then(res => {
        if (res) {
          store.state.cms_page.current = res
          return resolve(res)
        }
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    })
  },
  methods: {
    validateRoute () {
      this.$store.dispatch('cms_page/single', { key: 'slug', value: this.$route.params.slug }).then(cmsPage => {
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
