
import { required, email } from 'vuelidate/lib/validators'

/**
 * Newsletter subscription form component.
 *
 * #### Data
 * - `email` - email that will be used for subscription, validated with vuelidate (email, required)
 * 
 * ### Computed
 * - `isSubscribed` - returns true if user subscribed to the newsletter in this session
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
      email: ''
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    submit (success, failure) {
      // argument omitted for validation purposes
      if (!this.$v.$invalid) {
        this.$store.dispatch('mailchimp/subscribe', this.email).then(res => {
          if (success) success()
        }).catch(err => {
          if (failure) failure()
        }
      )}
    }
  },
  computed: {
    isSubscribed () {
      return this.$store.state.mailchimp.subscribed
    }
  },
}
