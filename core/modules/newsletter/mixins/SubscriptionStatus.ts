import { required, email } from 'vuelidate/lib/validators'

/**
 * Newsletter subscription form component.
 *
 * #### Data
 * - `email: String` - email that will be used for subscription, validated with vuelidate (email, required)
 *
 * ### Computed
 * - `isSubscribed: boolean` - returns true if user subscribed to the newsletter in this session
 *
 * #### Methods
 * - `checkStatus(success?: Function, failure?: Function)` dispatches `newsletter/status` with `email` data property. `success(res)` and `failure(err)` are callback functions called depending on subscription result and contain response info or error.
 *
 */
export default {
  name: 'SubscriptionStatus',
  data () {
    return {
      email: '',
      user: {
        isSubscribed: false
      }
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    async onLoggedIn () {
      this.email = this.$store.state.user.current.email
      this.user.isSubscribed = await this.$store.dispatch('newsletter/status', this.email)
    }
  },
  beforeMount () {
    // the user might already be logged in, so check the subscription status
    if (this.$store.state.user.current) this.onLoggedIn()
    this.$bus.$on('user-after-loggedin', this.onLoggedIn)
  },
  beforeDestroy () {
    this.$bus.$off('user-after-loggedin', this.onLoggedIn)
  },
  computed: {
    isSubscribed (): boolean {
      return this.$store.getters['newsletter/isSubscribed']
    }
  }
}
