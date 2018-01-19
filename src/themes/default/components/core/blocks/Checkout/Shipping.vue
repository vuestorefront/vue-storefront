<template>
  <div class="shipping">
    <div class="row">
      <div class="col-xs-2 col-md-1">
        <div class="number-circle lh35 c-white brdr-circle align-center weight-700" :class="{ 'bg-black' : isActive || isFilled, 'bg-gray' : !isFilled && !isActive }">2</div>
      </div>
      <div class="col-xs-9 col-md-11">
        <div class="row mb15">
          <div class="col-xs-12 col-md-6" :class="{ 'c-gray' : !isFilled && !isActive }">
            <h3 class="m0 mb5">Shipping</h3>
          </div>
          <div class="col-xs-12 col-md-6 pr30">
            <div class="lh30 flex end-md" v-if="isFilled && !isActive">
              <a href="#" class="c-lightgray-secondary flex" @click.prevent="edit">
                <span class="pr5">Edit shipping</span>
                <i class="material-icons c-lightgray-secondary">edit</i>
              </a>
            </div>
          </div>
        </div>
        <div class="row" v-show="this.isActive">
          <div class="col-xs-12 col-sm-12 mb15" v-show="currentUser && hasShippingDetails()">
            <div class="checkboxStyled">
              <input type="checkbox" v-model="shipToMyAddress" id="shipToMyAddressCheckbox" @click="useMyAddress">
              <label for="shipToMyAddressCheckbox"></label>
            </div>
            <div class="checkboxText ml15 lh25" @click="useMyAddress">
              <span class="fs16 c-darkgray">Ship to my default address</span>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 mb25">
            <input type="text" name="first-name" placeholder="First name" v-model.trim="shipping.firstName" @blur="$v.shipping.firstName.$touch()" autocomplete="given-name" >
            <span class="validation-error" v-if="$v.shipping.firstName.$error && !$v.shipping.firstName.required">Field is required</span>
            <span class="validation-error" v-if="!$v.shipping.firstName.minLength">Name must have at least {{$v.shipping.firstName.$params.minLength.min}} letters.</span>
          </div>
          <div class="col-xs-12 col-sm-6 mb25">
            <input type="text" name="last-name" placeholder="Last name" v-model.trim="shipping.lastName" @blur="$v.shipping.lastName.$touch()" autocomplete="family-name">
            <span class="validation-error" v-if="$v.shipping.lastName.$error && !$v.shipping.lastName.required">Field is required</span>
          </div>
          <div class="col-xs-12 col-sm-12 mb25">
            <input type="text" name="street-address" placeholder="Street name" v-model.trim="shipping.streetAddress" @blur="$v.shipping.streetAddress.$touch()" autocomplete="shipping address-line1">
            <span class="validation-error" v-if="$v.shipping.streetAddress.$error && !$v.shipping.streetAddress.required">Field is required</span>
          </div>
          <div class="col-xs-12 col-sm-12 mb25">
            <input type="text" name="apartment-number" placeholder="House/Apartment number" v-model.trim="shipping.apartmentNumber" @blur="$v.shipping.apartmentNumber.$touch()" autocomplete="address-line2">
            <span class="validation-error" v-if="$v.shipping.apartmentNumber.$error && !$v.shipping.apartmentNumber.required">Field is required</span>
          </div>
          <div class="col-xs-12 col-sm-6 mb25">
            <input type="text" name="city" placeholder="City" v-model.trim="shipping.city" @blur="$v.shipping.city.$touch()" autocomplete="address-level2">
            <span class="validation-error" v-if="$v.shipping.city.$error && !$v.shipping.city.required">Field is required</span>
          </div>
          <div class="col-xs-12 col-sm-6 mb25">
            <input type="text" name="state" placeholder="State / Province" v-model.trim="shipping.state" autocomplete="address-level1">
          </div>
          <div class="col-xs-12 col-sm-6 mb25">
            <input type="text" name="zip-code" placeholder="Zip-code" v-model.trim="shipping.zipCode" @blur="$v.shipping.zipCode.$touch()" autocomplete="postal-code">
            <span class="validation-error" v-if="$v.shipping.zipCode.$error && !$v.shipping.zipCode.required">Field is required</span>
            <span class="validation-error" v-if="!$v.shipping.zipCode.minLength">Zip-code must have at least {{$v.shipping.zipCode.$params.minLength.min}} letters.</span>
          </div>
          <div class="col-xs-12 col-sm-6 mb25">
            <select name="countries" v-model="shipping.country" @change="$v.shipping.country.$touch()" autocomplete="country">
              <option value="" disabled selected hidden>Country</option>
              <option v-for="country in countries" :value="country.code">{{ country.name }}</option>
            </select>
            <span class="validation-error" v-if="$v.shipping.country.$error && !$v.shipping.country.required">Field is required</span>
          </div>
          <div class="col-xs-12 col-sm-12 mb25">
            <input type="text" name="phone-number" placeholder="Phone Number" v-model.trim="shipping.phoneNumber">
          </div>
          <div class="col-xs-12">
            <h4>Shipping method</h4>
          </div>
          <div v-for="(method, index) in shippingMethods" :key="index" class="col-md-6 mb15">
            <label><input type="radio" :value="method.code" name="shipping-method" v-model="shipping.shippingMethod" @change="$v.shipping.shippingMethod.$touch()"> {{ method.name }} | {{ method.cost | price }} </label>
          </div>
          <span class="validation-error" v-if="$v.shipping.shippingMethod.$error && !$v.shipping.shippingMethod.required">Field is required</span>
          <div class="col-xs-12 my30">
            <button-full @click.native="sendDataToCheckout" text="Continue to payment" :class="{ 'ripple': true, 'button-disabled' : $v.shipping.$invalid}"/>
          </div>
        </div>
        <div class="row fs16 mb35" v-show="isFilled">
          <div class="col-xs-12 h4">
              <p>
                {{ shipping.firstName }} {{ shipping.lastName }}
              </p>
              <p>
                {{ shipping.streetAddress }} {{ shipping.apartmentNumber }}</span>
              </p>
              <p>
                {{ shipping.city }} {{ shipping.zipCode }}
              </p>
              <p>
                <span v-show="shipping.state">{{ shipping.state }}, </span>
                <span>{{ getCountryName() }}</span>
              </p>
              <div v-show="shipping.phoneNumber">
                <span class="pr15">{{ shipping.phoneNumber }}</span>
                <tooltip>Phone number may be needed by carrier</tooltip>
              </div>
              <div class="col-xs-12">
                <h4>Shipping method</h4>
              </div>
              <div class="col-md-6 mb15">
                <label><input type="radio" name="chosen-shipping-method" value="" checked disabled> {{ getShippingMethod().name }} | {{ getShippingMethod().cost | price }} </label>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import Tooltip from 'theme/components/core/Tooltip.vue'
import { required, minLength } from 'vuelidate/lib/validators'

// https://monterail.github.io/vuelidate/#sub-contextified-validators

export default {
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
      apartmentNumber: {
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
  components: {
    ButtonFull,
    Tooltip
  },
  mixins: [coreComponent('core/blocks/Checkout/Shipping')]
}
</script>
