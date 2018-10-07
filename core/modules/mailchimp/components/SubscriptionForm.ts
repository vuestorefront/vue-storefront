
import { required, email } from 'vuelidate/lib/validators'
import i18n from '@vue-storefront/i18n'

/**
 * Newsletter subscription form component.
 *
 * #### Data
 * - **`email`** - email that will be used for subscription, validated with vuelidate (email, required)
 * #### Methods
 * - **`subscribe()`** dispatches `newsletter-mailchimp/subscribe` with `email` data property
 *
 */
export const SubscriptionForm = {
  data () {
    return {
      email: '1234'
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  mounted () {
    if (this.$store.state.user.current) {
      this.email = this.$store.state.user.current.email
    }
  },
  methods: {
    submit () {
      if (!this.$v.$invalid) {
        this.$store.dispatch('mailchimp/subscribe').then(res => {
          this.$emit('subscribed', res)
        }).catch(err => 
          this.$emit('subscription-error', err)
        )} else {
        this.$emit('validation-error')
      }
    }
  }
}
