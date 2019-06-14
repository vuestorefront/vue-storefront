import { mapState, mapGetters } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import i18n from '@vue-storefront/i18n'
import { Logger } from '@vue-storefront/core/lib/logger'

export const OrderReview = {
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
  computed: {
    ...mapState({
      shippingDetails: (state: RootState) => state.checkout.shippingDetails
    }),
    ...mapGetters({
      isVirtualCart: 'cart/isVirtualCart'
    })
  },
  methods: {
    placeOrder () {
      if (this.$store.state.checkout.personalDetails.createAccount) {
        this.register()
      } else {
        this.$bus.$emit('checkout-before-placeOrder')
      }
    },
    async register () {
      this.$bus.$emit('notification-progress-start', i18n.t('Registering the account ...'))
      this.$store.dispatch('user/register', {
        email: this.$store.state.checkout.personalDetails.emailAddress,
        password: this.$store.state.checkout.personalDetails.password,
        firstname: this.$store.state.checkout.personalDetails.firstName,
        lastname: this.$store.state.checkout.personalDetails.lastName,
        addresses: [{
          firstname: this.shippingDetails.firstName,
          lastname: this.shippingDetails.lastName,
          street: [this.shippingDetails.streetAddress, this.shippingDetails.apartmentNumber],
          city: this.shippingDetails.city,
          ...(this.shippingDetails.state ? { region: { region: this.shippingDetails.state } } : {}),
          country_id: this.shippingDetails.country,
          postcode: this.shippingDetails.zipCode,
          ...(this.shippingDetails.phoneNumber ? { telephone: this.shippingDetails.phoneNumber } : {}),
          default_shipping: true
        }]
      }).then(async (result) => {
        this.$bus.$emit('notification-progress-stop')
        if (result.code !== 200) {
          this.onFailure(result)
          // If error includes a word 'password', emit event that eventually focuses on a corresponding field
          if (result.result.includes(i18n.t('password'))) {
            this.$bus.$emit('checkout-after-validationError', 'password')
          }
          // If error includes a word 'mail', emit event that eventually focuses on a corresponding field
          if (result.result.includes(i18n.t('email'))) {
            this.$bus.$emit('checkout-after-validationError', 'email-address')
          }
        } else {
          this.$bus.$emit('modal-hide', 'modal-signup')
          await this.$store.dispatch('user/setCurrentUser', result.result) // set current user data to process it with the current order
          this.$bus.$emit('checkout-before-placeOrder', result.result.id)
          this.onSuccess()
        }
      }).catch(err => {
        this.$bus.$emit('notification-progress-stop')
        Logger.error(err, 'checkout')()
      })
    }
  }
}
