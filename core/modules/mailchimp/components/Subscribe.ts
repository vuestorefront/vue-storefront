
import { required, email } from 'vuelidate/lib/validators'

/**
 * Newsletter subscription form component.
 *
 * #### Data
 * - `email` - email that will be used for subscription, validated with vuelidate (email, required)
 * 
 * #### Methods
 * - `submit()` dispatches `newsletter-mailchimp/subscribe` with `email` data property and emits event with subscription result you can listen to in your component
 *  - `subscribed` if action was dispatched succesfully
 *  - `subscription-error` if dispatched action fails
 *  - `validation-error` in case of validation error
 * 
 * ### Hooks
 * - `mounted` - if user is logged in sets it's email to `email` data property
 */
export const Subscribe = {
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
      // argument omitted for validation purposes
      if (!this.$v.$invalid) {
        this.$store.dispatch('mailchimp/subscribe', this.email).then(res => {
          this.$emit('subscribed', res)
        }).catch(err => 
          this.$emit('subscription-error', err)
        )} else {
        this.$emit('validation-error')
      }
    }
  }
}
