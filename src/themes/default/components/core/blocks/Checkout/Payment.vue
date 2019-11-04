<template>
  <div class="payment pt20">
    <div class="row pl20">
      <div class="col-xs-1 col-sm-2 col-md-1">
        <div
          class="number-circle lh35 cl-white brdr-circle align-center weight-700"
          :class="{ 'bg-cl-th-accent' : isActive || isFilled, 'bg-cl-tertiary' : !isFilled && !isActive }"
        >
          {{ (isVirtualCart ? 2 : 3) }}
        </div>
      </div>
      <div class="col-xs-11 col-sm-9 col-md-11">
        <div class="row mb15">
          <div class="col-xs-12 col-md-7" :class="{ 'cl-bg-tertiary' : !isFilled && !isActive }">
            <h3 class="m0 mb5">
              {{ $t('Payment') }}
            </h3>
          </div>
          <div class="col-xs-12 col-md-5 pr30">
            <div class="lh30 flex end-lg" v-if="isFilled && !isActive">
              <a href="#" class="cl-tertiary flex" @click.prevent="edit">
                <span class="pr5">
                  {{ $t('Edit payment') }}
                </span>
                <i class="material-icons cl-tertiary">edit</i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row pl20" v-if="isActive">
      <div class="hidden-xs col-sm-2 col-md-1" />
      <div class="col-xs-11 col-sm-9 col-md-10">
        <div class="row" v-if="isActive">
          <base-checkbox
            class="col-xs-12 mb15"
            id="sendToShippingAddressCheckbox"
            v-model="sendToShippingAddress"
            v-if="!isVirtualCart"
          >
            {{ $t('Copy address data from shipping') }}
          </base-checkbox>

          <base-checkbox
            v-if="hasBillingData()"
            class="col-xs-12 mb15"
            id="sendToBillingAddressCheckbox"
            v-model="sendToBillingAddress"
          >
            {{ $t('Use my billing data') }}
          </base-checkbox>

          <base-input
            class="col-xs-12 col-sm-6 mb10"
            type="text"
            name="first-name"
            :placeholder="$t('First name *')"
            v-model.trim="payment.firstName"
            @blur="$v.payment.firstName.$touch()"
            autocomplete="given-name"
            :validations="[
              {
                condition: $v.payment.firstName.$error && !$v.payment.firstName.required,
                text: $t('Field is required')
              },
              {
                condition: !$v.payment.firstName.minLength,
                text: $t('Name must have at least 2 letters.')
              }
            ]"
          />

          <base-input
            class="col-xs-12 col-sm-6 mb10"
            type="text"
            name="last-name"
            :placeholder="$t('Last name *')"
            v-model.trim="payment.lastName"
            @blur="$v.payment.lastName.$touch()"
            autocomplete="family-name"
            :validations="[{
              condition: $v.payment.lastName.$error && !$v.payment.lastName.required,
              text: $t('Field is required')
            }]"
          />

          <base-input
            class="col-xs-12 mb10"
            type="text"
            name="street-address"
            :placeholder="$t('Street name *')"
            v-model.trim="payment.streetAddress"
            @blur="$v.payment.streetAddress.$touch()"
            autocomplete="address-line1"
            :validations="[{
              condition: $v.payment.streetAddress.$error && !$v.payment.streetAddress.required,
              text: $t('Field is required')
            }]"
          />

          <base-input
            class="col-xs-12 mb10"
            type="text"
            name="apartment-number"
            :placeholder="$t('House/Apartment number *')"
            v-model.trim="payment.apartmentNumber"
            @blur="$v.payment.apartmentNumber.$touch()"
            autocomplete="address-line2"
            :validations="[{
              condition: $v.payment.apartmentNumber.$error && !$v.payment.apartmentNumber.required,
              text: $t('Field is required')
            }]"
          />

          <base-input
            class="col-xs-12 col-sm-6 mb10"
            type="text"
            name="city"
            :placeholder="$t('City *')"
            v-model.trim="payment.city"
            @blur="$v.payment.city.$touch()"
            autocomplete="address-level2"
            :validations="[
              {
                condition: $v.payment.city.$error && !$v.payment.city.required,
                text: $t('Field is required')
              },
              {
                condition: $v.payment.city.$error && $v.payment.city.required,
                text: $t('Please provide valid city name')
              }
            ]"
          />

          <base-input
            class="col-xs-12 col-sm-6 mb10"
            type="text"
            name="state"
            :placeholder="$t('State / Province')"
            v-model.trim="payment.state"
            autocomplete="address-level1"
          />

          <base-input
            class="col-xs-12 col-sm-6 mb10"
            type="text"
            name="zip-code"
            :placeholder="$t('Zip-code *')"
            v-model.trim="payment.zipCode"
            @blur="$v.payment.zipCode.$touch()"
            autocomplete="postal-code"
            :validations="[
              {
                condition: $v.payment.zipCode.$error && !$v.payment.zipCode.required,
                text: $t('Field is required')
              },
              {
                condition: !$v.payment.zipCode.minLength,
                text: $t('Zip-code must have at least 3 letters.')
              }
            ]"
          />

          <base-select
            class="col-xs-12 col-sm-6 mb10"
            name="countries"
            :options="countryOptions"
            :selected="payment.country"
            :placeholder="$t('Country *')"
            :validations="[
              {
                condition: $v.payment.country.$error && !$v.payment.country.required,
                text: $t('Field is required')
              }
            ]"
            v-model="payment.country"
            autocomplete="country-name"
            @blur="$v.payment.country.$touch()"
            @change="$v.payment.country.$touch(); changeCountry();"
          />

          <base-input
            class="col-xs-12 mb10"
            type="text"
            name="phone-number"
            :placeholder="$t('Phone Number')"
            v-model.trim="payment.phoneNumber"
            autocomplete="tel"
          />

          <base-checkbox
            class="col-xs-12 mb15"
            id="generateInvoiceCheckbox"
            v-model="generateInvoice"
          >
            {{ $t('I want to generate an invoice for the company') }}
          </base-checkbox>

          <template v-if="generateInvoice">
            <base-input
              class="col-xs-12 mb10"
              type="text"
              name="company-name"
              :placeholder="$t('Company name *')"
              v-model.trim="payment.company"
              @blur="$v.payment.company.$touch()"
              autocomplete="organization"
              :validations="[{
                condition: $v.payment.company.$error && !$v.payment.company.required,
                text: $t('Field is required')
              }]"
            />

            <base-input
              class="col-xs-12 mb10"
              type="text"
              name="tax-id"
              :placeholder="$t('Tax identification number *')"
              v-model.trim="payment.taxId"
              @blur="$v.payment.taxId.$touch()"
              autocomplete="tax-id"
              :validations="[
                {
                  condition: $v.payment.taxId.$error && !$v.payment.taxId.required,
                  text: $t('Field is required')
                },
                {
                  condition: !$v.payment.taxId.minLength,
                  text: $t('Tax identification number must have at least 3 letters.')
                }
              ]"
            />

            <div class="col-xs-12 mb25">
              <label class="fs16">
                {{ $t('We will send you the invoice to given e-mail address') }}
              </label>
            </div>
          </template>

          <div class="col-xs-12">
            <h4>
              {{ $t('Payment method') }}
            </h4>
          </div>
          <div v-for="(method, index) in paymentMethods" :key="index" class="col-md-6">
            <label class="radioStyled"> {{ method.title ? method.title : method.name }}
              <input
                type="radio"
                :value="method.code"
                name="payment-method"
                v-model="payment.paymentMethod"
                @change="$v.payment.paymentMethod.$touch(); changePaymentMethod();"
              >
              <span class="checkmark" />
            </label>
          </div>
          <span class="validation-error" v-if="!$v.payment.paymentMethod.required">{{ $t('Field is required') }}</span>
        </div>
      </div>
    </div>
    <div class="row" v-if="isActive">
      <div class="hidden-xs col-sm-2 col-md-1" />
      <div class="col-xs-12 col-sm-9 col-md-11">
        <div class="row">
          <div class="col-xs-12 col-md-8 px20 my30">
            <button-full
              @click.native="sendDataToCheckout"
              data-testid="paymentSubmit"
              :disabled="$v.payment.$invalid"
            >
              {{ $t('Go review the order') }}
            </button-full>
          </div>
        </div>
      </div>
    </div>
    <div class="row pl20" v-if="!isActive && isFilled">
      <div class="hidden-xs col-sm-2 col-md-1" />
      <div class="col-xs-12 col-sm-9 col-md-11">
        <div class="row fs16 mb35">
          <div class="col-xs-12 h4">
            <p>
              {{ payment.firstName }} {{ payment.lastName }}
            </p>
            <p>
              {{ payment.streetAddress }} {{ payment.apartmentNumber }}
            </p>
            <p>
              {{ payment.city }} {{ payment.zipCode }}
            </p>
            <p>
              <span v-if="payment.state">{{ payment.state }}, </span>
              <span>{{ getCountryName() }}</span>
            </p>
            <div v-if="payment.phoneNumber">
              <span class="pr15">{{ payment.phoneNumber }}</span>
              <tooltip>{{ $t('Phone number may be needed by carrier') }}</tooltip>
            </div>
            <p v-if="generateInvoice">
              {{ payment.company }} {{ payment.taxId }}
            </p>
            <div class="col-xs-12">
              <h4>{{ $t('Payment method') }}</h4>
            </div>
            <div class="col-md-6 mb15">
              <label class="radioStyled"> {{ getPaymentMethod().title }}
                <input type="radio" value="" checked disabled name="chosen-payment-method">
                <span class="checkmark" />
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
import { unicodeAlpha, unicodeAlphaNum } from '@vue-storefront/core/helpers/validators'
import { Payment } from '@vue-storefront/core/modules/checkout/components/Payment'

