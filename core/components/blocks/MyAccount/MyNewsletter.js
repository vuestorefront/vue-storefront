import { subscribe, unsubscribe, isSubscribed } from '@vue-storefront/core/modules/newsletter/features'

export default {
  name: 'MyNewsletter',
  data () {
    return {
      user: {
        isSubscribed: false
      },
      isEdited: false
    }
  },
  created () {
    this.$bus.$on('user-after-loggedin', this.getNewsletter)
  },
  destroyed () {
    this.$bus.$off('user-after-loggedin', this.getNewsletter)
  },
  mounted () {
    this.getNewsletter()
  },
  methods: {
    edit () {
      this.isEdited = true
    },
    updateNewsletter () {
      if (this.user.isSubscribed) {
        this.subscribe(this.$store.state.user.current.email)
      } else {
        this.unsubscribe(this.$store.state.user.current.email)
      }
      this.$store.dispatch('user/updatePreferences', { isSubscribed: this.user.isSubscribed })
      this.exitSection()
    },
    exitSection () {
      this.isEdited = false
    },
    getNewsletter () {
      this.user.isSubscribed = this.isSubscribed
    }
  },
  mixins: [subscribe, unsubscribe, isSubscribed]
}
