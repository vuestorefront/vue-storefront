<template>
  <div class="personal-details">
    <div class="row pl20">
      <div class="col-xs-1 col-sm-2 col-md-1">
        <div
          class="number-circle lh35 c-white brdr-circle align-center weight-700"
          :class="{ 'bg-darkgray' : isActive || isFilled, 'bg-gray' : !isFilled && !isActive }"
        >
          1
        </div>
      </div>
      <div class="col-xs-11 col-sm-9 col-md-11">
        <div class="row mb15">
          <div class="col-xs-12 col-md-6" :class="{ 'c-gray' : !isFilled && !isActive }">
            <h3 class="m0 mb5">
              {{ $t('Personal Details') }}
            </h3>
          </div>
          <div class="col-xs-12 col-md-6 pr30">
            <div class="lh30 flex end-md" v-if="isFilled && !isActive">
              <a href="#" class="c-lightgray-secondary flex" @click.prevent="edit">
                <span class="pr5">
                  {{ $t('Edit personal details') }}
                </span>
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
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-6 mb25">
            <input
              class="py10 brdr-none brdr-bottom brdr-c-lightgray-secondary h4"
              type="text"
              name="first-name"
              :placeholder="$t('First name *')"
              v-model.trim="personalDetails.firstName"
              @blur="$v.personalDetails.firstName.$touch()"
              autocomplete="given-name"
            >
            <span
              class="validation-error"
              v-if="$v.personalDetails.firstName.$error && !$v.personalDetails.firstName.required"
            >
              {{ $t('Field is required') }}
            </span>
            <span class="validation-error" v-if="!$v.personalDetails.firstName.minLength">
              {{ $t('Name must have at least 3 letters.') }}
            </span>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 mb25">
            <input
              class="py10 brdr-none brdr-bottom brdr-c-lightgray-secondary h4"
              type="text"
              name="last-name"
              :placeholder="$t('Last name *')"
              v-model.trim="personalDetails.lastName"
              @blur="$v.personalDetails.lastName.$touch()"
              autocomplete="family-name"
            >
            <span
              class="validation-error"
              v-if="$v.personalDetails.lastName.$error && !$v.personalDetails.lastName.required"
            >
              {{ $t('Field is required') }}
            </span>
          </div>
          <div class="col-xs-12 col-sm-12 mb25">
            <input
              class="py10 brdr-none brdr-bottom brdr-c-lightgray-secondary h4"
              type="email"
              name="email-address"
              :placeholder="$t('Email address *')"
              v-model="personalDetails.emailAddress"
              @blur="$v.personalDetails.emailAddress.$touch()"
              autocomplete="email"
            >
            <span
              class="validation-error"
              v-if="$v.personalDetails.emailAddress.$error && !$v.personalDetails.emailAddress.required"
            >
              {{ $t('Field is required') }}
            </span>
            <span class="validation-error" v-if="!$v.personalDetails.emailAddress.email && $v.personalDetails.emailAddress.$error">
              {{ $t('Please provide valid e-mail address.') }}
            </span>
          </div>
          <div class="col-xs-12 col-sm-12 mb15" v-show="!currentUser">
            <div class="checkboxStyled">
              <input type="checkbox" v-model="createAccount" id="createAccountCheckbox">
              <label for="createAccountCheckbox"/>
            </div>
            <div class="checkboxText ml15 lh25" @click="createAccount = !createAccount">
              <span v-if="!isFilled" class="fs16 c-darkgray">{{ $t('I want to create an account') }}</span>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 mb25 mt10" v-show="createAccount && !currentUser">
            <div class="pass-container relative mr35">
              <input
                class="pr30 py10 w-100 border-box brdr-none brdr-bottom brdr-c-lightgray-secondary h4"
                name="password"
                v-model="password"
                :type="passType.pass"
                :placeholder="$t('Password *')"
                @blur="$v.password.$touch()"
                autocomplete="new-password"
              >
              <div class="icon absolute c-lightgray-secondary pointer">
                <i class="material-icons" @click="togglePassType('pass')">{{ iconName.pass }}</i>
              </div>
            </div>
            <span class="validation-error" v-if="$v.password.$error && !$v.password.required">{{ $t('Field is required.') }}</span>
          </div>
          <div class="col-xs-12 col-sm-12 mb25" v-show="createAccount && !currentUser">
            <div class="pass-container relative mr35">
              <input
                class="pr30 py10 w-100 border-box brdr-none brdr-bottom brdr-c-lightgray-secondary h4"
                name="password-confirm"
                v-model="rPassword"
                :type="passType.repeatPass"
                :placeholder="$t('Repeat password *')"
                autocomplete="new-password"
              >
              <i class="icon absolute material-icons c-lightgray-secondary pointer" @click="togglePassType('repeatPass')">
                {{ iconName.repeatPass }}
              </i>
            </div>
            <span class="validation-error" v-if="!$v.rPassword.sameAsPassword">{{ $t('Passwords must be identical.') }}</span>
          </div>
          <div class="col-xs-12 col-md-12 mb15" v-show="createAccount && !currentUser">
            <div class="checkboxStyled">
              <input type="checkbox" name="remember" v-model="acceptConditions" id="acceptConditions" @blur="$v.acceptConditions.$touch()">
              <label for="acceptConditions"/>
            </div>
            <div class="checkboxText ml15 lh25" @click="acceptConditions = !acceptConditions">
              <span class="fs16 c-darkgray">
                {{ $t('I accept ') }}<a class="no-underline link" href="#" @click.stop="$bus.$emit('modal-toggle', 'modal-terms')">{{ $t('terms and conditions') }}</a> *
              </span>
            </div>
            <span class="validation-error" v-if="!$v.acceptConditions.required && $v.acceptConditions.$error">{{ $t('You must accept the terms and conditions.') }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-show="isActive">
      <div class="hidden-xs col-sm-2 col-md-1"/>
      <div class="col-xs-12 col-sm-9 col-md-11">
        <div class="row">
          <div class="col-xs-12 col-md-8 col-lg-6 my30 px20 button-container">
            <button-full
              @click.native="sendDataToCheckout"
              :class="{ 'button-disabled' : (createAccount ? $v.$invalid : $v.personalDetails.$invalid) }"
            >
              {{ $t('Continue to shipping') }}
            </button-full>
          </div>
          <div class="col-xs-12 col-md-12 col-lg-6 pl20 login-prompt bottom-button" v-show="!currentUser">
            <p class="h4 c-darkgray">
              {{ $t('or') }}
              <a v-if="true" href="#" @click="gotoAccount" class="link no-underline fs16 c-darkgray">
                {{ $t('login to your account') }}
              </a>
            </p>
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
              {{ personalDetails.firstName }} {{ personalDetails.lastName }}
            </p>
            <div>
              <span class="pr15">{{ personalDetails.emailAddress }}</span>
              <tooltip>{{ $t('We will send you details regarding the order') }}</tooltip>
            </div>
            <div v-if="createAccount && !currentUser" class="mt25">
              <div class="checkboxStyled">
                <input type="checkbox" v-model="createAccount" id="createAccountCheckbox2" disabled>
                <label for="createAccountCheckbox2"/>
              </div>
              <div class="checkboxText ml15 lh25">
                <span class="fs16 c-darkgray">Create a new account</span>
              </div>
              <p class="h5 c-lightgray-secondary">
                {{ $t('The new account will be created with the purchase. You will receive details on e-mail.') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import Tooltip from 'theme/components/core/Tooltip.vue'
import Modal from 'theme/components/core/Modal.vue'
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'

// https://monterail.github.io/vuelidate/#sub-basic-usage

export default {
  validations: {
    personalDetails: {
      firstName: {
        required,
        minLength: minLength(3)
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
      required
    }
  },
  data () {
    return {
      passType: {
        pass: 'password',
        repeatPass: 'password'
      },
      iconName: {
        pass: 'visibility',
        repeatPass: 'visibility'
      }
    }
  },
  methods: {
    togglePassType (name) {
      if (this.passType[name] === 'password') {
        this.passType[name] = 'text'
        this.iconName[name] = 'visibility_off'
      } else {
        this.passType[name] = 'password'
        this.iconName[name] = 'visibility'
      }
    }
  },
  components: {
    ButtonFull,
    Tooltip,
    Modal
  },
  mixins: [coreComponent('blocks/Checkout/PersonalDetails')]
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/base/global_vars';
  $black: map-get($colors, black);
  $gray: map-get($colors, gray);

  .pass-container {
    input[type=password], input[type=text] {
      &:focus {
        outline: none;
        border-color: $black;
        transition: 0.3s all;
      }
    }

    .icon {
      right: 0;
      top: 10px;

      &:hover {
        color: $gray;
      }
    }
  }

  .link {
    text-decoration: underline;
  }

  .login-prompt {
    @media (min-width: 1200px) {
      margin-top: 30px;
    }
  }

  .button-container {
    @media (max-width: 1200px) {
      margin-bottom: 10px;
      margin-top: 15px;
    }
  }
</style>
