<template>
  <div class="my-shipping-details mb35">
    <!-- My shipping details header -->
    <div class="row mb15">
      <div class="col-xs-12 col-md-6" :class="{ 'cl-accent' : !isEdited }">
        <h3 class="m0 mb5">
          {{ $t('My shipping details') }}
        </h3>
      </div>
      <div class="col-xs-12 col-md-6 pr30">
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
    <div class="row" v-show="isEdited">
      <div class="col-xs-12 col-sm-6 mb25">
        <input type="text" name="first-name" :placeholder="$t('First name')" v-model.trim="shippingDetails.firstName">
        <span class="validation-error" v-if="!$v.shippingDetails.firstName.required">Field is required</span>
        <span class="validation-error" v-if="!$v.shippingDetails.firstName.minLength">
          {{ $t('Name must have at least 3 letters.') }}
        </span>
      </div>
      <div class="col-xs-12 col-sm-6 mb25">
        <input type="text" name="last-name" :placeholder="$t('Last name')" v-model.trim="shippingDetails.lastName">
        <span class="validation-error" v-if="!$v.shippingDetails.lastName.required">Field is required</span>
      </div>
      <div class="col-xs-12 col-md-12 mb25" v-if="hasBillingAddress()">
        <div class="checkboxStyled" @click.prevent="fillCompanyAddress">
          <input type="checkbox" v-model="useCompanyAddress" id="useCompanyAddress">
          <label for="useCompanyAddress"/>
        </div>
        <div class="checkboxText ml15 lh25" @click="fillCompanyAddress">
          <span class="fs16 cl-accent">{{ $t("Use my company's address details") }}</span>
        </div>
      </div>
      <div class="col-xs-12 col-sm-6 mb25">
        <input type="text" name="street-address" :placeholder="$t('Street name')" v-model.trim="shippingDetails.street">
        <span class="validation-error" v-if="!$v.shippingDetails.street.required">{{ $t('Field is required') }}</span>
      </div>
      <div class="col-xs-12 col-sm-6 mb25">
        <input type="text" name="apartment-number" :placeholder="$t('House/Apartment number')" v-model.trim="shippingDetails.house">
        <span class="validation-error" v-if="!$v.shippingDetails.house.required">{{ $t('Field is required') }}</span>
      </div>
      <div class="col-xs-12 col-sm-6 mb25">
        <input type="text" name="city" :placeholder="$t('City')" v-model.trim="shippingDetails.city">
        <span class="validation-error" v-if="!$v.shippingDetails.city.required">{{ $t('Field is required') }}</span>
      </div>
      <div class="col-xs-12 col-sm-6 mb25">
        <input type="text" name="state" :placeholder="$t('State / Province')" v-model.trim="shippingDetails.region">
      </div>
      <div class="col-xs-12 col-sm-6 mb25">
        <input type="text" name="zip-code" :placeholder="$t('Zip-code')" v-model.trim="shippingDetails.postcode">
        <span class="validation-error" v-if="!$v.shippingDetails.postcode.required">{{ $t('Field is required') }}</span>
        <span class="validation-error" v-if="!$v.shippingDetails.postcode.minLength">
          {{ $t('Zip-code must have at least 3 letters.') }}
        </span>
      </div>
      <div class="col-xs-12 col-sm-6 mb25">
        <select name="countries" v-model="shippingDetails.country">
          <option value="" disabled selected hidden>
            {{ $t('Country') }}
          </option>
          <option v-for="country in countries" :key="country.code" :value="country.code">{{ country.name }}</option>
        </select>
        <span class="validation-error" v-if="!$v.shippingDetails.country.required">{{ $t('Field is required') }}</span>
      </div>
      <div class="col-xs-12 col-sm-6 mb25">
        <input type="text" name="phone-number" :placeholder="$t('Phone Number')" v-model.trim="shippingDetails.phone">
      </div>
      <div class="hidden-xs col-sm-6 mb25"/>
      <div class="col-xs-12 col-sm-6 bottom-button">
        <button-full
          @click.native="updateDetails"
          :class="{ 'button-disabled': $v.$invalid }"
        >
          {{ $t('Update my shipping details') }}
        </button-full>
      </div>
      <div class="col-xs-12 col-sm-6 pt15 bottom-button">
        <a href="#" @click.prevent="exitSection" class="link no-underline fs16 cl-accent">
          {{ $t('Cancel') }}
        </a>
      </div>
    </div>

    <!-- The look when it's not in edit mode -->
    <div class="row fs16 mb35" v-if="!isEdited">
      <div class="col-xs-12 h4">
        <p>{{ shippingDetails.firstName }} {{ shippingDetails.lastName }}</p>
        <div class="col-xs-12 col-md-12 mb25" v-if="useCompanyAddress">
          <div class="checkboxStyled">
            <input type="checkbox" v-model="useCompanyAddress" id="useCompanyAddressFilled" disabled>
            <label for="useCompanyAddressFilled"/>
          </div>
          <div class="checkboxText ml15 lh25">
            <span class="fs16 cl-accent">Use my company's address details</span>
          </div>
        </div>
        <p class="mb25">{{ shippingDetails.company }}</p>
        <p class="mb25">
          {{ shippingDetails.street }}
          <span v-show="shippingDetails.house"> {{ shippingDetails.house }}</span>
        </p>
        <p class="mb25">{{ shippingDetails.city }} {{ shippingDetails.postcode }}</p>
        <p class="mb25">
          <span v-show="shippingDetails.region">{{ shippingDetails.region }}, </span>
          <span>{{ getCountryName() }}</span>
        </p>
        <div class="mb25">
          <span class="pr15">{{ shippingDetails.phone }}</span>
          <tooltip v-show="shippingDetails.phone">
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
    Tooltip
  },
  mixins: [coreComponent('blocks/MyAccount/MyShippingDetails')]
}
</script>
