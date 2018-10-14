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
 * - `submit(success, failure)` dispatches `newsletter-mailchimp/subscribe` with `email` data property. `success(res)` and `failure(err)` are callback functions called depending on subscription result and contain response info or error.
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
          if (success) success(res)
        }).catch(err => {
          if (failure) failure(err)
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
