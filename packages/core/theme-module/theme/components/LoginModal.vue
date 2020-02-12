<template>
  <div id="sign-in">
    <SfModal
      :visible="isLoginModalOpen"
      @close="toggleLoginModal">
      <transition name="fade" mode="out-in">
        <div v-if="isLogin" key="log-in">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form class="form" @submit.prevent="handleSubmit(handleLogin)">
              <ValidationProvider rules="required|email" v-slot="{ errors }">
                <SfInput
                  v-model="form.username"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  name="email"
                  label="Your email"
                  class="form__input"
                />
              </ValidationProvider>
              <ValidationProvider rules="required" v-slot="{ errors }">
                <SfInput
                  v-model="form.password"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  name="password"
                  label="Password"
                  type="password"
                  class="form__input"
                />
              </ValidationProvider>
              <SfCheckbox
                v-model="rememberMe"
                name="remember-me"
                label="Remember me"
                class="form__checkbox"
              />
              <SfButton
                type="submit"
                class="sf-button--full-width form__button"
                :disabled="loading"
              >
                <SfLoader :class="{ loader: loading }" :loading="loading">
                  <div>Login</div>
                </SfLoader>
              </SfButton>
              <SfAlert v-if="error" class="alert" type="danger" :message="error" />
            </form>
          </ValidationObserver>
          <div class="action">
            <SfButton class="sf-button--text button--muted">Forgotten password?</SfButton>
          </div>
          <div class="bottom">
            Don't have and account yet?
            <SfButton class="sf-button--text" @click="isLogin = false">Register today?</SfButton>
          </div>
        </div>
        <div v-else key="sign-up" class="form">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form class="from" @submit.prevent="handleSubmit(handleRegister)" autocomplete="off">
              <ValidationProvider rules="required|email" v-slot="{ errors }">
                <SfInput
                  v-model="form.email"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  name="email"
                  label="Your email"
                  class="form__input"
                />
              </ValidationProvider>
              <ValidationProvider rules="required" v-slot="{ errors }">
                <SfInput
                  v-model="form.firstName"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  name="first-name"
                  label="First Name"
                  class="form__input"
                />
              </ValidationProvider>
              <ValidationProvider rules="required" v-slot="{ errors }">
                <SfInput
                  v-model="form.lastName"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  name="last-name"
                  label="Last Name"
                  class="form__input"
                />
              </ValidationProvider>
              <ValidationProvider rules="required" v-slot="{ errors }">
                <SfInput
                  v-model="form.password"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  name="password"
                  label="Password"
                  type="password"
                  class="form__input"
                />
              </ValidationProvider>
              <SfCheckbox
                v-model="createAccount"
                name="create-account"
                label="I want to create an account"
                class="form__checkbox"
              />
              <SfButton
                type="submit"
                class="sf-button--full-width form__button"
                :disabled="loading"
              >
                <SfLoader :class="{ loader: loading }" :loading="loading">
                  <div>Create an account</div>
                </SfLoader>
              </SfButton>
            </form>
          </ValidationObserver>
          <div class="action">
            or
            <SfButton class="sf-button--text" @click="isLogin = true">login in to your account</SfButton>
          </div>
        </div>
      </transition>
    </SfModal>
  </div>
</template>
<script>
import { computed, ref, watch } from '@vue/composition-api'
import { SfModal, SfInput, SfButton, SfCheckbox, SfLoader, SfAlert } from '@storefront-ui/vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'
import { useUser } from '@vue-storefront/commercetools-composables'
import uiState from '~/assets/ui-state'

const { isLoginModalOpen, toggleLoginModal } = uiState

extend('email', {
  ...email,
  message: 'Invalid email'
})

extend('required', {
  ...required,
  message: 'This field is required'
})

export default {
  name: 'LoginModal',
  components: {
    SfModal,
    SfInput,
    SfButton,
    SfCheckbox,
    SfLoader,
    SfAlert,
    ValidationProvider,
    ValidationObserver
  },
  setup() {
    const form = ref({})
    const isLogin = ref(false)
    const createAccount = ref(false)
    const rememberMe = ref(false)
    const { register, login, loading, error } = useUser()

    watch(isLoginModalOpen, () => {
      if (isLoginModalOpen) {
        form.value = {}
      }
    })

    const handleForm = (fn) => async () => {
      await fn(form.value)

      if (!error.value) {
        toggleLoginModal()
      }
    }

    const handleRegister = async () => handleForm(register)()

    const handleLogin = async () => handleForm(login)()

    return {
      error,
      form,
      loading,
      isLogin,
      createAccount,
      rememberMe,
      isLoginModalOpen,
      toggleLoginModal,
      handleLogin,
      handleRegister
    };
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

.loader {
  padding: 11px 0;

  &::v-deep .sf-loader__overlay {
    background: transparent;
  }
}

.alert {
  margin: 15px 0;
  font-size: 13px;
}
</style>
