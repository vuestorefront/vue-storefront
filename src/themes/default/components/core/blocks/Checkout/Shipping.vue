<template>
  <div class="shipping">
    <div class="row">
      <div class="col-md-1 col-xs-2">
        <div class="number-circle lh40 c-white brdr-circle align-center weight-700" :class="{ 'bg-black' : isActive || isFilled, 'bg-gray' : !isFilled && !isActive }">2</div>
      </div>
      <div class="col-md-11 col-xs-10">
        <div class="row">
          <div class="col-md-12 mb15" :class="{ 'c-gray' : !isFilled && !isActive }">
            <h3 @click="edit" class="mt5" :class="{'section-editable' : isFilled && !isActive, 'section-disabled' : !isFilled && !isActive }">Shipping</h3>
          </div>
        </div>
        <div class="row" v-show="this.isActive">
          <div class="col-md-6 mb25">
            <input type="text" name="first-name" placeholder="First name" v-model="shipping.firstName">
            <span class="validation-error" v-if="!$v.shipping.firstName.required">Field is required</span>
            <span class="validation-error" v-if="!$v.shipping.firstName.minLength">Name must have at least {{$v.shipping.firstName.$params.minLength.min}} letters.</span>
          </div>
          <div class="col-md-6 mb25">
            <input type="text" name="last-name" placeholder="Last name" v-model="shipping.lastName">
            <span class="validation-error" v-if="!$v.shipping.lastName.required">Field is required</span>
          </div>
          <div class="col-md-12 mb25">
            <input type="text" name="street-address" placeholder="Street address" v-model="shipping.streetAddress">
            <span class="validation-error" v-if="!$v.shipping.streetAddress.required">Field is required</span>
          </div>
          <div class="col-md-12 mb25">
            <input type="text" name="apartment-number" placeholder="Apartment number" v-model="shipping.apartmentNumber">
          </div>
          <div class="col-md-6 mb25">
            <input type="text" name="city" placeholder="City" v-model="shipping.city">
            <span class="validation-error" v-if="!$v.shipping.city.required">Field is required</span>

          </div>
          <div class="col-md-6 mb25">
            <input type="text" name="state" placeholder="State / Province" v-model="shipping.state">
          </div>
          <div class="col-md-6 mb25">
            <input type="text" name="country" placeholder="Zip-code" v-model="shipping.zipCode">
            <span class="validation-error" v-if="!$v.shipping.zipCode.required">Field is required</span>
            <span class="validation-error" v-if="!$v.shipping.zipCode.minLength">Zip-code must have at least {{$v.shipping.zipCode.$params.minLength.min}} letters.</span>
          </div>
          <div class="col-md-6 mb25">
            <select name="countries" v-model="shipping.country">
              <option value="" disabled selected hidden>Country</option>
              <option v-for="country in countries" :value="country.code">{{ country.name }}</option>
            </select>
            <span class="validation-error" v-if="!$v.shipping.country.required">Field is required</span>
          </div>
          <div class="col-md-12 mb25">
            <input type="text" name="phone number" placeholder="Phone Number" v-model="shipping.phoneNumber">
          </div>
          <div class="col-xs-12">
            <h4>Shipping method</h4>
          </div>
          <div v-for="(method, index) in shippingMethods" :key="index" class="col-md-6 mb15">
            <label><input type="radio" :value="method.code" name="shipping-method" v-model="shipping.shippingMethod"> {{ method.name }} | {{ method.cost | price }} </label>
          </div>
          <span class="validation-error" v-if="!$v.shipping.shippingMethod.required">Field is required</span>
          <div class="col-xs-12 my30">
            <button-full @click.native="sendDataToCheckout" text="Continue to payment" :class="{ 'button-disabled' : $v.shipping.$invalid}"/>
          </div>
        </div>
        <div class="row fs16 mb35" v-show="isFilled">
          <div class="col-xs-12">

            <div class="row">
              <div class="col-md-6 ">
                <strong>First name</strong><br>
                {{ shipping.firstName }}
              </div>
              <div class="col-md-6 ">
                <strong>Last name</strong><br>
                {{ shipping.lastName }}
              </div>
            </div>

            <div class="row mt15">
              <div class="col-md-6 ">
                <strong>Street address</strong><br>
                {{ shipping.streetAddress }}
              </div>
              <div class="col-md-6" v-show="shipping.apartmentNumber">
                <strong>Apartment number</strong><br>
                {{ shipping.apartmentNumber }}
              </div>
            </div>

            <div class="row mt15">
              <div class="col-md-6 ">
                <strong>City</strong><br>
                {{ shipping.city }}
              </div>
              <div class="col-md-6" v-show="shipping.state">
                <strong>State / Province</strong><br>
                {{ shipping.state }}
              </div>
            </div>

            <div class="row mt15">
              <div class="col-md-6 ">
                <strong>Zip Code</strong><br>
                {{ shipping.zipCode }}
              </div>
              <div class="col-md-6 ">
                <strong>Country</strong><br>
                {{ shipping.country }}
              </div>
            </div>

            <div class="row mt15" v-show="shipping.phoneNumber">
              <div class="col-md-12 ">
                <strong>Phone number</strong><br>
                {{ shipping.phoneNumber }}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'
import EventBus from 'src/event-bus/event-bus'
import ShippingMethods from 'src/resource/shipping_methods.json'
import Countries from 'src/resource/countries.json'

import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import { required, minLength } from 'vuelidate/lib/validators'

// https://monterail.github.io/vuelidate/#sub-contextified-validators

export default {
  props: ['isActive'],
  created () {
    EventBus.$on('checkout.personalDetails', (receivedData) => {
      if (!this.isFilled) {
        this.shipping.firstName = receivedData.firstName
        this.shipping.lastName = receivedData.lastName
      }
    })
  },
  validations: {
    shipping: {
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
      shippingMethod: {
        required
      },
      zipCode: {
        required,
        minLength: minLength(5)
      },
      city: {
        required
      }
    }
  },
  data () {
    return {
      isFilled: false,
      shippingMethods: ShippingMethods,
      shipping: {
        firstName: '',
        lastName: '',
        country: '',
        streetAdress: '',
        shippingMethod: 'flatrate'
      },
      countries: Countries
    }
  },
  methods: {
    sendDataToCheckout () {
      EventBus.$emit('checkout.shipping', this.shipping, this.$v)
      this.isFilled = true
    },
    edit () {
      if (this.isFilled) {
        EventBus.$emit('checkout.edit', 'shipping')
        this.isFilled = false
      }
    }
  },
  components: {
    ButtonFull
  },
  mixins: [coreComponent('core/blocks/Checkout/Shipping')]
}
</script>
