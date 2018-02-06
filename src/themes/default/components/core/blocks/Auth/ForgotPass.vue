<template>
  <div>
    <div class="py35 px65 bg-lightgray">
      <h1 class="my0">Reset password</h1>
    </div>
    <div class="py35 px65 bg-white c-gray-secondary lh25">
      <template v-if="!passwordSent">
        <form @submit.prevent="sendEmail" novalidate>
          <div class="mb35">
            <p class="mb45">Enter your email to receive instructions on how to reset your password.</p>
            <input
              ref="email"
              class="brdr-none brdr-bottom brdr-c-lightgray-secondary border-box py10 h4 weight-200 roboto"
              type="email"
              name="email"
              v-model="email"
              placeholder="E-mail address *"
            >
            <p class="m0 c-red h6" v-if="!$v.email.required">Field is required.</p>
            <p class="m0 c-red h6" v-if="!$v.email.email">Please provide valid e-mail address.</p>
          </div>
          <div class="mb35">
            <button-full class="btn-full p0 center-xs" text="Reset password" @click.native="sendEmail"/>
          </div>
          <div class="center-xs">
            <span>or <a href="#" @click.prevent="switchElem">return to log in</a></span>
          </div>
        </form>
      </template>
      <template v-if="passwordSent">
        <form class="py20">
          <div class="py30 mb35">
            <p class="mb45">We've sent password reset instructions to your email. Check your inbox and follow the link.</p>
          </div>
          <div class="mb35">
            <button-full class="btn-full p0 center-xs" text="Back to login" @click.native="switchElem"/>
          </div>
        </form>
      </template>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import { required, email } from 'vuelidate/lib/validators'
import i18n from 'lib/i18n'

export default {
  data () {
    return {
      email: '',
      passwordSent: false
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    sendEmail () {
      // todo: send email with reset password instructions

      if (this.$v.$invalid) {
        this.$bus.$emit('notification', {
          type: 'error',
          message: 'Please fix the validation errors',
          action1: { label: 'OK', action: 'close' }
        })
        return
      }

      this.$bus.$emit('notification-progress-start', i18n.t('Reseting the password ... '))
      this.$store.dispatch('user/resetPassword', { email: this.email }).then((response) => {
        this.$bus.$emit('notification-progress-stop')
        if (response.code === 200) {
          this.passwordSent = true
        } else {
          this.$bus.$emit('notification', {
            type: 'error',
            message: i18n.t(response.result) || i18n.t('Error while sending reset password e-mail'),
            action1: { label: 'OK', action: 'close' }
          })
        }
      }).catch((err) => {
        console.error(err)
        this.$bus.$emit('notification-progress-stop')
      })
    },
    switchElem () {
      this.$store.commit('ui/setAuthElem', 'login')
    }
  },
  mounted () {
    this.$refs.email.focus()
  },
  mixins: [coreComponent('core/blocks/Auth/ForgotPass')],
  components: {
    ButtonFull
  }
}
</script>

<style lang="scss" scoped>
  input[type=email] {
    width: 100%;
  }

  input::-webkit-input-placeholder {
    color: #BDBDBD;
  }

  input:-moz-placeholder {
    color: #BDBDBD;
  }

  input:focus {
    outline: none;
    border-color: #000000;
    transition: 0.3s all;
  }

  .btn-full {
    display: block;
  }
</style>
