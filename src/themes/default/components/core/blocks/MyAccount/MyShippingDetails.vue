<template>
  <div class="mb35">
    <!-- My shipping details header -->
    <div class="row mb15">
      <div class="col-xs-12 col-sm-6" :class="{ 'cl-accent' : !isEdited }">
        <h3 class="m0 mb5">
          {{ $t('My shipping details') }}
        </h3>
      </div>
      <div class="col-xs-12 col-sm-6">
        <div class="lh30 flex end-md" v-if="!isEdited">
          <a href="#" class="cl-tertiary flex" @click.prevent="edit">
            <span class="pr5">
              {{ $t('Edit your shipping details') }}
            </span>
            <i class="material-icons cl-tertiary">edit</i>
          </a>
        </div>
      </div>
    </div>

    <!-- My shipping details body (edit mode) -->
    <div class="row" v-if="isEdited">
      <base-input
        class="col-xs-12 col-sm-6 mb25"
        type="text"
        name="first-name"
        :placeholder="$t('First name')"
        v-model.trim="shippingDetails.firstName"
        :validations="[
          {
            condition: !$v.shippingDetails.firstName.required,
            text: $t('Field is required')
          },
          {
            condition: !$v.shippingDetails.firstName.minLength,
            text: $t('Name must have at least 3 letters.')
          }
        ]"
      />

      <base-input
        class="col-xs-12 col-sm-6 mb25"
        type="text"
        name="last-name"
        :placeholder="$t('Last name')"
        v-model.trim="shippingDetails.lastName"
        :validation="{
          condition: !$v.shippingDetails.lastName.required,
          text: $t('Field is required')
        }"
      />

      <base-checkbox
        v-if="hasBillingAddress()"
        class="col-xs-12 mb25"
        id="addCompanyFilled"
        v-model="useCompanyAddress"
        @click="fillCompanyAddress"
      >
        {{ $t("Use my company's address details") }}
      </base-checkbox>

      <base-input
        class="col-xs-12 col-sm-6 mb25"
        type="text"
        name="street-address"
        :placeholder="$t('Street name')"
        v-model.trim="shippingDetails.street"
        :validation="{
          condition: !$v.shippingDetails.street.required,
          text: $t('Field is required')
        }"
      />

      <base-input
        class="col-xs-12 col-sm-6 mb25"
        type="text"
        name="apartment-number"
        :placeholder="$t('House/Apartment number')"
        v-model.trim="shippingDetails.house"
        :validation="{
          condition: !$v.shippingDetails.house.required,
          text: $t('Field is required')
        }"
      />

      <base-input
        class="col-xs-12 col-sm-6 mb25"
        type="text"
        name="city"
        :placeholder="$t('City')"
        v-model.trim="shippingDetails.city"
        :validation="{
          condition: !$v.shippingDetails.city.required,
          text: $t('Field is required')
        }"
      />

      <base-input
        class="col-xs-12 col-sm-6 mb25"
        type="text"
        name="state"
        :placeholder="$t('State / Province')"
        v-model.trim="shippingDetails.region"
      />

      <base-input
        class="col-xs-12 col-sm-6 mb25"
        type="text"
        name="zip-code"
        :placeholder="$t('Zip-code')"
        v-model.trim="shippingDetails.postcode"
        :validations="[
          {
            condition: !$v.shippingDetails.postcode.required,
            text: $t('Field is required')
          },
          {
            condition: !$v.shippingDetails.postcode.minLength,
            text: $t('Zip-code must have at least 3 letters.')
          }
        ]"
      />

      <div class="col-xs-12 col-sm-6 mb25">
        <select name="countries" v-model="shippingDetails.country">
          <option value="" disabled selected hidden>
            {{ $t('Country') }}
          </option>
          <option
            v-for="country in countries"
            :key="country.code"
            :value="country.code"
          >
            {{ country.name }}
          </option>
        </select>
        <span
          class="validation-error"
          v-if="!$v.shippingDetails.country.required"
        >
          {{ $t('Field is required') }}
        </span>
      </div>

      <base-input
        class="col-xs-12 col-sm-6 mb25"
        type="text"
        name="phone-number"
        :placeholder="$t('Phone Number')"
        v-model.trim="shippingDetails.phone"
      />

      <div class="hidden-xs col-sm-6 mb25"/>

      <div class="col-xs-12 col-sm-6">
        <button-full
          @click.native="updateDetails"
          :class="{ 'button-disabled': $v.$invalid }"
        >
          {{ $t('Update my shipping details') }}
        </button-full>
      </div>
      <div class="col-xs-12 col-sm-6 flex middle-xs py10">
        <a href="#" @click="exitSection" class="h4 cl-accent">
          {{ $t('Cancel') }}
        </a>
      </div>
    </div>

    <!-- My shipping details summary -->
    <div class="row fs16 mb35" v-else>
      <div class="col-xs-12 h4">
        <p>
          {{ shippingDetails.firstName }} {{ shippingDetails.lastName }}
        </p>
        <base-checkbox
          v-if="useCompanyAddress"
          class="col-xs-12 mb25"
          id="useCompanyAddressFilled"
          v-model="useCompanyAddress"
          disabled
        >
          {{ $t("Use my company's address details") }}
        </base-checkbox>
        <p class="mb25">
          {{ shippingDetails.company }}
        </p>
        <p class="mb25">
          {{ shippingDetails.street }}
          <span v-if="shippingDetails.house"> {{ shippingDetails.house }}</span>
        </p>
        <p class="mb25">
          {{ shippingDetails.city }} {{ shippingDetails.postcode }}
        </p>
        <p class="mb25">
          <span v-if="shippingDetails.region">{{ shippingDetails.region }}, </span>
          {{ getCountryName() }}
        </p>
        <div class="mb25">
          {{ shippingDetails.phone }}
          <tooltip v-if="shippingDetails.phone">
            {{ $t('Phone number may be needed by carrier') }}
          </tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'core/lib/themes'
import { required, minLength } from 'vuelidate/lib/validators'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import Tooltip from 'theme/components/core/Tooltip.vue'
import BaseCheckbox from '../Form/BaseCheckbox.vue'
import BaseInput from '../Form/BaseInput.vue'

export default {
  validations: {
    shippingDetails: {
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
      street: {
        required
      },
      house: {
        required
      },
      postcode: {
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
    Tooltip,
    BaseCheckbox,
    BaseInput
  },
  mixins: [coreComponent('blocks/MyAccount/MyShippingDetails')]
}
</script>
