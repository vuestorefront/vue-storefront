<template>
  <div>
    <header class="modal-header py25 px65 h1 serif weight-700 bg-cl-secondary">
      {{ $t('Register') }}
      <i
        slot="close"
        class="modal-close material-icons cl-bg-tertiary"
        @click="close"
      >
        close
      </i>
    </header>

    <div class="modal-content bg-cl-primary pt30 pb60 px65 cl-secondary">
      <form @submit.prevent="register" novalidate>
        <base-input
          class="mb10"
          type="email"
          name="email"
          autocomplete="email"
          v-model="email"
          @blur="$v.email.$touch()"
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
        />
        <div class="row mb10">
          <base-input
            class="col-xs-6"
            type="text"
            name="first-name"
            autocomplete="given-name"
            v-model="firstName"
            @blur="$v.firstName.$touch()"
            :placeholder="$t('First name *')"
            :validations="[
              {
                condition: !$v.firstName.required && $v.firstName.$error,
                text: $t('Field is required.')
              },
              {
                condition: !$v.firstName.minLength,
                text: $t('Name must have at least 2 letters.')
              },
              {
                condition: !$v.firstName.alpha && $v.firstName.$error,
                text: $t('Accepts only alphabet characters.')
              }
            ]"
          />
          <base-input
            class="col-xs-6"
            type="text"
            name="last-name"
            autocomplete="last-name"
            v-model="lastName"
            @blur="$v.lastName.$touch()"
            :placeholder="$t('Last name *')"
            :validations="[
              {
                condition: !$v.lastName.required && $v.lastName.$error,
                text: $t('Field is required.')
              },
              {
                condition: !$v.lastName.alpha && $v.lastName.$error,
                text: $t('Accepts only alphabet characters.')
              }
            ]"
          />
        </div>
        <base-input
          class="mb10"
          type="password"
          name="password"
          ref="password"
          autocomplete="new-password"
          v-model="password"
          @blur="$v.password.$touch()"
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
        />
        <base-input
          class="mb10"
          type="password"
          name="password-confirm"
          autocomplete="new-password"
          v-model="rPassword"
          @blur="$v.rPassword.$touch()"
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
        />
        <base-checkbox
          class="mb10"
          id="terms"
          v-model="conditions"
          @blur="$v.conditions.$reset()"
          @change="$v.conditions.$touch()"
          :validations="[{
            condition: !$v.conditions.sameAs && $v.conditions.$error,
            text: $t('You must accept the terms and conditions.')
          }]"
        >
          {{ $t('I accept terms and conditions') }} *
        </base-checkbox>
        <button-full :disabled="$v.$invalid" class="mb20" type="submit">
          {{ $t('Register an account') }}
        </button-full>
        <div class="center-xs">
          <span>
            {{ $t('or') }}
            <a href="#" @click.prevent="switchElem">
              {{ $t('login to your account') }}
            </a>
          </span>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Register from '@vue-storefront/core/compatibility/components/blocks/Auth/Register'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox.vue'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput.vue'
import { required, email, minLength, sameAs, alpha } from 'vuelidate/lib/validators'

export default {
  validations: {
    email: {
      required,
      email
    },
    firstName: {
      minLength: minLength(2),
      required,
      alpha
    },
    lastName: {
      required,
      alpha
    },
    password: {
      minLength: minLength(8),
      required
    },
    rPassword: {
      required,
      sameAsPassword: sameAs('password')
    },
    conditions: {
      sameAs: sameAs(() => true)
    }
  },
  mixins: [Register],
  components: {
    ButtonFull,
    BaseCheckbox,
    BaseInput
  },
  methods: {
    register () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: this.$t('Please fix the validation errors'),
          action1: { label: this.$t('OK') }
        })
        return
      }
      this.callRegister()
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

<style lang="scss" scoped>
  .modal-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .modal-close{
    cursor: pointer;
  }
  .modal-content {
    @media (max-width: 400px) {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
</style>
