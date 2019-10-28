<template>
  <div>
    <div class="modal-content">
      <form @submit.prevent="register" novalidate class="t-flex t-flex-wrap t--mx-2">
        <base-input
          type="email"
          name="email"
          autocomplete="email"
          v-model="email"
          focus
          :placeholder="$t('E-mail address *')"
          :validations="[
            {
              condition: !$v.email.required && $v.email.$error,
              text: $t('Field is required.')
            },
            {
              condition: !$v.email.email && $v.email.$error,
              text: $t('Please provide valid e-mail address.')
            }
          ]"
          class="t-w-full t-px-2 t-mb-4"
        />
        <base-input
          name="first-name"
          autocomplete="given-name"
          v-model="firstName"
          :placeholder="$t('First name *')"
          :validations="[
            {
              condition: !$v.firstName.required && $v.firstName.$error,
              text: $t('Field is required.')
            }
          ]"
          class="t-w-full lg:t-w-1/2 t-px-2 t-mb-4"
        />
        <base-input
          name="last-name"
          autocomplete="family-name"
          v-model="lastName"
          :placeholder="$t('Last name *')"
          :validations="[{
            condition: !$v.lastName.required && $v.lastName.$error,
            text: $t('Field is required.')
          }]"
          class="t-w-full lg:t-w-1/2 t-px-2 t-mb-4"
        />
        <base-select
          name="gender"
          v-model="gender"
          :options="genderOptions"
          :initial-option-text="$t('Gender *')"
          :validations="[{
            condition: !$v.gender.required && $v.gender.$error,
            text: $t('Field is required.')
          }]"
          class="t-w-full lg:t-w-1/2 t-px-2 t-mb-4"
        />
        <base-input
          name="dob"
          autocomplete="bday"
          mask="date"
          v-model="dob"
          :placeholder="$t('Date of birth') + ' (DD.MM.YYYY) *'"
          :validations="[
            {
              condition: !$v.dob.required && $v.dob.$error,
              text: $t('Field is required.')
            }
          ]"
          class="t-w-full lg:t-w-1/2 t-px-2 t-mb-4"
        />
        <base-input
          type="password"
          name="password"
          ref="password"
          autocomplete="new-password"
          v-model="password"
          :placeholder="$t('Password *')"
          :validations="[
            {
              condition: !$v.password.required && $v.password.$error,
              text: $t('Field is required.')
            },
            {
              condition: !$v.password.minLength && $v.password.$error,
              text: $t('Password must have at least 8 letters.')
            }
          ]"
          class="t-w-full lg:t-w-1/2 t-px-2 t-mb-4"
        />
        <base-input
          type="password"
          name="password-confirm"
          autocomplete="new-password"
          v-model="rPassword"
          :placeholder="$t('Repeat password *')"
          :validations="[
            {
              condition: !$v.rPassword.required && $v.rPassword.$error,
              text: $t('Field is required.')
            },
            {
              condition: !$v.rPassword.sameAsPassword && $v.rPassword.$error,
              text: $t('Passwords must be identical.')
            }
          ]"
          class="t-w-full lg:t-w-1/2 t-px-2 t-mb-4"
        />
        <base-checkbox
          name="newsletter"
          id="newsletter"
          v-model="newsletter"
          class="t-w-full t-px-2 t-mb-4"
        >
          {{ $t('I want to receive a newsletter') }}
        </base-checkbox>
        <div class="t-w-full t-px-2">
          <button-component :submit="true" type="primary" class="t-w-full t-mb-2">
            {{ $t('Register') }} *
          </button-component>
          <button-component type="transparent" @click="switchElem" class="t-w-full t-mb-4">
            {{ $t('Already have an account?') }} <span class="t-ml-1">– {{ $t('Login to your account') }}</span>
          </button-component>
          <div class="t-w-full t-text-xs t-text-base-lighter t-leading-1-rem lg:t-text-center">
            <material-icon icon="asterisk" icon-set="icmaa" size="xxs" class="t-mr-1" />
            <i18n path="I have read and agree with the {terms}, {policy} and {return}." tag="span">
              <router-link place="terms" :to="localizedRoute('/terms')" v-html="$t('Terms and Conditions')" class="t-text-base-lighter t-underline" />
              <router-link place="policy" :to="localizedRoute('/policy')" v-html="$t('Privacy Policy')" class="t-text-base-lighter t-underline" />
              <router-link place="return" :to="localizedRoute('/return')" v-html="$t('Return Instructions')" class="t-text-base-lighter t-underline" />
            </i18n>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import i18n from '@vue-storefront/i18n'
import ButtonComponent from 'theme/components/core/blocks/Button'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import BaseSelect from 'theme/components/core/blocks/Form/BaseSelect'
import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox'
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import { Logger } from '@vue-storefront/core/lib/logger'

export default {
  name: 'Register',
  components: {
    BaseInput,
    BaseSelect,
    BaseCheckbox,
    ButtonComponent,
    MaterialIcon
  },
  data () {
    return {
      email: '',
      firstName: '',
      lastName: '',
      gender: '',
      dob: '',
      newsletter: false,
      password: '',
      rPassword: '',
      conditions: false
    }
  },
  validations: {
    email: {
      required,
      email
    },
    firstName: {
      required
    },
    lastName: {
      required
    },
    gender: {
      required
    },
    dob: {
      required
    },
    password: {
      minLength: minLength(8),
      required
    },
    rPassword: {
      required,
      sameAsPassword: sameAs('password')
    }
  },
  computed: {
    genderOptions () {
      return [
        { label: i18n.t('Male'), value: 'male' },
        { label: i18n.t('Female'), value: 'female' }
      ]
    }
  },
  methods: {
    switchElem () {
      // TODO Move to theme
      this.$store.commit('ui/setAuthElem', 'login')
    },
    close () {
      // TODO Move to theme
      this.$bus.$emit('modal-hide', 'modal-signup')
    },
    callRegister () {
      // TODO Move to theme
      this.$bus.$emit('notification-progress-start', i18n.t('Registering the account ...'))
      this.$store.dispatch('user/register', { email: this.email, password: this.password, firstname: this.firstName, lastname: this.lastName }).then((result) => {
        Logger.debug(result, 'user')()
        // TODO Move to theme
        this.$bus.$emit('notification-progress-stop')
        if (result.code !== 200) {
          this.onFailure(result)
          // If error includes a word 'password', focus on a corresponding field
          if (result.result.includes('password')) {
            this.$refs['password'].setFocus('password')
            this.password = ''
            this.rPassword = ''
          }
        } else {
          this.$store.dispatch('user/login', { username: this.email, password: this.password })
          this.onSuccess()
          this.close()
        }
      }).catch(err => {
        // TODO Move to theme
        this.onFailure({ result: 'Unexpected authorization error. Check your Network conection.' })
        this.$bus.$emit('notification-progress-stop')
        Logger.error(err, 'user')()
      })
    },
    register () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.callRegister()
      }
    },
    onSuccess () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: this.$t('You are logged in!'),
        action1: { label: this.$t('OK') }
      })
    },
    onFailure (result) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: this.$t(result.result),
        action1: { label: this.$t('OK') }
      })
    }
  }
}
</script>