import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import BaseSelect from 'theme/components/core/blocks/Form/BaseSelect'
import ButtonFull from 'theme/components/theme/ButtonFull'
import Tooltip from 'theme/components/core/Tooltip'

export default {
  components: {
    BaseCheckbox,
    BaseInput,
    BaseSelect,
    ButtonFull,
    Tooltip
  },
  mixins: [Payment],
  computed: {
    countryOptions () {
      return this.countries.map((item) => {
        return {
          value: item.code,
          label: item.name
        }
      })
    }
  },
  validations () {
    if (!this.generateInvoice) {
      return {
        payment: {
          firstName: {
            required,
            minLength: minLength(2),
            unicodeAlpha
          },
          lastName: {
            required,
            unicodeAlpha
          },
          country: {
            required
          },
          streetAddress: {
            required,
            unicodeAlphaNum
          },
          apartmentNumber: {
            required,
            unicodeAlphaNum
          },
          zipCode: {
            required,
            minLength: minLength(3),
            unicodeAlphaNum
          },
          city: {
            required,
            unicodeAlpha
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
            minLength: minLength(2),
            unicodeAlpha
          },
          lastName: {
            required,
            unicodeAlpha
          },
          company: {
            required,
            unicodeAlphaNum
          },
          taxId: {
            required,
            minLength: minLength(3)
          },
          country: {
            required
          },
          streetAddress: {
            required,
            unicodeAlphaNum
          },
          apartmentNumber: {
            required,
            unicodeAlphaNum
          },
          zipCode: {
            required,
            minLength: minLength(3),
            unicodeAlphaNum
          },
          city: {
            required,
            unicodeAlpha
          },
          paymentMethod: {
            required
          }
        }
      }
    }
  }
}
</script>
