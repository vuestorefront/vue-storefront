import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import i18n from '@vue-storefront/i18n'

import Composite from '@vue-storefront/core/mixins/composite'
import { Logger } from '@vue-storefront/core/lib/logger'
import { currentStoreView, localizedRoute } from '@vue-storefront/core/lib/multistore'

export default {
  name: 'MyAccount',
  mixins: [Composite],
  props: {
    activeBlock: {
      type: String,
      default: 'MyProfile'
    }
  },
  data () {
    return {
      navigation: [],
      returnEditMode: false
    }
  },
  beforeMount () {
    EventBus.$on('myAccount-before-updateUser', this.onBeforeUpdateUser)
    EventBus.$on('myAccount-before-changePassword', this.onBeforeChangePassword)
    EventBus.$on('user-after-logout', this.afterUserIsLogout)
  },
  beforeDestroy () {
    EventBus.$off('myAccount-before-updateUser', this.onBeforeUpdateUser)
    EventBus.$off('myAccount-before-changePassword', this.onBeforeChangePassword)
    EventBus.$off('user-after-logout', this.afterUserIsLogout)
  },
  methods: {
    async onBeforeChangePassword (passwordData) {
      try {
        await this.$store.dispatch('user/changePassword', passwordData);
      } finally {
        EventBus.$emit('myAccount-after-changePassword');
      }
    },
    async onBeforeUpdateUser (updatedData) {
      if (updatedData) {
        try {
          await this.$store.dispatch('user/update', { customer: updatedData })
        } catch (err) {
          EventBus.$emit('myAccount-before-remainInEditMode', this.$props.activeBlock)
          Logger.error(err)()
        } finally {
          EventBus.$emit('myAccount-after-updateUser')
        }
      }
    },
    afterUserIsLogout () {
      this.$router.push(localizedRoute('/', currentStoreView().storeCode))
    }
  },
  metaInfo () {
    return {
      title: this.$route.meta.title || i18n.t('My Account'),
      meta: this.$route.meta.description ? [{ vmid: 'description', name: 'description', content: this.$route.meta.description }] : []
    }
  },
  asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data
    return new Promise((resolve, reject) => {
      if (context) context.output.cacheTags.add(`my-account`)
      resolve()
    })
  }
}
