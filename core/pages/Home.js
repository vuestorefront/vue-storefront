import { mapGetters } from 'vuex'

import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import i18n from '@vue-storefront/i18n'

import Composite from '@vue-storefront/core/mixins/composite'
import { Logger } from '@vue-storefront/core/lib/logger'

export default {
  name: 'Home',
  mixins: [Composite],
  computed: {
    ...mapGetters('category', ['getCategories']),
    ...mapGetters('user', ['isLoggedIn']),
    rootCategories () {
      return this.getCategories
    }
  },
  async asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data
    if (context) context.output.cacheTags.add(`home`)
    Logger.info('Calling asyncData in Home Page (core)')()
    try {
      await EventBus.$emitFilter('home-after-load', { store: store, route: route })
    } catch (e) {
      Logger.error(e)()
      throw e
    }
  },
  beforeMount () {
    this.$store.dispatch('category/reset')
  },
  mounted () {
    if (!this.isLoggedIn && localStorage.getItem('redirect')) this.$bus.$emit('modal-show', 'modal-signup')
  },
  watch: {
    isLoggedIn () {
      this.$router.push(localStorage.getItem('redirect'))
      localStorage.removeItem('redirect')
    }
  },
  metaInfo () {
    return {
      title: this.$route.meta.title || i18n.t('Home Page'),
      meta: this.$route.meta.description ? [{ vmid: 'description', description: this.$route.meta.description }] : []
    }
  }
}
