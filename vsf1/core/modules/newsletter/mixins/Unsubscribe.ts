import { required, email } from 'vuelidate/lib/validators'

/**
 * Newsletter subscription form component.
 *
 * #### Data
 * - `email: String` - email that will be used for subscription, validated with vuelidate (email, required)
 *
 * #### Methods
 * - `unsubscribe(success?: Function, failure?: Function)` dispatches `newsletter/unsubscribe` with `email` data property. `success(res)` and `failure(err)` are callback functions called depending on subscription result and contain response info or error.
 *
 */
export default {
  name: 'NewsletterUnsubscribe',
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
    unsubscribe (success?: Function, failure?: Function) {
      // argument omitted for validation purposes
      if (!this.$v.$invalid) {
        return this.$store.dispatch('newsletter/unsubscribe', this.email).then(res => {
          if (success) success(res)
          this.$emit('unsubscribed', res)
        }).catch(err => {
          if (failure) failure(err)
          this.$emit('unsubscription-error', err)
        })
      }
    }
  }
}
