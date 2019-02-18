import i18n from '@vue-storefront/i18n'

import Composite from '@vue-storefront/core/mixins/composite'
import { Logger } from '@vue-storefront/core/lib/logger'

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
    this.$bus.$on('myAccount-before-updateUser', this.onBeforeUpdateUser)
    this.$bus.$on('myAccount-before-changePassword', this.onBeforeChangePassword)
  },
  destroyed () {
    this.$bus.$off('myAccount-before-updateUser', this.onBeforeUpdateUser)
    this.$bus.$off('myAccount-before-changePassword', this.onBeforeChangePassword)
  },
  methods: {
    onBeforeChangePassword (passwordData) {
      this.$store.dispatch('user/changePassword', passwordData)
    },
    onBeforeUpdateUser (updatedData) {
      if (updatedData) {
        try {
          this.$store.dispatch('user/update', { customer: updatedData })
        } catch (err) {
          this.$bus.$emit('myAccount-before-remainInEditMode', this.$props.activeBlock)
          Logger.error(err)()
        }
      }
    }
  },
  metaInfo () {
    return {
      title: this.$route.meta.title || i18n.t('My Account'),
      meta: this.$route.meta.description ? [{ vmid: 'description', description: this.$route.meta.description }] : []
    }
  },
  asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data
    return new Promise((resolve, reject) => {
      if (context) context.output.cacheTags.add(`my-account`)
      resolve()
    })
  }
}
