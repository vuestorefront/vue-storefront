import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
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
        EventBus.$emit('checkout-before-placeOrder')
      }
    },
    async register () {
      EventBus.$emit('notification-progress-start', i18n.t('Registering the account ...'))

      try {
        const region = this.getShippingDetails.state || this.getShippingDetails.region_id ? {
          region: {
            region: this.getShippingDetails.state || null,
            region_id: this.getShippingDetails.region_id || null
          }
        } : {};
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
            ...region,
            country_id: this.getShippingDetails.country,
            postcode: this.getShippingDetails.zipCode,
            ...(this.getShippingDetails.phoneNumber ? { telephone: this.getShippingDetails.phoneNumber } : {}),
            default_shipping: true
          }]
        })

        if (result.code !== 200) {
          EventBus.$emit('notification-progress-stop')
          this.onFailure(result)
          // If error includes a word 'password', emit event that eventually focuses on a corresponding field
          if (result.result.includes(i18n.t('password'))) {
            EventBus.$emit('checkout-after-validationError', 'password')
          }
          // If error includes a word 'mail', emit event that eventually focuses on a corresponding field
          if (result.result.includes(i18n.t('email'))) {
            EventBus.$emit('checkout-after-validationError', 'email-address')
          }
        } else {
          EventBus.$emit('modal-hide', 'modal-signup')
          await this.$store.dispatch('user/login', {
            username: this.getPersonalDetails.emailAddress,
            password: this.getPersonalDetails.password
          })
          EventBus.$emit('notification-progress-stop')
          EventBus.$emit('checkout-before-placeOrder', result.result.id)
        }
      } catch (err) {
        EventBus.$emit('notification-progress-stop')
        Logger.error(err, 'checkout')()
      }
    }
  }
}
