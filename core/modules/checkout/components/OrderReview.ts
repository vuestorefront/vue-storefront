import { mapGetters } from 'vuex'
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
    ...mapGetters({
      isVirtualCart: 'cart/isVirtualCart',
      getShippingDetails: 'checkout/getShippingDetails',
      getPersonalDetails: 'checkout/getPersonalDetails'
    })
  },
  methods: {
    placeOrder () {
      if (this.getPersonalDetails.createAccount) {
        this.register()
      } else {
        this.$bus.$emit('checkout-before-placeOrder')
      }
    },
    async register () {
      this.$bus.$emit('notification-progress-start', i18n.t('Registering the account ...'))

      try {
        const result = await this.$store.dispatch('user/register', {
          email: this.getPersonalDetails.emailAddress,
          password: this.getPersonalDetails.password,
          firstname: this.getPersonalDetails.firstName,
          lastname: this.getPersonalDetails.lastName,
          addresses: [{
            firstname: this.getShippingDetails.firstName,
            lastname: this.getShippingDetails.lastName,
            street: [this.getShippingDetails.streetAddress, this.getShippingDetails.apartmentNumber],
            city: this.getShippingDetails.city,
            ...(this.getShippingDetails.state ? { region: { region: this.getShippingDetails.state } } : {}),
            country_id: this.getShippingDetails.country,
            postcode: this.getShippingDetails.zipCode,
            ...(this.getShippingDetails.phoneNumber ? { telephone: this.getShippingDetails.phoneNumber } : {}),
            default_shipping: true
          }]
        })

        if (result.code !== 200) {
          this.$bus.$emit('notification-progress-stop')
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
          await this.$store.dispatch('user/login', {
            username: this.getPersonalDetails.emailAddress,
            password: this.getPersonalDetails.password
          })
          this.$bus.$emit('notification-progress-stop')
          this.$bus.$emit('checkout-before-placeOrder', result.result.id)
          this.onSuccess()
        }
      } catch (err) {
        this.$bus.$emit('notification-progress-stop')
        Logger.error(err, 'checkout')()
      }
    }
  }
}
