import { required, email } from 'vuelidate/lib/validators'

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
    unsubscribe () {
      // argument omitted for validation purposes
      if (!this.$v.$invalid) {
        this.$store.dispatch('newsletter/unsubscribe', this.email).then(res => {
          this.$emit('unsubscribed', res)
        }).catch(err =>
          this.$emit('unsubscription-error', err)
        )
      }
    } 
  }
}
