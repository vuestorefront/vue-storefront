<template>
  <div class="t-p-4 t-bg-white">
    <headline icon="account_circle">
      {{ $t('My profile') }}
    </headline>
    <form @submit.prevent="submit" novalidate class="t-flex t-flex-wrap t--mx-2">
      <base-input
        type="email"
        name="email"
        id="email"
        autocomplete="email"
        v-model="profile.email"
        focus
        :label="$t('E-mail address') + ' *'"
        :validations="[
          {
            condition: !validation.email.required && validation.email.$error,
            text: $t('Field is required.')
          },
          {
            condition: !validation.email.email && validation.email.$error,
            text: $t('Please provide valid e-mail address.')
          }
        ]"
        class="t-w-full lg:t-w-1/2 t-px-2 t-mb-4"
      />
      <base-input
        name="first-name"
        id="first-name"
        autocomplete="given-name"
        v-model="profile.firstname"
        :label="$t('First name') + ' *'"
        :validations="[
          {
            condition: !validation.firstname.required && validation.firstname.$error,
            text: $t('Field is required.')
          }
        ]"
        class="t-w-full lg:t-w-1/2 t-px-2 t-mb-4"
      />
      <base-input
        name="last-name"
        id="last-name"
        autocomplete="family-name"
        v-model="profile.lastname"
        :label="$t('Last name') + ' *'"
        :validations="[{
          condition: !validation.lastname.required && validation.lastname.$error,
          text: $t('Field is required.')
        }]"
        class="t-w-full lg:t-w-1/2 t-px-2 t-mb-4"
      />
      <base-select
        name="gender"
        id="gender"
        v-model="profile.gender"
        :options="genderOptions"
        :label="$t('Gender') + ' *'"
        :initial-option-text="$t('Gender')"
        :validations="[{
          condition: !validation.gender.required && validation.gender.$error,
          text: $t('Field is required.')
        }]"
        class="t-w-full lg:t-w-1/2 t-px-2 t-mb-4"
      />
      <base-input
        name="dob"
        id="dob"
        autocomplete="bday"
        mask="date"
        v-model="profile.dob"
        :label="$t('Date of birth') + ' *'"
        :placeholder="'DD.MM.YYYY'"
        :validations="[
          {
            condition: !validation.dob.required && validation.dob.$error,
            text: $t('Field is required.')
          },
          {
            condition: !validation.dob.date && validation.dob.$error,
            text: $t('Use a valid date.')
          }
        ]"
        class="t-w-full lg:t-w-1/2 t-px-2 t-mb-4"
      />
      <base-checkbox
        name="changePassword"
        id="changePassword"
        v-model="profile.changePassword"
        class="t-w-full t-px-2 t-mb-4"
      >
        {{ $t('Change my password') }}
      </base-checkbox>
      <div v-if="profile.changePassword" class="t-flex t-flex-wrap t-flex-grow">
        <base-input
          type="password"
          name="oldPassword"
          id="oldPassword"
          ref="oldPassword"
          autocomplete="old-password"
          v-model="profile.oldPassword"
          :label="$t('Current password') + ' *'"
          :validations="[
            {
              condition: !validation.oldPassword.required && validation.oldPassword.$error,
              text: $t('Field is required.')
            },
            {
              condition: !validation.oldPassword.minLength && validation.oldPassword.$error,
              text: $t('Password must have at least 8 letters.')
            }
          ]"
          class="t-w-full lg:t-w-1/2 t-px-2 t-mb-4"
        />
        <div class="t-w-full" />
        <base-input
          type="password"
          name="password"
          id="password"
          ref="password"
          autocomplete="new-password"
          v-model="profile.password"
          :label="$t('Password') + ' *'"
          :validations="[
            {
              condition: !validation.password.required && validation.password.$error,
              text: $t('Field is required.')
            },
            {
              condition: !validation.password.minLength && validation.password.$error,
              text: $t('Password must have at least 8 letters.')
            }
          ]"
          class="t-w-full lg:t-w-1/2 t-px-2 t-mb-4"
        />
        <base-input
          type="password"
          name="rPassword"
          id="rPassword"
          autocomplete="new-password"
          v-model="profile.rPassword"
          :label="$t('Repeat password') + ' *'"
          :validations="[
            {
              condition: !validation.rPassword.required && validation.rPassword.$error,
              text: $t('Field is required.')
            },
            {
              condition: !validation.rPassword.sameAsPassword && validation.rPassword.$error,
              text: $t('Passwords must be identical.')
            }
          ]"
          class="t-w-full lg:t-w-1/2 t-px-2 t-mb-4"
        />
      </div>
      <div class="t-px-2 t-w-full">
        <button-component :submit="true" type="primary" class="t-w-full lg:t-w-auto">
          {{ $t('Update my profile') }}
        </button-component>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import config from 'config'
