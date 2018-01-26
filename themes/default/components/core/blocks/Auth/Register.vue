<template>
  <div>
    <div class="py35 px65 bg-lightgray">
      <h1 class="my0">Register</h1>
    </div>
    <div class="py35 px65 bg-white c-gray">
      <form @submit.prevent="register" novalidate>
        <div class="mb35">
          <input type="email" name="email" ref="email" v-model="email" placeholder="E-mail address *">
          <span class="validation-error" v-if="!$v.email.required">Field is required.</span>
          <span class="validation-error" v-if="!$v.email.email">Please provide valid e-mail address.</span>
        </div>
        <div class="row mb35">
          <div class="col-xs-6">
            <input type="text" name="fist-name" v-model="firstName" placeholder="First name *">
            <span class="validation-error" v-if="!$v.firstName.required">Field is required.</span>
          </div>
          <div class="col-xs-6">
            <input type="text" name="last-name" v-model="lastName" placeholder="Last name *">
            <span class="validation-error" v-if="!$v.lastName.required">Field is required.</span>
          </div>
        </div>
        <div class="mb35 pass-container">
          <input class="pr30" name="password" v-model="password" :type="passType.pass" placeholder="Password *">
          <i class="icon material-icons c-alto" @click="togglePassType('pass')">{{ iconName.pass }}</i>
            <span class="validation-error" v-if="!$v.password.required">Field is required.</span>
        </div>
        <div class="mb35 pass-container">
          <input class="pr30" name="password-confirm" v-model="rPassword" :type="passType.repeatPass" placeholder="Repeat password *">
          <i class="icon material-icons c-alto" @click="togglePassType('repeatPass')">{{ iconName.repeatPass }}</i>
          <span class="validation-error" v-if="!$v.rPassword.sameAsPassword">Passwords must be identical.</span>
        </div>
        <div class="mb35">
          <input type="checkbox" name="remember" v-model="conditions" id="remember">
          <label class="ml10" for="remember">I accept terms and conditions *</label>
          <span class="validation-error" v-if="!$v.conditions.required">You must accept the terms and conditions.</span>
        </div>
        <div class="mb20">
          <button-full class="btn-full" text="Register an account" @click.native="register"></button-full>
        </div>
        <input type="submit">
        <div class="center-xs">
          <span>or <a href="#" @click.prevent="switchElem">login to your account</a></span>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import { required, email, sameAs } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      passType: {
        pass: 'password',
        repeatPass: 'password'
      },
      iconName: {
        pass: 'visibility',
        repeatPass: 'visibility'
      },
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      rPassword: '',
      conditions: ''
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
    password: {
      required
    },
    rPassword: {
      required,
      sameAsPassword: sameAs('password')
    },
    conditions: {
      required
    }
  },
  methods: {
    switchElem () {
      this.$store.commit('ui/setAuthElem', 'login')
    },
    togglePassType (name) {
      if (this.passType[name] === 'password') {
        this.passType[name] = 'text'
        this.iconName[name] = 'visibility_off'
      } else {
        this.passType[name] = 'password'
        this.iconName[name] = 'visibility'
      }
    },
    register () {
      if (this.$v.$invalid) {
        this.$bus.$emit('notification', {
          type: 'error',
          message: 'Please fix the validation errors',
          action1: { label: 'OK', action: 'close' }
        })
        return
      }

      this.$bus.$emit('notification-progress-start', 'Registering the account ... ')
      this.$store.dispatch('user/register', { email: this.email, password: this.password, firstname: this.firstName, lastname: this.lastName }).then((result) => {
        console.log(result)
        this.$bus.$emit('notification-progress-stop')
        if (result.code !== 200) {
          this.$bus.$emit('notification', {
            type: 'error',
            message: result.result,
            action1: { label: 'OK', action: 'close' }
          })
        } else {
          this.$bus.$emit('notification', {
            type: 'success',
            message: 'You are logged in!',
            action1: { label: 'OK', action: 'close' }
          })
          this.$store.commit('ui/setSignUp', false)
        }
      }).catch(err => {
        this.$bus.$emit('notification-progress-stop')
        console.error(err)
      })
    }
  },
  mounted () {
    this.$refs.email.focus()
  },
  components: {
    ButtonFull
  }
}
</script>
<style lang="scss" scoped>
  @import '../../../../css/text.scss';

  input[type=password], input[type=email], input[type=text] {
    @extend body;
    box-sizing: border-box;
    font-size: 18px;
    padding-top: 10px;
    padding-bottom: 10px;
    border: none;
    border-bottom: 1px solid #BDBDBD;
    width: 100%;
  }

  input[type=submit] {
    visibility: hidden;
  }

  input::-webkit-input-placeholder {
    color: #BDBDBD;
  }

  input:-moz-placeholder {
    color: #BDBDBD;
  }

  input:focus {
    outline: none;
    border-color: black;
    transition: 0.3s all;
  }

  .btn-full {
    box-sizing: border-box;
    width: 100%;
    justify-content: center;
    text-align: center;
  }
.validation-error {
    display: block;
    font-size: 12px;
    color: #EB5757;
  }
  .pass-container {
    position: relative;
  }

  .icon {
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 10px;

    &:hover {
      color: #8E8E8E;
    }
  }


</style>

