<template>
  <div class="payment pt20">
    <div class="row pl20">
      <div class="col-xs-1 col-sm-2 col-md-1">
        <div class="number-circle lh35 c-white brdr-circle align-center weight-700" :class="{ 'bg-black' : isActive || isFilled, 'bg-gray' : !isFilled && !isActive }">3</div>
      </div>
      <div class="col-xs-11 col-sm-9 col-md-11">
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
      </div>
    </div>
    <div class="row pl20" v-show="isActive">
      <div class="hidden-xs col-sm-2 col-md-1"/>
      <div class="col-xs-12 col-sm-9 col-md-11">
        <div class="row" v-show="this.isActive">
          <div class="col-xs-12 col-sm-12 mb15">
            <div class="checkboxStyled">
              <input type="checkbox" v-model="sendToShippingAddress" id="sendToShippingAddressCheckbox" @click="useShippingAddress">
              <label for="sendToShippingAddressCheckbox"/>
            </div>
            <div class="checkboxText ml15 lh25" @click="useShippingAddress">
              <span class="fs16 c-darkgray">Copy address data from shipping</span>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 mb15" v-show="hasBillingData()">
            <div class="checkboxStyled">
              <input type="checkbox" v-model="sendToBillingAddress" id="sendToBillingAddressCheckbox" @click="useBillingAddress">
              <label for="sendToBillingAddressCheckbox"/>
            </div>
            <div class="checkboxText ml15 lh25" @click="useBillingAddress">
              <span class="fs16 c-darkgray">Use my billing data</span>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 mb25">
            <input type="text" name="first-name" placeholder="First name" v-model.trim="payment.firstName" @blur="$v.payment.firstName.$touch()" autocomplete="given-name" >
            <span class="validation-error" v-if="$v.payment.firstName.$error && !$v.payment.firstName.required">Field is required</span>
            <span class="validation-error" v-if="!$v.payment.firstName.minLength">Name must have at least {{ $v.payment.firstName.$params.minLength.min }} letters.</span>
          </div>
          <div class="col-xs-12 col-sm-6 mb25">
            <input type="text" name="last-name" placeholder="Last name" v-model.trim="payment.lastName" @blur="$v.payment.lastName.$touch()" autocomplete="family-name">
            <span class="validation-error" v-if="$v.payment.lastName.$error && !$v.payment.lastName.required">Field is required</span>
          </div>
          <div class="col-xs-12 col-sm-12 mb25">
            <input type="text" name="street-address" placeholder="Street name" v-model.trim="payment.streetAddress" @blur="$v.payment.streetAddress.$touch()" autocomplete="payment address-line1">
            <span class="validation-error" v-if="$v.payment.streetAddress.$error && !$v.payment.streetAddress.required">Field is required</span>
          </div>
          <div class="col-xs-12 col-sm-12 mb25">
            <input type="text" name="apartment-number" placeholder="House/Apartment number" v-model.trim="payment.apartmentNumber" @blur="$v.payment.apartmentNumber.$touch()" autocomplete="address-line2">
            <span class="validation-error" v-if="$v.payment.apartmentNumber.$error && !$v.payment.apartmentNumber.required">Field is required</span>
          </div>
          <div class="col-xs-12 col-sm-6 mb25">
            <input type="text" name="city" placeholder="City" v-model.trim="payment.city" @blur="$v.payment.city.$touch()" autocomplete="address-level2">
            <span class="validation-error" v-if="$v.payment.city.$error && !$v.payment.city.required">Field is required</span>
          </div>
          <div class="col-xs-12 col-sm-6 mb25">
            <input type="text" name="state" placeholder="State / Province" v-model.trim="payment.state" autocomplete="address-level1">
          </div>
          <div class="col-xs-12 col-sm-6 mb25">
            <input type="text" name="zip-code" placeholder="Zip-code" v-model.trim="payment.zipCode" @blur="$v.payment.zipCode.$touch()" autocomplete="postal-code">
            <span class="validation-error" v-if="$v.payment.zipCode.$error && !$v.payment.zipCode.required">Field is required</span>
            <span class="validation-error" v-if="!$v.payment.zipCode.minLength">Zip-code must have at least {{ $v.payment.zipCode.$params.minLength.min }} letters.</span>
          </div>
          <div class="col-xs-12 col-sm-6 mb25">
            <select name="countries" v-model="payment.country" @change="$v.payment.country.$touch()" autocomplete="country">
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
              <label for="generateInvoiceCheckbox"/>
            </div>
            <div class="checkboxText ml15 lh25" @click="useGenerateInvoice">
              <span class="fs16 c-darkgray">I want to generate an invoice for the company</span>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 mb25" v-show="generateInvoice">
            <input type="text" name="company-name" placeholder="Company name" v-model.trim="payment.company" @blur="$v.payment.company.$touch()" autocomplete="company-name">
            <span class="validation-error" v-if="this.generateInvoice && $v.payment.company.$error && !$v.payment.company.required">Field is required</span>
          </div>
          <div class="col-xs-12 col-sm-12 mb25" v-show="generateInvoice">
            <input type="text" name="tax-id" placeholder="Tax identification number" v-model.trim="payment.taxId" @blur="$v.payment.taxId.$touch()" autocomplete="tax-id">
            <span class="validation-error" v-if="this.generateInvoice && $v.payment.taxId.$error && !$v.payment.taxId.required">Field is required</span>
            <span class="validation-error" v-if="this.generateInvoice && !$v.payment.taxId.minLength">Tax identification number must have at least {{ $v.payment.taxId.$params.minLength.min }} letters.</span>
          </div>
          <div class="col-xs-12 col-sm-12 mb25" v-show="generateInvoice">
            <label class="fs16">We will send you the invoice to given e-mail address</label>
          </div>
          <div class="col-xs-12">
            <h4>Payment method</h4>
          </div>
          <div v-for="(method, index) in paymentMethods" :key="index" class="col-md-6 mb15">
            <label class="radioStyled"> {{ method.name }} 
              <input type="radio" :value="method.code" name="payment-method" v-model="payment.paymentMethod">
              <span class="checkmark"/>
            </label>
          </div>
          <span class="validation-error" v-if="!$v.payment.paymentMethod.required">Field is required</span>
        </div>
      </div>
    </div>
    <div class="row" v-show="isActive">
      <div class="hidden-xs col-sm-2 col-md-1"/>
      <div class="col-xs-12 col-sm-9 col-md-11">
        <div class="row">
          <div class="col-xs-12 my30 bottom-button">
            <button-full @click.native="sendDataToCheckout" text="Go review the order" :class="{ 'ripple': true, 'button-disabled' : $v.payment.$invalid}"/>
          </div>
        </div>
      </div>
    </div>
    <div class="row pl20" v-show="!isActive && isFilled">
      <div class="hidden-xs col-sm-2 col-md-1"/>
      <div class="col-xs-12 col-sm-9 col-md-11">
        <div class="row fs16 mb35">
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
            <div v-show="payment.phoneNumber">
              <span class="pr15">{{ payment.phoneNumber }}</span>
              <tooltip>Phone number may be needed by carrier</tooltip>
            </div>
            <p v-show="generateInvoice">
              {{ payment.company }} {{ payment.taxId }}
            </p>
            <div class="col-xs-12">
              <h4>Payment method</h4>
            </div>
            <div class="col-md-6 mb15">
              <label class="radioStyled"> {{ getPaymentMethod().name }} 
                <input type="radio" value="" checked disabled name="chosen-payment-method">
                <span class="checkmark"/>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { coreComponent } from 'lib/themes'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import Tooltip from 'theme/components/core/Tooltip.vue'

export default {
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
  components: {
    ButtonFull,
    Tooltip
  },
  mixins: [coreComponent('core/blocks/Checkout/Payment')]
}
</script>
