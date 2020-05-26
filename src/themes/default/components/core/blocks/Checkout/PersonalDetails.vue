<template>
  <div class="personal-details">
    <div class="row pl20">
      <div class="col-xs-1 col-sm-2 col-md-1">
        <div
          class="number-circle lh35 cl-white brdr-circle align-center weight-700"
          :class="{ 'bg-cl-th-accent' : isActive || isFilled, 'bg-cl-tertiary' : !isFilled && !isActive }"
        >
          1
        </div>
      </div>
      <div class="col-xs-11 col-sm-9 col-md-11">
        <div class="row mb15">
          <div class="col-xs-12 col-md-7" :class="{ 'cl-bg-tertiary' : !isFilled && !isActive }">
            <h3 class="m0 mb5">
              {{ $t('Personal Details') }}
            </h3>
          </div>
          <div class="col-xs-12 col-md-5 pr30">
            <div class="lh30 flex end-lg" v-if="isFilled && !isActive">
              <a href="#" class="cl-tertiary flex" @click.prevent="edit">
                <span class="pr5">
                  {{ $t('Edit personal details') }}
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
        <div class="row">
          <base-input
            class="col-xs-12 col-md-6 mb10"
            type="text"
            :autofocus="true"
            name="first-name"
            :placeholder="$t('First name *')"
            v-model.trim="personalDetails.firstName"
            @blur="$v.personalDetails.firstName.$touch()"
            autocomplete="given-name"
            :validations="[
              {
                condition: $v.personalDetails.firstName.$error && !$v.personalDetails.firstName.required,
                text: $t('Field is required')
              },
              {
                condition: !$v.personalDetails.firstName.minLength,
                text: $t('Name must have at least 2 letters.')
              }
            ]"
          />

          <base-input
            class="col-xs-12 col-md-6 mb10"
            type="text"
            name="last-name"
            :placeholder="$t('Last name *')"
            v-model.trim="personalDetails.lastName"
            @blur="$v.personalDetails.lastName.$touch()"
            autocomplete="family-name"
            :validations="[{
              condition: $v.personalDetails.lastName.$error && !$v.personalDetails.lastName.required,
              text: $t('Field is required')
            }]"
          />

          <base-input
            class="col-xs-12 mb10"
            type="email"
            name="email-address"
            :placeholder="$t('Email address *')"
            v-model="personalDetails.emailAddress"
            @blur="$v.personalDetails.emailAddress.$touch()"
            autocomplete="email"
            @keyup.enter="sendDataToCheckout"
            :validations="[
              {
                condition: $v.personalDetails.emailAddress.$error && !$v.personalDetails.emailAddress.required,
                text: $t('Field is required')
              },
              {
                condition: !$v.personalDetails.emailAddress.email && $v.personalDetails.emailAddress.$error,
                text: $t('Please provide valid e-mail address.')
              }
            ]"
          />

          <base-checkbox
            v-if="!currentUser"
            class="col-xs-12 mb15"
            id="createAccountCheckbox"
            v-model="createAccount"
          >
            {{ $t('I want to create an account') }}
          </base-checkbox>

          <template v-if="createAccount && !currentUser">
            <base-input
              class="col-xs-12 mb10 mt10"
              type="password"
              name="password"
              ref="password"
              :placeholder="$t('Password *')"
              v-model="password"
              @blur="$v.password.$touch()"
              autocomplete="new-password"
              :validations="[{
                condition: $v.password.$error && !$v.password.required,
                text: $t('Field is required.')
              }]"
            />

            <base-input
              class="col-xs-12 mb25"
              type="password"
              name="password-confirm"
              :placeholder="$t('Repeat password *')"
              v-model="rPassword"
              autocomplete="new-password"
              :validations="[
                {
                  condition: $v.rPassword.$error && !$v.rPassword.required,
                  text: $t('Field is required.')
                },
                {
                  condition:!$v.rPassword.sameAsPassword,
                  text: $t('Passwords must be identical.')
                }
              ]"
            />

            <base-checkbox
              class="col-xs-12 mb15"
              id="acceptConditions"
              @blur="$v.acceptConditions.$touch()"
              v-model="acceptConditions"
              :validations="[{
                condition: !$v.acceptConditions.sameAs && $v.acceptConditions.$error,
                text: $t('You must accept the terms and conditions.')
              }]"
            >
              {{ $t('I accept ') }}
              <span
                class="link pointer"
                @click.prevent="$bus.$emit('modal-toggle', 'modal-terms')"
              >
                {{ $t('Terms and conditions') }}
              </span>*
            </base-checkbox>
          </template>
        </div>
      </div>
    </div>
    <div class="row" v-show="isActive">
      <div class="hidden-xs col-sm-2 col-md-1" />
      <div class="col-xs-11 col-sm-9 col-md-10">
        <div class="row my30">
          <div class="col-xs-12 col-xl-7 px20 button-container">
            <button-full
              data-testid="personalDetailsSubmit"
              @click.native="sendDataToCheckout"
              :disabled="createAccount ? $v.$invalid : $v.personalDetails.$invalid"
            >
              {{ $t((isVirtualCart ? 'Continue to payment' : 'Continue to shipping')) }}
            </button-full>
          </div>
          <div
            class="col-xs-12 col-xl-5 center-xs end-xl"
            v-if="!currentUser"
          >
            <p class="h4 cl-accent">
              {{ $t('or') }}
              <span
                class="link pointer"
                @click.prevent="gotoAccount"
              >
                {{ $t('login to your account') }}
              </span>
            </p>
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
              {{ personalDetails.firstName }} {{ personalDetails.lastName }}
            </p>
            <div>
              <span class="pr15">{{ personalDetails.emailAddress }}</span>
              <tooltip>{{ $t('We will send you details regarding the order') }}</tooltip>
            </div>
            <template v-if="createAccount && !currentUser">
              <base-checkbox
                class="mt25"
                id="createAccountCheckboxInfo"
                v-model="createAccount"
                disabled
              >
                {{ $t('Create a new account') }}
              </base-checkbox>
              <p class="h5 cl-tertiary">
                {{ $t('The new account will be created with the purchase. You will receive details on e-mail.') }}
              </p>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
import { PersonalDetails } from '@vue-storefront/core/modules/checkout/components/PersonalDetails'

import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import ButtonFull from 'theme/components/theme/ButtonFull'
import Tooltip from 'theme/components/core/Tooltip'

export default {
  components: {
    ButtonFull,
    Tooltip,
    BaseCheckbox,
    BaseInput
  },
  mixins: [PersonalDetails],
  validations: {
    personalDetails: {
      firstName: {
        required,
        minLength: minLength(2)
      },
      lastName: {
        required
      },
      emailAddress: {
        required,
        email
      }
    },
    password: {
      required
    },
    rPassword: {
      required,
      sameAsPassword: sameAs('password')
    },
    acceptConditions: {
      sameAs: sameAs(() => true)
    }
  }
}
</script>

<style lang="scss" scoped>
.link {
  text-decoration: underline;
}

.login-prompt {
  @media (min-width: 1200px) {
    margin-top: 30px;
  }
}
</style>
