<template>
  <div class="mb35">
    <!-- My profile header -->
    <div class="row mb15">
      <div class="col-xs-12 col-sm-6" :class="{ 'cl-accent' : !isEdited }">
        <h3 class="m0 mb5">
          {{ $t('My profile') }}
        </h3>
      </div>
      <div class="col-xs-12 col-sm-6">
        <div class="lh30 flex end-md" v-if="!isEdited && editMode">
          <a href="#" class="cl-tertiary flex" @click.prevent="edit">
            <span class="pr5">
              {{ $t('Edit your profile') }}
            </span>
            <i class="material-icons cl-tertiary">edit</i>
          </a>
        </div>
      </div>
    </div>

    <!-- My profile body (edit mode) -->
    <div class="row" v-if="isEdited">
      <base-input
        class="col-xs-12 col-md-6 mb25"
        type="text"
        name="first-name"
        :placeholder="$t('First name')"
        v-model.trim="currentUser.firstname"
        @input="$v.currentUser.firstname.$touch()"
        :validations="[
          {
            condition: !$v.currentUser.firstname.required,
            text: $t('Field is required')
          },
          {
            condition: !$v.currentUser.firstname.minLength,
            text: $t('Name must have at least 3 letters.')
          }
        ]"
      />

      <base-input
        class="col-xs-12 col-md-6 mb25"
        type="text"
        name="last-name"
        :placeholder="$t('Last name')"
        v-model.trim="currentUser.lastname"
        @input="$v.currentUser.lastname.$touch()"
        :validation="{
          condition: !$v.currentUser.lastname.required,
          text: $t('Field is required')
        }"
      />

      <base-input
        class="col-xs-12 col-md-6 mb25"
        type="email"
        name="email-address"
        :placeholder="$t('Email address')"
        v-model="currentUser.email"
        :validations="[
          {
            condition: !$v.currentUser.email.required,
            text: $t('Field is required')
          },
          {
            condition: !$v.currentUser.email.email,
            text: $t('Please provide valid e-mail address.')
          }
        ]"
      />

      <!-- Change password (edit mode) -->
      <base-checkbox
        class="col-xs-12 mb15"
        id="changePassword"
        v-model="changePassword"
        @click="changePassword = !changePassword"
      >
        {{ $t('Change my password') }}
      </base-checkbox>

      <template v-if="changePassword">
        <base-input
          class="col-xs-12 col-md-6 mb15 mt10"
          type="password"
          name="old-password"
          :placeholder="$t('Current password *')"
          v-model="oldPassword"
          @input="$v.oldPassword.$touch()"
          :validation="{
            condition: !$v.oldPassword.required && $v.oldPassword.$error,
            text: $t('Field is required')
          }"
        />

        <div class="hidden-xs hidden-sm col-md-6 mb15 mt10"/>

        <base-input
          class="col-xs-12 col-md-6 mb15 mt10"
          type="password"
          name="password"
          :placeholder="$t('New password *')"
          v-model="password"
          @input="$v.password.$touch()"
          :validation="{
            condition: !$v.password.required && $v.password.$error,
            text: $t('Field is required')
          }"
        />

        <base-input
          class="col-xs-12 col-md-6 mb15 mt10"
          type="password"
          name="password-confirm"
          :placeholder="$t('Repeat new password *')"
          v-model="rPassword"
          @input="$v.rPassword.$touch()"
          :validations="[
            {
              condition: !$v.rPassword.required && $v.rPassword.$error,
              text: $t('Field is required')
            },
            {
              condition: !$v.rPassword.sameAsPassword,
              text: $t('Passwords must be identical.')
            }
          ]"
        />
      </template>

      <!-- Company information (edit mode) -->
      <base-checkbox
        class="col-xs-12 mb15 mt10"
        id="addCompany"
        v-model="addCompany"
        @click="addCompany = !addCompany"
      >
        {{ $t('I have a company and want to receive an invoice for every order') }}
      </base-checkbox>

      <template v-if="addCompany">
        <base-input
          class="col-xs-12 mb25"
          type="text"
          name="company-name"
          :placeholder="$t('Company name *')"
          v-model.trim="userCompany.company"
          @input="$v.userCompany.company.$touch()"
          :validation="{
            condition: !$v.userCompany.company.required && $v.userCompany.company.$error,
            text: $t('Field is required')
          }"
        />

        <base-input
          class="col-xs-12 col-sm-6 mb25"
          type="text"
          name="street-address"
          :placeholder="$t('Street name *')"
          v-model.trim="userCompany.street"
          @input="$v.userCompany.street.$touch()"
          :validation="{
            condition: !$v.userCompany.street.required && $v.userCompany.street.$error,
            text: $t('Field is required')
          }"
        />

        <base-input
          class="col-xs-12 col-sm-6 mb25"
          type="text"
          name="apartment-number"
          :placeholder="$t('House/Apartment number *')"
          v-model.trim="userCompany.house"
          @input="$v.userCompany.house.$touch()"
          :validation="{
            condition: !$v.userCompany.house.required && $v.userCompany.house.$error,
            text: $t('Field is required')
          }"
        />

        <base-input
          class="col-xs-12 col-sm-6 mb25"
          type="text"
          name="city"
          :placeholder="$t('City *')"
          v-model.trim="userCompany.city"
          @input="$v.userCompany.city.$touch()"
          :validation="{
            condition: !$v.userCompany.city.required && $v.userCompany.city.$error,
            text: $t('Field is required')
          }"
        />

        <base-input
          class="col-xs-12 col-sm-6 mb25"
          type="text"
          name="state"
          :placeholder="$t('State / Province')"
          v-model.trim="userCompany.region"
        />

        <base-input
          class="col-xs-12 col-sm-6 mb25"
          type="text"
          name="zip-code"
          :placeholder="$t('Zip-code *')"
          v-model.trim="userCompany.postcode"
          @input="$v.userCompany.postcode.$touch()"
          :validations="[
            {
              condition: !$v.userCompany.postcode.required && $v.userCompany.postcode.$error,
              text: $t('Field is required')
            },
            {
              condition: !$v.userCompany.postcode.minLength,
              text: $t('Zip-code must have at least 3 letters.')
            }
          ]"
        />

        <div class="col-xs-12 col-sm-6 mb25">
          <select
            name="countries"
            v-model="userCompany.country"
            :class="{'cl-tertiary' : userCompany.country.length === 0}"
          >
            <option value="" disabled selected hidden>
              {{ $t('Country *') }}
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
            v-if="!$v.userCompany.country.required && $v.userCompany.country.$error"
          >
            {{ $t('Field is required') }}
          </span>
        </div>

        <base-input
          class="col-xs-12 col-sm-6 mb25"
          type="text"
          name="taxId"
          :placeholder="$t('Tax ID *')"
          v-model.trim="userCompany.taxId"
          @input="$v.userCompany.taxId.$touch()"
          :validations="[
            {
              condition: !$v.userCompany.taxId.required && $v.userCompany.taxId.$error,
              text: $t('Field is required')
            },
            {
              condition: !$v.userCompany.taxId.minLength,
              text: $t('Tax ID must have at least 3 letters.')
            }
          ]"
        />

        <div class="hidden-xs col-sm-6 mb25"/>
      </template>

      <div class="col-xs-12 col-sm-6">
        <button-full
          @click.native="updateProfile"
          :class="{ 'button-disabled': checkValidation() }"
        >
          {{ $t('Update my profile') }}
        </button-full>
      </div>
      <div class="col-xs-12 col-sm-6 flex middle-xs py10">
        <a href="#" @click="exitSection" class="h4 cl-accent">
          {{ $t('Cancel') }}
        </a>
      </div>
    </div>

    <!-- My profile summary -->
    <div class="row fs16 mb35" v-else>
      <div class="col-xs-12 h4">
        <p>
          {{ currentUser.firstname }} {{ currentUser.lastname }}
        </p>
        <p>
          {{ currentUser.email }}
        </p>
        <base-checkbox
          v-if="addCompany"
          class="mb25"
          id="addCompanyFilled"
          v-model="addCompany"
          disabled
        >
          {{ $t('I have a company and want to receive an invoice for every order') }}
        </base-checkbox>
        <template v-if="addCompany">
          <p class="mb25">
            {{ userCompany.company }}
          </p>
          <p class="mb25">
            {{ userCompany.street }}
            <span v-if="userCompany.house">
              {{ userCompany.house }}
            </span>
          </p>
          <p class="mb25">
            {{ userCompany.city }} {{ userCompany.postcode }}
          </p>
          <p class="mb25">
            <span v-if="userCompany.region">{{ userCompany.region }}, </span>
            <span>
              {{ getCountryName() }}
            </span>
          </p>
          <p class="mb25" v-if="userCompany.taxId">
            {{ userCompany.taxId }}
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'core/lib/themes'
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import BaseCheckbox from '../Form/BaseCheckbox.vue'
import BaseInput from '../Form/BaseInput.vue'

export default {
  validations: {
    currentUser: {
      firstname: {
        required,
        minLength: minLength(3)
      },
      lastname: {
        required
      },
      email: {
        required,
        email
      }
    },
    oldPassword: {
      required
    },
    password: {
      required
    },
    rPassword: {
      required,
      sameAsPassword: sameAs('password')
    },
    userCompany: {
      company: {
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
        minLength: minLength(3)
      },
      city: {
        required
      },
      taxId: {
        required,
        minLength: minLength(3)
      }
    }
  },
  methods: {
    checkValidation () {
      if (this.changePassword && this.addCompany) {
        return this.$v.$invalid
      } else if (this.changePassword && !this.addCompany) {
        return this.$v.currentUser.$invalid || this.$v.password.$invalid || this.$v.rPassword.$invalid
      } else if (!this.changePassword && this.addCompany) {
        return this.$v.currentUser.$invalid || this.$v.userCompany.$invalid
      } else {
        return this.$v.currentUser.$invalid
      }
    }
  },
  components: {
    ButtonFull,
    BaseCheckbox,
    BaseInput
  },
  mixins: [coreComponent('blocks/MyAccount/MyProfile')]
}
</script>