import i18n from '@vue-storefront/i18n'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

import pick from 'lodash-es/pick'
import invert from 'lodash-es/invert'

import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
import { unicodeAlpha, unicodeAlphaNum } from '@vue-storefront/core/helpers/validators'
import { date } from 'icmaa-config/helpers/validators'
import { toDate } from 'icmaa-config/helpers/datetime'

import Headline from 'theme/components/core/blocks/MyAccount/Headline'
import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox'
import BaseSelect from 'theme/components/core/blocks/Form/BaseSelect'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import ButtonComponent from 'theme/components/core/blocks/Button'

export default {
  name: 'MyProfile',
  components: {
    Headline,
    BaseCheckbox,
    BaseSelect,
    BaseInput,
    ButtonComponent
  },
  data () {
    return {
      profile: {
        email: '',
        firstname: '',
        lastname: '',
        gender: '',
        dob: '',
        changePassword: false,
        oldPassword: '',
        password: '',
        rPassword: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      viewport: 'ui/getViewport',
      customer: 'user/getCustomer'
    }),
    validation () {
      return this.$v.profile
    },
    genderOptions () {
      return [
        { label: i18n.t('Male'), value: 'male' },
        { label: i18n.t('Female'), value: 'female' }
      ]
    }
  },
  methods: {
    submit () {
      this.validation.$touch()
      if (!this.validation.$invalid) {
        let profile = this.profile
        if (profile.gender) {
          const gender = config.icmaa.user.gender_map[profile.gender]
          profile = Object.assign({}, profile, { gender })
        }
        if (profile.dob) {
          profile.dob = toDate(profile.dob, 'YYYY-MM-DD HH:mm:ss', currentStoreView().i18n.dateFormat)
        }

        let customer = Object.assign({}, this.customer, profile)

        let newPassword = false
        if (this.profile.changePassword) {
          newPassword = {
            currentPassword: this.profile.oldPassword,
            newPassword: this.profile.password
          }
        }

        this.$bus.$emit('myAccount-before-updateUser', customer, newPassword)
      }

      return false
    },
    initCustomer () {
      if (this.customer) {
        const keys = Object.keys(this.profile)
        this.profile = Object.assign({}, this.profile, pick(this.customer, keys))

        if (this.profile.dob) {
          this.profile.dob = toDate(this.profile.dob, currentStoreView().i18n.dateFormat, 'YYYY-MM-DD HH:mm:ss')
        }

        if (this.profile.gender) {
          this.profile.gender = invert(config.icmaa.user.gender_map)[this.profile.gender.toString()]
        }
      }
    }
  },
  mounted () {
    this.initCustomer()
  },
  beforeMount () {
    this.$bus.$on('user-after-loggedin', this.initCustomer)
  },
  beforeDestroy () {
    this.$bus.$off('user-after-loggedin', this.initCustomer)
  },
  validations () {
    const password = this.profile.changePassword ? {
      oldPassword: {
        required
      },
      password: {
        required
      },
      rPassword: {
        required,
        sameAsPassword: sameAs('password')
      }
    } : {}

    return {
      profile: {
        firstname: {
          required,
          minLength: minLength(2),
          unicodeAlpha
        },
        lastname: {
          required,
          unicodeAlpha
        },
        email: {
          required,
          email
        },
        dob: {
          required,
          date
        },
        gender: {
          required
        },
        ...password
      }
    }
  }
}
</script>
