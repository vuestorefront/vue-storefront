<template>
  <div id="sign-in">
    <SfModal
      :visible="isLoginModalOpen"
      @close="toggleLoginModal">
      <transition name="fade" mode="out-in">
        <div v-if="isLogin" key="log-in">
          <div class="form">
            <SfInput
              v-model="email"
              name="email"
              label="Your email"
              class="form__input"
            />
            <SfInput
              v-model="password"
              name="password"
              label="Password"
              type="password"
              class="form__input"
            />
            <SfCheckbox
              v-model="rememberMe"
              name="remember-me"
              label="Remember me"
              class="form__checkbox"
            />
            <SfButton class="sf-button--full-width form__button"
              >Login</SfButton
            >
          </div>
          <div class="action">
            <SfButton class="sf-button--text button--muted"
              >Forgotten password?</SfButton
            >
          </div>
          <div class="bottom">
            Don't have and account yet?
            <SfButton class="sf-button--text" @click="isLogin = false"
              >Register today?</SfButton
            >
          </div>
        </div>
        <div v-else key="sign-up" class="form">
          <div class="from">
            <SfInput
              v-model="email"
              name="email"
              label="Your email"
              class="form__input"
            />
            <SfInput
              v-model="firstName"
              name="first-name"
              label="First Name"
              class="form__input"
            />
            <SfInput
              v-model="lastName"
              name="last-name"
              label="Last Name"
              class="form__input"
            />
            <SfInput
              v-model="password"
              name="password"
              label="Password"
              type="password"
              class="form__input"
            />
            <SfCheckbox
              v-model="createAccount"
              name="create-account"
              label="I want to create an account"
              class="form__checkbox"
            />
            <SfButton class="sf-button--full-width form__button"
              >Create an account</SfButton
            >
          </div>
          <div class="action">
            or
            <SfButton class="sf-button--text" @click="isLogin = true"
              >login in to your account</SfButton
            >
          </div>
        </div>
      </transition>
    </SfModal>
  </div>
</template>
<script>
import { SfModal, SfInput, SfButton, SfCheckbox } from '@storefront-ui/vue'
import uiState from '~/assets/ui-state'
const { isLoginModalOpen, toggleLoginModal } = uiState

export default {
  name: 'LoginModal',
  components: { SfModal, SfInput, SfButton, SfCheckbox },
  setup() {
    return {
      isLoginModalOpen,
      toggleLoginModal
    };
  },
  data() {
    return {
      isLogin: true,
      email: '',
      password: '',
      createAccount: false,
      rememberMe: false,
      firstName: '',
      lastName: ''
    }
  },
  watch: {
    isLogin() {
      this.email = ''
      this.password = ''
      this.createAccount = false
      this.rememberMe = false
      this.firstName = ''
      this.lastName = ''
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}
#sign-in {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: auto;
  }
}
.form {
  &__input {
    margin-bottom: $spacer-extra-big;
  }
  &__checkbox {
    margin-bottom: $spacer-big;
  }
  &__button {
    margin-top: $spacer-big;
  }
}
.action {
  margin-top: $spacer-big;
  text-align: center;
}
.bottom {
  padding-top: $spacer-extra-big;
  margin-top: $spacer-extra-big;
  border-top: 1px solid $c-light;
  line-height: 1.6;
  text-align: center;
}
.sf-button--muted {
  color: $c-text-muted;
}
</style>
