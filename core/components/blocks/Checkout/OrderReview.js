import i18n from '@vue-storefront/i18n'

export default {
  name: 'OrderReview',
  props: {
    isActive: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      isFilled: false,
      orderReview: {
        terms: false
      }
    }
  },
  methods: {
    placeOrder () {
      if (this.$store.state.checkout.personalDetails.createAccount) {
        this.register()
      } else {
        this.$bus.$emit('checkout-before-placeOrder')
      }
    },
    register () {
      this.$bus.$emit('notification-progress-start', i18n.t('Registering the account ...'))
      this.$store.dispatch('user/register', {
        email: this.$store.state.checkout.personalDetails.emailAddress,
        password: this.$store.state.checkout.personalDetails.password,
        firstname: this.$store.state.checkout.personalDetails.firstName,
        lastname: this.$store.state.checkout.personalDetails.lastName
      }).then((result) => {
        this.$bus.$emit('notification-progress-stop')
        if (result.code !== 200) {
          this.$bus.$emit('notification', {
            type: 'error',
            message: i18n.t(result.result),
            action1: { label: i18n.t('OK'), action: 'close' }
          })
          // If error includes a word 'password', emit event that eventually focuses on a corresponding field
          if (result.result.includes(i18n.t('password'))) {
            this.$bus.$emit('checkout-after-validationError', 'password')
          }
          // If error includes a word 'mail', emit event that eventually focuses on a corresponding field
          if (result.result.includes(i18n.t('email'))) {
            this.$bus.$emit('checkout-after-validationError', 'email-address')
          }
        } else {
          this.$bus.$emit('notification', {
            type: 'success',
            message: i18n.t('You are logged in!'),
            action1: { label: i18n.t('OK'), action: 'close' }
          })
          this.$bus.$emit('modal-hide', 'modal-signup')
          this.$bus.$emit('checkout-before-placeOrder', result.result.id)
        }
      }).catch(err => {
        this.$bus.$emit('notification-progress-stop')
        console.error(err)
      })
    }
  }
}
