import { required, email } from 'vuelidate/lib/validators'

/**
 * Newsletter subscription form component.
 *
 * #### Data
 * - `email: String` - email that will be used for subscription, validated with vuelidate (email, required)
 *
 * #### Methods
 * - `subscribe(success?: Function, failure?: Function)` dispatches `newsletter/subscribe` with `email` data property. `success(res)` and `failure(err)` are callback functions called depending on subscription result and contain response info or error.
 *
 */
export default {
  name: 'NewsletterSubscribe',
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
    subscribe (success?: Function, failure?: Function) {
      // argument omitted for validation purposes
      if (!this.$v.$invalid) {
        return this.$store.dispatch('newsletter/subscribe', this.email).then(res => {
          if (success) success(res)
        }).catch(err => {
          if (failure) failure(err)
        }
        )
      }
    }
  }
}
