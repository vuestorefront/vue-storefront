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
    unsubscribe () {
      this.$store.dispatch('mailchimp/unsubscribe', this.email).then(res => {
        this.user.isSubscribed = false
      }).catch(err =>
        this.$emit('unsubscription-error', err)
      )
    },
    subscribe () {
      this.$store.dispatch('mailchimp/subscribe', this.email).then(res => {
        this.user.isSubscribed = true
      }).catch(err =>
        this.$emit('subscription-error', err)
      )
    },
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
