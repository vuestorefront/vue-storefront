import { subscribe, unsubscribe, isSubscribed } from '@vue-storefront/core/modules/mailchimp/features'

export default {
  name: 'MyNewsletter',
  data () {
    return {
      user: {
        isSubscribed: false
      }
    }
  },
  methods: {
    updateNewsletter () {
      if (this.user.isSubscribed) {
        this.subscribe(this.$store.state.user.current.email)
      } else {
        this.unsubscribe(this.$store.state.user.current.email)
      }
      this.$store.dispatch('user/updatePreferences', { isSubscribed: this.user.isSubscribed })
      this.exitSection()
    }
  },
  mixins: [subscribe, unsubscribe, isSubscribed]
}
