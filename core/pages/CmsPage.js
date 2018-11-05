import EventBus from '@vue-storefront/core/plugins/event-bus'
import { htmlDecode } from '@vue-storefront/core/filters/html-decode'
// import i18n from '@vue-storefront/i18n'
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
    console.log('Entering asyncData for CMS Page --------------------------------' + new Date())
    return new Promise((resolve, reject) => {
      if (context) context.output.cacheTags.add(`cmsPage`)
      store.dispatch('cms_page/single', {
        value: route.params.slug
      }).then(res => {
        if (res) {
          store.state.cms_page.current = res.items[0]
          EventBus.$emitFilter('cms_page-after-load', { store: store, route: route }).then(results => {
            return resolve()
          }).catch(err => {
            console.error(err)
            return resolve()
          })
        }
      })
    })
  },
  methods: {
    validateRoute () {
      console.log('Validate route----------------------------------------------------')
      // this.filters.chosen = {} // reset selected filters
      // this.$bus.$emit('filter-reset')

      /* this.$store.dispatch('cms_page/single', { key: 'slug', value: this.$route.params.slug }).then(cmsPage => {
        if (!cmsPage) {
          this.$router.push('/')
        } else {
          this.$bus.$emit('cms_page-changed', this.$store.state.cms_page.current_path)
          EventBus.$emitFilter('cms_page-after-load', { store: this.$store, route: this.$route })
        }
      }) */
    }
  },
  metaInfo () {
    return {
      title: htmlDecode(this.pageTitle || this.$route.meta.title),
      meta: this.$route.meta.description ? [{ vmid: 'description', description: htmlDecode(this.$route.meta.description) }] : []
    }
  }
}
