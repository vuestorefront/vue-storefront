<template>
  <div class="order-review pt20">
    <div class="row pl20">
      <div class="col-xs-2">
        <div
          class="number-circle lh35 cl-white brdr-circle align-center weight-700"
          :class="{ 'bg-cl-th-accent' : isActive || isFilled, 'bg-cl-tertiary' : !isFilled && !isActive }"
        >
          {{ (isVirtualCart ? 3 : 4) }}
        </div>
      </div>
      <div class="col-xs-10">
        <div class="row">
          <div class="col-md-12" :class="{ 'cl-bg-tertiary' : !isFilled && !isActive }">
<!--            // Edited By Dan-->
            <h3 class="m0 mb5">
              {{ $t('Place the order') }}
            </h3>
          </div>
        </div>
      </div>
    </div>
    <div class="row pl20 pr20" v-show="isActive">
      <div class="hidden-xs col-sm-2 col-md-1" />
      <div class="col-xs-12 col-sm-9 col-md-11">
        <div id="checkout-order-review-additional-container">
          <div id="checkout-order-review-additional">
&nbsp;
          </div>
        </div>
<!--        <div class="row mb15 mt20">-->
<!--        // Edited by Dan, to compensate for disabled elements-->
        <div class="row mb15" style="margin-top: -50px;">
          <div class="col-sm-12">
            <p class="h4" v-show="!'Disabled by Dan'">
              {{ $t('Please check if all data are correct') }}
            </p>
            <div class="row">
              <div class="cartsummary-wrapper">
                <cart-summary />
              </div>
              <base-checkbox
                class="col-xs-11 col-sm-12 col-md-8 bg-cl-secondary p15 mb35 ml10"
                v-show="!'Disabled by Dan'"
                id="acceptTermsCheckbox"
                @blur="$v.orderReview.terms.$touch()"
                v-model="orderReview.terms"
                :validations="[{
                  condition: !$v.orderReview.terms.required && $v.orderReview.terms.$error,
                  text: $t('Field is required')
                }]"
              >
                {{ $t('I agree to') }}
                <span
                  class="link pointer"
                  @click.prevent="$bus.$emit('modal-toggle', 'modal-terms')"
                >
                  {{ $t('Terms and conditions') }}
                </span>
              </base-checkbox>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-show="isActive">
      <div class="hidden-xs col-sm-2 col-md-1" />
      <div class="col-xs-12 col-sm-9 col-md-11">
        <div class="row">
          <div class="col-xs-12 col-md-8 px20" style="margin-top: 3rem!important;">
            <slot name="placeOrderButton">
              <button-full
                @click.native="placeOrder"
                data-testid="orderReviewSubmit"
                class="place-order-btn"
                :disabled="$v.orderReview.$invalid"
              >
                {{ $t('Payment') }}
              </button-full>
            </slot>
          </div>
        </div>
      </div>
    </div>

    <modal name="modal-terms">
      <p slot="header">
        {{ $t('Terms and conditions') }}
      </p>
      <div slot="content">
        <p>
          This website ("website") is operated by Luma Inc., which includes Luma stores, and Luma Private Sales. This privacy policy only covers information collected at this website, and does not cover any information collected offline by Luma. All Luma websites are covered by this privacy policy.
        </p>
        <h2>
          Luma Security
        </h2>
        <p>
          Personal information provided on the website and online credit card transactions are transmitted through a secure server. We are committed to handling your personal information with high standards of information security. We take appropriate physical, electronic, and administrative steps to maintain the security and accuracy of personally identifiable information we collect, including limiting the number of people who have physical access to our database servers, as well as employing electronic security systems and password protections that guard against unauthorized access.
        </p>
        <h2>
          Luma Privacy Policy
        </h2>
        <p>
          To help us achieve our goal of providing the highest quality products and services, we use information from our interactions with you and other customers, as well as from other parties. Because we respect your privacy, we have implemented procedures to ensure that your personal information is handled in a safe, secure, and responsible manner. We have posted this privacy policy in order to explain our information collection practices and the choices you have about the way information is collected and used.
        </p>
        <p>
          As we continue to develop the Luma website and take advantage of advances in technology to improve the services we offer, this privacy policy likely will change. We therefore encourage you to refer to this policy on an ongoing basis so that you understand our current privacy policy.
        </p>
      </div>
    </modal>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import Composite from '@vue-storefront/core/mixins/composite'

