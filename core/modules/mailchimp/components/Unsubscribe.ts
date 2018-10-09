export const Unsubscribe = {
  mounted () {
    this.$store.dispatch('mailchimp/loadStateFromCache')
  },
  methods: {
    unsubscrive () {
      this.$store.dispatch('mailchimp/unsubscribe', this.email).then(res => {
        this.$emit('subscribed', res)
      }).catch(err => 
        this.$emit('subscription-error', err)
      )
    } 
  }
}
