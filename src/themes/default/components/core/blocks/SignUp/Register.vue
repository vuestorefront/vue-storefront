<template>
  <div>
    <div class="py35 px55 bg-lightgray">
      <h1 class="my0">Register</h1>
    </div>
    <div class="py35 px55 bg-white c-gray">
      <form>
        <div class="mb35">
          <input type="email" name="email" placeholder="E-mail address *">
        </div>
        <div class="row mb35">
          <div class="col-xs-6">
            <input type="text" name="fist-name" placeholder="First name *">
          </div>
          <div class="col-xs-6">
            <input type="text" name="last-name" placeholder="Last name *">
          </div>
        </div>
        <div class="mb35 pass-container">
          <input class="pr30" name="password" :type="passType.pass" placeholder="Password *">
          <i class="icon material-icons c-alto" @click="togglePassType('pass')">{{ iconName.pass }}</i>
        </div>
        <div class="mb35 pass-container">
          <input class="pr30" name="password-confirm" :type="passType.repeatPass" placeholder="Repeat password *">
          <i class="icon material-icons c-alto" @click="togglePassType('repeatPass')">{{ iconName.repeatPass }}</i>
        </div>
        <div class="mb35">
          <input type="checkbox" name="remember" id="remember">
          <label class="ml10" for="remember">I accept terms and conditions *</label>
        </div>
        <div class="mb35">
          <button-full class="btn-full" text="Register an account" @click.native="register"></button-full>
        </div>
        <div class="center-xs">
          <span>or <a href="#" @click.prevent="switchElem">login to your account</a></span>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import ButtonFull from 'theme/components/theme/ButtonFull.vue'

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
      }
    }
  },
  name: 'register',
  methods: {
    switchElem () {
      this.$emit('switched', 'login')
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
      // todo
    }
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

