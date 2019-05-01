// this component is deprecated and is now in Newsletter module
export default {
  name: 'MyNewsletter',
  data() {
    return {
      user: {
        isSubscribed: false
      }
    };
  },
  methods: {
    unsubscribe() {
      this.$store
        .dispatch('mailchimp/unsubscribe', this.$store.state.user.current.email)
        .then(() => {
          this.user.isSubscribed = false;
          this.$store.dispatch('notification/spawnNotification', {
            type: 'success',
            message: this.$t('Unsubscribed from newsletter'),
            action1: { label: this.$t('OK') }
          });
        })
        .catch(err => this.$emit('unsubscription-error', err));
    },
    subscribe() {
      this.$store
        .dispatch('mailchimp/subscribe', this.$store.state.user.current.email)
        .then(() => {
          this.user.isSubscribed = true;
          this.$store.dispatch('notification/spawnNotification', {
            type: 'success',
            message: this.$t('Succesfully subscried to newsletter!'),
            action1: { label: this.$t('OK') }
          });
        })
        .catch(err => this.$emit('subscription-error', err));
    },
    updateNewsletter() {
      if (this.user.isSubscribed) {
        this.subscribe();
      } else {
        this.unsubscribe();
      }
    }
  }
};
