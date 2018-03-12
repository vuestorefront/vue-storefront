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
          <div class="col-xs-12 col-md-6" :class="{ 'cl-bg-tertiary' : !isFilled && !isActive }">
            <h3 class="m0 mb5">
              {{ $t('Personal Details') }}
            </h3>
          </div>
          <div class="col-xs-12 col-md-6 pr30">
            <div class="lh30 flex end-md" v-if="isFilled && !isActive">
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
    <div class="row pl20" v-show="isActive">
      <div class="hidden-xs col-sm-2 col-md-1"/>
      <div class="col-xs-12 col-sm-9 col-md-11">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-6 mb25">
            <input
              class="py10 brdr-none brdr-bottom brdr-cl-primary h4"
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
              class="py10 brdr-none brdr-bottom brdr-cl-primary h4"
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
              class="py10 brdr-none brdr-bottom brdr-cl-primary h4"
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
          <base-checkbox
            v-show="!currentUser"
            class="col-xs-12 mb15"
            id="createAccountCheckbox"
            @click="createAccount = !createAccount"
            v-model="createAccount"
          >
            {{ $t('I want to create an account') }}
          </base-checkbox>
          <div class="col-xs-12 col-sm-12 mb25 mt10" v-show="createAccount && !currentUser">
            <div class="pass-container relative mr35">
              <input
                class="pr30 py10 w-100 border-box brdr-none brdr-bottom brdr-cl-primary h4"
                name="password"
                v-model="password"
                :type="passType.pass"
                :placeholder="$t('Password *')"
                @blur="$v.password.$touch()"
                autocomplete="new-password"
              >
              <div class="icon absolute cl-tertiary pointer">
                <i class="material-icons" @click="togglePassType('pass')">{{ iconName.pass }}</i>
              </div>
            </div>
            <span class="validation-error" v-if="$v.password.$error && !$v.password.required">{{ $t('Field is required.') }}</span>
          </div>
          <div class="col-xs-12 col-sm-12 mb25" v-show="createAccount && !currentUser">
            <div class="pass-container relative mr35">
              <input
                class="pr30 py10 w-100 border-box brdr-none brdr-bottom brdr-cl-primary h4"
                name="password-confirm"
                v-model="rPassword"
                :type="passType.repeatPass"
                :placeholder="$t('Repeat password *')"
                autocomplete="new-password"
              >
              <i class="icon absolute material-icons cl-tertiary pointer" @click="togglePassType('repeatPass')">
                {{ iconName.repeatPass }}
              </i>
            </div>
            <span class="validation-error" v-if="!$v.rPassword.sameAsPassword">{{ $t('Passwords must be identical.') }}</span>
          </div>
          <base-checkbox
            v-show="createAccount && !currentUser"
            class="col-xs-12 mb15"
            id="acceptConditions"
            @click="acceptConditions = !acceptConditions"
            @blur="$v.acceptConditions.$touch()"
            v-model="acceptConditions"
            :validation-if="!$v.acceptConditions.required && $v.acceptConditions.$error"
            :validation-text="$t('You must accept the terms and conditions.')"
          >
            {{ $t('I accept ') }}
            <span
              class="link pointer"
              @click.stop="$bus.$emit('modal-toggle', 'modal-terms')"
            >
              {{ $t('terms and conditions') }}
            </span>*
          </base-checkbox>
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
            <p class="h4 cl-accent">
              {{ $t('or') }}
              <a v-if="true" href="#" @click="gotoAccount" class="link no-underline fs16 cl-accent">
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
import { coreComponent } from 'core/lib/themes'

import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import Tooltip from 'theme/components/core/Tooltip.vue'
import Modal from 'theme/components/core/Modal.vue'
import BaseCheckbox from 'theme/components/theme/blocks/Form/BaseCheckbox.vue'
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
    Modal,
    BaseCheckbox
  },
  mixins: [coreComponent('blocks/Checkout/PersonalDetails')]
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-hover: color(tertiary, $colors-background);
$color-focus: color(black);

.pass-container {
  input[type=password], input[type=text] {
    &:focus {
      outline: none;
      border-color: $color-focus;
      transition: 0.3s all;
    }
  }

  .icon {
    right: 0;
    top: 10px;

    &:hover {
      color: $color-hover;
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
