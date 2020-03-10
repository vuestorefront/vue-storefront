<template>
  <div class="reset-password t-container t-p-4">
    <div class="t-p-4 lg:t-p-8 t-bg-white">
      <h2 class="t-mb-2 t-text-xl t-text-base-tone">
        {{ $t('Reset password') }}
      </h2>
      <form class="reset-password t-flex t-flex-wrap t--mx-4" @submit.prevent="resetPassword">
        <div class="t-w-full lg:t-w-1/3 t-px-4 t-mb-4">
          <base-input
            type="password"
            name="password"
            v-model="password"
            @blur="$v.password.$touch()"
            :label="$t('Password') + ' *'"
            :placeholder="$t('Password')"
            :validations="[
              {
                condition: !$v.password.required && $v.password.$error,
                text: $t('Field is required.')
              },
              {
                condition: !$v.rPassword.minLength && $v.rPassword.$error,
                text: $t('Password must have at least 8 letters.')
              }
            ]"
          />
        </div>
        <div class="t-w-full lg:t-w-1/3 t-px-4 t-mb-4">
          <base-input
            type="password"
            name="password-confirm"
            v-model="rPassword"
            @blur="$v.rPassword.$touch()"
            :label="$t('Repeat password') + ' *'"
            :placeholder="$t('Repeat password')"
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
        </div>
        <div class="t-w-full t-px-4">
          <button-component :submit="true">
            {{ $t('Reset password') }}
          </button-component>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { currentStoreView, localizedRoute } from '@vue-storefront/core/lib/multistore'
import i18n from '@vue-storefront/i18n'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput.vue'
import ButtonComponent from 'theme/components/core/blocks/Button'
import { required, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'ResetPassword',
  data () {
    return {
      email: this.$route.query.email,
      password: '',
      rPassword: ''
    }
  },
  components: {
    ButtonComponent,
    BaseInput
  },
  validations: {
    password: {
      required,
      minLength: minLength(8)
    },
    rPassword: {
      required,
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    async resetPassword () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }

      try {
        this.$bus.$emit('notification-progress-start', i18n.t('Please wait'))

        let response = await this.$store.dispatch('user/createPassword', {
          email: this.email,
          newPassword: this.password,
          resetToken: this.$route.query.token
        })

        if (response.code === 200) {
          if (this.$store.state.config.users.loginAfterCreatePassword) {
            let loginResult = await this.$store.dispatch('user/login', {
              username: this.email,
              password: this.password
            })

            this.$bus.$emit('notification-progress-stop')

            if (loginResult.code !== 200) {
              this.$store.dispatch('notification/spawnNotification', {
                action1: { label: i18n.t('OK') },
                message: i18n.t('Something went wrong, sorry'),
                type: 'error'
              })
            } else {
              this.$store.dispatch('notification/spawnNotification', {
                action1: { label: i18n.t('OK') },
                message: i18n.t('Sucessfully changed password'),
                type: 'success'
              })

              this.$router.push(this.localizedRoute('/'));
            }
          }
        } else {
          this.$bus.$emit('notification-progress-stop')

          const responseMessage = response.result && response.result.errorMessage && response.result.errorMessage.includes('No such entity with email')
            ? i18n.t('Provided email does not exist')
            : response.result.errorMessage

          this.$store.dispatch('notification/spawnNotification', {
            action1: { label: i18n.t('OK') },
            message: responseMessage,
            type: 'error'
          })
        }
      } catch (err) {
        this.$bus.$emit('notification-progress-stop')

        await this.$store.dispatch('notification/spawnNotification', {
          action1: { label: i18n.t('OK') },
          message: i18n.t('Something went wrong, sorry'),
          type: 'error'
        })
      }
    }
  },
  async asyncData ({ context, route }) {
    if (context && (!route.query.token || !route.query.email)) {
      context.server.response.redirect(localizedRoute('/'))
    }
  }
}
</script>
