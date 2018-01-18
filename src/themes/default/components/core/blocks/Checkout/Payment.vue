<template>
  <div class="payment">
    <div class="row">
      <div class="col-xs-2 col-md-1">
        <div class="number-circle lh35 c-white brdr-circle align-center weight-700" :class="{ 'bg-black' : isActive || isFilled, 'bg-gray' : !isFilled && !isActive }">3</div>
      </div>
      <div class="col-xs-9 col-md-11">
        <div class="row mb15">
          <div class="col-xs-12 col-md-6" :class="{ 'c-gray' : !isFilled && !isActive }">
            <h3 class="m0 mb5">Payment</h3>
          </div>
          <div class="col-xs-12 col-md-6 pr30">
            <div class="lh30 flex end-md" v-if="isFilled && !isActive">
              <a href="#" class="c-lightgray-secondary flex" @click.prevent="edit">
                <span class="pr5">Edit payment</span>
                <i class="material-icons c-lightgray-secondary">edit</i>
              </a>
            </div>
          </div>
        </div>
        <div class="row" v-show="this.isActive">
          <div class="col-xs-12 col-sm-12 mb15">
            <div class="checkboxStyled">
              <input type="checkbox" v-model="sendToShippingAddress" id="sendToShippingAddressCheckbox" @click="useShippingAddress">
              <label for="sendToShippingAddressCheckbox"></label>
            </div>
            <div class="checkboxText ml15 lh25" @click="useShippingAddress">
              <span class="fs16 c-darkgray">Copy address data from shipping</span>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 mb15" v-show="hasBillingData()">
            <div class="checkboxStyled">
              <input type="checkbox" v-model="sendToBillingAddress" id="sendToBillingAddressCheckbox" @click="useBillingAddress">
              <label for="sendToBillingAddressCheckbox"></label>
            </div>
            <div class="checkboxText ml15 lh25" @click="useBillingAddress">
              <span class="fs16 c-darkgray">Use my billing data</span>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 mb25">
            <input type="text" name="first-name" placeholder="First name" v-model.trim="payment.firstName" @blur="$v.payment.firstName.$touch()" autocomplete="given-name" >
            <span class="validation-error" v-if="$v.payment.firstName.$error && !$v.payment.firstName.required">Field is required</span>
            <span class="validation-error" v-if="!$v.payment.firstName.minLength">Name must have at least {{$v.payment.firstName.$params.minLength.min}} letters.</span>
          </div>
          <div class="col-xs-12 col-sm-6 mb25">
            <input type="text" name="last-name" placeholder="Last name" v-model.trim="payment.lastName" @blur="$v.payment.lastName.$touch()" autocomplete="family-name">
            <span class="validation-error" v-if="$v.payment.lastName.$error && !$v.payment.lastName.required">Field is required</span>
          </div>
          <div class="col-xs-12 col-sm-12 mb25">
            <input type="text" name="street-address" placeholder="Street name" v-model.trim="payment.streetAddress" @blur="$v.payment.streetAddress.$touch()" autocomplete="payment address-line1" :disabled="sendToShippingAddress || sendToBillingAddress">
            <span class="validation-error" v-if="$v.payment.streetAddress.$error && !$v.payment.streetAddress.required">Field is required</span>
          </div>
          <div class="col-xs-12 col-sm-12 mb25">
            <input type="text" name="apartment-number" placeholder="House/Apartment number" v-model.trim="payment.apartmentNumber" @blur="$v.payment.apartmentNumber.$touch()" autocomplete="address-line2" :disabled="sendToShippingAddress || sendToBillingAddress">
            <span class="validation-error" v-if="$v.payment.apartmentNumber.$error && !$v.payment.apartmentNumber.required">Field is required</span>
          </div>
          <div class="col-xs-12 col-sm-6 mb25">
            <input type="text" name="city" placeholder="City" v-model.trim="payment.city" @blur="$v.payment.city.$touch()" autocomplete="address-level2" :disabled="sendToShippingAddress || sendToBillingAddress">
            <span class="validation-error" v-if="$v.payment.city.$error && !$v.payment.city.required">Field is required</span>
          </div>
          <div class="col-xs-12 col-sm-6 mb25">
            <input type="text" name="state" placeholder="State / Province" v-model.trim="payment.state" autocomplete="address-level1" :disabled="sendToShippingAddress || sendToBillingAddress">
          </div>
          <div class="col-xs-12 col-sm-6 mb25">
            <input type="text" name="zip-code" placeholder="Zip-code" v-model.trim="payment.zipCode" @blur="$v.payment.zipCode.$touch()" autocomplete="postal-code" :disabled="sendToShippingAddress || sendToBillingAddress">
            <span class="validation-error" v-if="$v.payment.zipCode.$error && !$v.payment.zipCode.required">Field is required</span>
            <span class="validation-error" v-if="!$v.payment.zipCode.minLength">Zip-code must have at least {{$v.payment.zipCode.$params.minLength.min}} letters.</span>
          </div>
          <div class="col-xs-12 col-sm-6 mb25">
            <select name="countries" v-model="payment.country" @change="$v.payment.country.$touch()" autocomplete="country" :disabled="sendToShippingAddress || sendToBillingAddress">
              <option value="" disabled selected hidden>Country</option>
              <option v-for="country in countries" :value="country.code">{{ country.name }}</option>
            </select>
            <span class="validation-error" v-if="$v.payment.country.$error && !$v.payment.country.required">Field is required</span>
          </div>
          <div class="col-xs-12 col-sm-12 mb25">
            <input type="text" name="phone-number" placeholder="Phone Number" v-model.trim="payment.phoneNumber">
          </div>
          <div class="col-xs-12 col-sm-12 mb15">
            <div class="checkboxStyled">
              <input type="checkbox" v-model="generateInvoice" id="generateInvoiceCheckbox" @click="useGenerateInvoice">
              <label for="generateInvoiceCheckbox"></label>
            </div>
            <div class="checkboxText ml15 lh25" @click="useGenerateInvoice">
              <span class="fs16 c-darkgray">I want to generate an invoice for the company</span>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 mb25" v-show="generateInvoice">
            <input type="text" name="company-name" placeholder="Company name" v-model.trim="payment.company" @blur="$v.payment.company.$touch()" autocomplete="company-name" :disabled="sendToBillingAddress">
            <span class="validation-error" v-if="this.generateInvoice && $v.payment.company.$error && !$v.payment.company.required">Field is required</span>
          </div>
          <div class="col-xs-12 col-sm-12 mb25" v-show="generateInvoice">
            <input type="text" name="tax-id" placeholder="Tax identification number" v-model.trim="payment.taxId" @blur="$v.payment.taxId.$touch()" autocomplete="tax-id" :disabled="sendToBillingAddress">
            <span class="validation-error" v-if="this.generateInvoice && $v.payment.taxId.$error && !$v.payment.taxId.required">Field is required</span>
            <span class="validation-error" v-if="this.generateInvoice && !$v.payment.taxId.minLength">Tax identification number must have at least {{$v.payment.taxId.$params.minLength.min}} letters.</span>
          </div>
          <div class="col-xs-12 col-sm-12 mb25" v-show="generateInvoice">
            <label class="fs16">We will send you the invoice to given e-mail address</label>
          </div>
          <div class="col-xs-12">
            <h4>Payment method</h4>
          </div>
          <div v-for="(method, index) in paymentMethods" :key="index" class="col-md-6 mb15">
            <label><input type="radio" :value="method.code" name="paymentmethod" v-model="payment.paymentMethod"> {{ method.name }} </label>
          </div>
          <span class="validation-error" v-if="!$v.payment.paymentMethod.required">Field is required</span>
          <div class="col-xs-12 my30">
            <button-full @click.native="sendDataToCheckout" text="Go review the order" :class="{ 'ripple': true, 'button-disabled' : $v.payment.$invalid}"/>
          </div>
        </div>
        <div class="row fs16 mb35" v-show="isFilled">
          <div class="col-xs-12 h4">  
            <p>
              {{ payment.firstName }} {{ payment.lastName }}
            </p>
            <p>
              {{ payment.streetAddress }} {{ payment.apartmentNumber }}</span>
            </p>
            <p>
              {{ payment.city }} {{ payment.zipCode }}
            </p>
            <p>
              <span v-show="payment.state">{{ payment.state }}, </span>
              <span>{{ getCountryName() }}</span>
            </p>
            <p v-show="payment.phoneNumber">
              <span class="pr15">{{ payment.phoneNumber }}</span>
              <tooltip>Phone number may be needed by carrier</tooltip>
            </p>
            <p v-show="generateInvoice">
              {{ payment.company }} {{ payment.taxId }}
            </p>
            <div class="col-xs-12">
              <h4>Payment method</h4>
            </div>
            <div class="col-md-6 mb15">
              <label><input type="radio" name="chosen-payment-method" value="" checked disabled> {{ getPaymentMethod().name }} </label>
            </div>
          </div>
          <div class="col-md-6 h4">
          </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'