import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox'
import ButtonFull from 'theme/components/theme/ButtonFull'
import CartSummary from 'theme/components/core/blocks/Checkout/CartSummary'
import Modal from 'theme/components/core/Modal'
import { OrderReview } from '@vue-storefront/core/modules/checkout/components/OrderReview'
import { OrderModule } from '@vue-storefront/core/modules/order'
import { registerModule } from '@vue-storefront/core/lib/modules'

import { mapGetters } from 'vuex'
import ProCCTransactionDone from 'theme/components/procc/ProCCTransactionDone.vue'

export default {
  components: {
    BaseCheckbox,
    ButtonFull,
    CartSummary,
    ProCCTransactionDone,
    Modal
  },
  data () {
    return {
      payment: this.$store.state.checkout.paymentDetails,
      storeImage: {},
      transactionId: ''
    }
  },
  computed: {
    ...mapGetters({
      getTotals: 'cart/getTotals',
      currentImage: 'procc/getHeadImage',
      currentCart: 'carts/getCartToken'
    })
  },
  mixins: [OrderReview, Composite],
  validations: {
    orderReview: {
      terms: {
        required
      }
    }
  },
  beforeCreate () {
    registerModule(OrderModule)
  },
  mounted () {
    this.$nextTick(() => {
      this.orderReview.terms = true // Added by Dan
      this.$bus.$emit('scrollCheckoutBottom') // Added by Dan
    })
    window.callPlaceOrder = (transactionId) => { // ProCC MangoPay Handler
      let BrandId = this.currentImage.brand
      this.transactionId = transactionId
      this.ProCcAPI.updateTransactionStatus({mangopay_transaction_id: transactionId}, BrandId).then((result) => {
        this.transactionId = result.data.transaction._id
        if (result.data.message_type === 'success') {
          // emit event for place order in megento by shabbir
          this.$bus.$emit('place-magento-order', {transactionId})
        }else {
          this.$bus.$emit('notification-progress-stop');
          this.$store.dispatch('notification/spawnNotification', {
            type: 'error',
            message: this.$t('Transaction was not done!!!!'),
            action1: { label: this.$t('OK') }
          })
        }
      }).catch(err => {
        Logger.error(err, 'Transaction was not Done!!')()
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: this.$t('Transaction was not done!!!!'),
          action1: { label: this.$t('OK') }
        })
      })
    }
  },
  methods: {
    onSuccess () {
    },
    onFailure (result) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: this.$t(result.result),
        action1: { label: this.$t('OK') }
      })
    },
    ProCCOrderPayment () {
      console.log('this.getTotals: ', this.getTotals)
      let amount
      for (let segment of this.getTotals){
        if(segment.code === 'grand_total'){
          amount = segment.value
        }
      }

      let data = {
        'PaymentType': 'CARD',
        'ExecutionType': 'WEB',
        'DebitedFunds': {
          'Currency': 'EUR',
          'Amount': amount * 100
        },
        'Fees': {
          'Currency': 'EUR',
          'Amount': 0
        },
        'ReturnURL': this.config.server.url + '/transactionDone', //  store url
        'CardType': 'CB_VISA_MASTERCARD',
        'SecureMode': 'DEFAULT',
        'Culture': 'EN',
        'brand': this.currentImage.brand
      }
      console.log('ProCcAPI.mangoPayCheckIn data', data)
      console.log('this.currentImage', this.currentImage)
      this.ProCcAPI.mangoPayCheckIn(data, this.currentImage.brand).then(async (response) => {
        if (response.data.payIn_result && response.data.payIn_result.RedirectURL) {
          console.log('OPENING THE POPUP')
          window.open(response.data.payIn_result.RedirectURL, 'popUpWindow', 'height=700,width=800,left=0,top=0,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes')
        } else {
          this.$store.dispatch('notification/spawnNotification', {
            type: 'error',
            message: this.$t('Something goes Wrong :(  Server could not respond'),
            action1: { label: this.$t('OK') }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .link {
    text-decoration: underline;
  }

  .cartsummary-wrapper {
    @media (min-width: 767px) {
      display: none;
    }
  }
</style>
