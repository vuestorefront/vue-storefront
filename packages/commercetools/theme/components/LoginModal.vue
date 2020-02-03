<template>
  <div id="sign-in">
    <SfModal
      :visible="isLoginModalOpen"
      @close="toggleLoginModal">
      <transition name="fade" mode="out-in">
        <div v-if="isLogin" key="log-in">
          <div class="form">
            <SfInput
              v-model="form.email"
              name="email"
              label="Your email"
              class="form__input"
            />
            <SfInput
              v-model="form.password"
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
            <SfButton class="sf-button--full-width form__button">Login</SfButton>
          </div>
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
            <form class="from" @submit.prevent="handleSubmit(handleRegister)">
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
import { computed, ref } from '@vue/composition-api'
import { SfModal, SfInput, SfButton, SfCheckbox, SfLoader } from '@storefront-ui/vue'
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
    ValidationProvider,
    ValidationObserver
  },
  setup() {
    const form = ref({})
    const isLogin = ref(false)
    const createAccount = ref(false)
    const rememberMe = ref(false)
    const { register, loading } = useUser()

    const handleRegister = async (formData) => {
      await register(form.value)
      toggleLoginModal()
    }

    const handleLogin = () => {}

    return {
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
</style>
