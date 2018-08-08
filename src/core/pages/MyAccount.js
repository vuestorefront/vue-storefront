// Core dependecies
import i18n from '@vue-storefront/core/lib/i18n'

// Core mixins
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
  created () {
    this.$bus.$on('myAccount-before-updateUser', this.onBeforeUpdateUser)
    this.$bus.$on('myAccount-before-changePassword', this.onBeforeChangePassword)
    this.$bus.$on('myAccount-before-updatePreferences', this.onBeforeUpdatePreferences)
  },
  destroyed () {
    this.$bus.$off('myAccount-before-updateUser', this.onBeforeUpdateUser)
    this.$bus.$off('myAccount-before-changePassword', this.onBeforeChangePassword)
    this.$bus.$off('myAccount-before-updatePreferences', this.onBeforeUpdatePreferences)
  },
  mounted () {
    const usersCollection = global.$VS.db.usersCollection
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
    onBeforeUpdatePreferences (updatedData) {
      if (updatedData) {
        if (updatedData.action === 'subscribe') {
          this.$bus.$emit('newsletter-after-subscribe', { email: updatedData.email })
          this.$store.dispatch('user/updatePreferences', updatedData.preferences)
        } else {
          this.$bus.$emit('newsletter-after-unsubscribe', { email: updatedData.email })
          this.$store.dispatch('user/updatePreferences', null)
        }
      }
    },
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
  }
}