import { coreComponent } from 'lib/themes'
import PaymentMethods from 'src/resource/payment_methods.json'
import Countries from 'src/resource/countries.json'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import Tooltip from 'theme/components/core/Tooltip.vue'

export default {
  props: ['isActive'],
  validations () {
    if (!this.generateInvoice) {
      return {
        payment: {
          firstName: {
            required,
            minLength: minLength(3)
          },
          lastName: {
            required
          },
          country: {
            required
          },
          streetAddress: {
            required
          },
          apartmentNumber: {
            required
          },
          zipCode: {
            required,
            minLength: minLength(5)
          },
          city: {
            required
          },
          paymentMethod: {
            required
          }
        }
      }
    } else {
      return {
        payment: {
          firstName: {
            required,
            minLength: minLength(3)
          },
          lastName: {
            required
          },
          company: {
            required
          },
          taxId: {
            required,
            minLength: minLength(3)
          },
          country: {
            required
          },
          streetAddress: {
            required
          },
          apartmentNumber: {
            required
          },
          zipCode: {
            required,
            minLength: minLength(5)
          },
          city: {
            required
          },
          paymentMethod: {
            required
          }
        }
      }
    }
  },
  data () {
    return {
      isFilled: false,
      paymentMethods: PaymentMethods,
      countries: Countries,
      payment: this.$store.state.checkout.paymentDetails,
      generateInvoice: false,
      sendToShippingAddress: false,
      sendToBillingAddress: false
    }
  },
  computed: {
    ...mapState({
      currentUser: state => state.user.current
    })
  },
  mounted () {
    if (this.payment.firstName.length === 0) {
      this.initializeBillingAddress()
    }
  },
  methods: {
    sendDataToCheckout () {
      this.$bus.$emit('checkout.payment', this.payment, this.$v)
      this.isFilled = true
    },
    edit () {
      if (this.isFilled) {
        this.$bus.$emit('checkout.edit', 'payment')
        this.isFilled = false
      }
    },
    hasBillingData () {
      if (this.currentUser) {
        if (this.currentUser.hasOwnProperty('default_billing')) {
          return true
        }
      }
      return false
    },
    initializeBillingAddress () {
      let initialized = false
      if (this.currentUser) {
        if (this.currentUser.hasOwnProperty('default_billing')) {
          let id = this.currentUser.default_billing
          let addresses = this.currentUser.addresses
          for (let i = 0; i < addresses.length; i++) {
            if (addresses[i].id === Number(id)) {
              this.payment = {
                firstName: addresses[i].firstname,
                lastName: addresses[i].lastname,
                company: addresses[i].company,
                country: addresses[i].country_id,
                state: addresses[i].region.region ? addresses[i].region.region : '',
                city: addresses[i].city,
                streetAddress: addresses[i].street[0],
                apartmentNumber: addresses[i].street[1],
                zipCode: addresses[i].postcode,
                taxId: addresses[i].vat_id,
                paymentMethod: 'cashondelivery'
              }
              this.generateInvoice = true
              this.sendToBillingAddress = true
              initialized = true
            }
          }
        }
      }
      if (!initialized) {
        this.payment = {
          firstName: '',
          lastName: '',
          company: '',
          country: '',
          state: '',
          city: '',
          streetAddress: '',
          apartmentNumber: '',
          postcode: '',
          phoneNumber: '',
          taxId: '',
          paymentMethod: 'cashondelivery'
        }
      }
    },
    useShippingAddress () {
      this.sendToShippingAddress = !this.sendToShippingAddress
      if (this.sendToShippingAddress) {
        let shippingDetails = this.$store.state.checkout.shippingDetails
        this.payment = {
          firstName: shippingDetails.firstName,
          lastName: shippingDetails.lastName,
          country: shippingDetails.country,
          state: shippingDetails.state,
          city: shippingDetails.city,
          streetAddress: shippingDetails.streetAddress,
          apartmentNumber: shippingDetails.apartmentNumber,
          zipCode: shippingDetails.zipCode,
          phoneNumber: shippingDetails.phoneNumber,
          paymentMethod: 'cashondelivery'
        }
        this.sendToBillingAddress = false
        this.generateInvoice = false
      } else {
        this.payment = this.$store.state.checkout.paymentDetails
        this.generateInvoice = false
      }
    },
    useBillingAddress () {
      this.sendToBillingAddress = !this.sendToBillingAddress
      if (this.sendToBillingAddress) {
        let id = this.currentUser.default_billing
        let addresses = this.currentUser.addresses
        for (let i = 0; i < addresses.length; i++) {
          if (addresses[i].id === Number(id)) {
            this.payment = {
              firstName: addresses[i].firstname,
              lastName: addresses[i].lastname,
              company: addresses[i].company,
              country: addresses[i].country_id,
              state: addresses[i].region.region ? addresses[i].region.region : '',
              city: addresses[i].city,
              streetAddress: addresses[i].street[0],
              apartmentNumber: addresses[i].street[1],
              zipCode: addresses[i].postcode,
              taxId: addresses[i].vat_id,
              paymentMethod: 'cashondelivery'
            }
            this.generateInvoice = true
          }
        }
        this.sendToShippingAddress = false
      } else {
        this.payment = this.$store.state.checkout.paymentDetails
        this.generateInvoice = false
      }
    },
    useGenerateInvoice () {
      this.generateInvoice = !this.generateInvoice
      if (!this.generateInvoice) {
        this.payment.company = ''
        this.payment.taxId = ''
      }
    },
    getCountryName () {
      for (let i = 0; i < this.countries.length; i++) {
        if (this.countries[i].code === this.payment.country) {
          return this.countries[i].name
        }
      }
      return ''
    },
    getPaymentMethod () {
      for (let i = 0; i < PaymentMethods.length; i++) {
        if (PaymentMethods[i].code === this.payment.paymentMethod) {
          return {
            name: PaymentMethods[i].name
          }
        }
      }
      return {
        name: ''
      }
    }
  },
  components: {
    ButtonFull,
    Tooltip
  },
  mixins: [coreComponent('core/blocks/Checkout/Payment')]
}
</script>
