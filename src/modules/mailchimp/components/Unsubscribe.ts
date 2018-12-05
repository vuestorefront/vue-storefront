export const Unsubscribe = {
  name: 'MailchimpUnsubscribe',
  methods: {
    unsubscribe () {
      this.$store.dispatch('mailchimp/unsubscribe', this.email).then(res => {
        this.$emit('unsubscribed', res)
      }).catch(err => 
        this.$emit('unsubscription-error', err)
      )
    } 
  },
  computed: {
    isSubscribed () {
      return this.$store.state.mailchimp.isSubscribed
    }
  }
}
