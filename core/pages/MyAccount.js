import Vue from 'vue'
import i18n from '@vue-storefront/i18n'

import Composite from '@vue-storefront/core/mixins/composite'

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
  mounted () {
    const usersCollection = Vue.prototype.$db.usersCollection
    usersCollection.getItem('current-token', (err, token) => {
      if (err) {
        console.error(err)
      }
      if (!token) {
        this.$router.push('/')
      }
    })
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
          console.error(err)
        }
      }
    },
    notify (title) {
      if (title === 'My loyalty card' || title === 'My product reviews') {
        this.$bus.$emit('notification', {
          type: 'warning',
          message: i18n.t('This feature is not implemented yet! Please take a look at https://github.com/DivanteLtd/vue-storefront/issues for our Roadmap!'),
          action1: { label: i18n.t('OK'), action: 'close' }
        })
      }
    }
  },
  metaInfo () {
    return {
      title: this.$route.meta.title || i18n.t('My Account'),
      meta: this.$route.meta.description ? [{ vmid: 'description', description: this.$route.meta.description }] : []
    }
  },
  asyncData ({ store, route }) { // this is for SSR purposes to prefetch data
    return new Promise((resolve, reject) => {
      store.state.requestContext.outputCacheTags.add(`my-account`)
      resolve()
    })
  }
}
