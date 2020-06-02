<template>
  <div>
    <SfModal
      :visible="isLoginModalOpen"
      title="Log in"
      class="modal"
      @close="toggleLoginModal">
      <transition name="fade" mode="out-in">
        <div v-if="loginPage == 'login'" key="log-in">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form class="form" @submit.prevent="handleSubmit(handleLogin)">
              <ValidationProvider rules="required|email" v-slot="{ errors }">
                <SfInput
                  data-cy="login-input_email"
                  v-model="form.username"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  name="email"
                  label="Your email"
                  class="form__element"
                />
              </ValidationProvider>
              <ValidationProvider rules="required" v-slot="{ errors }">
                <SfInput
                  data-cy="login-input_password"
                  v-model="form.password"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  name="password"
                  label="Password"
                  type="password"
                  class="form__element"
                />
              </ValidationProvider>
              <SfCheckbox
                data-cy="login-checkbox-remember-me"
                v-model="rememberMe"
                name="remember-me"
                label="Remember me"
                class="form__element"
              />
              <SfButton data-cy="login-btn_submit"
                type="submit"
                class="sf-button--full-width form__button"
                :disabled="loading"
              >
                <SfLoader :class="{ loader: loading }" :loading="loading">
                  <div>Login</div>
                </SfLoader>
              </SfButton>
            </form>
          </ValidationObserver>
          <div class="action">
            <SfButton data-cy="login-btn_forgot-password" class="sf-button--text color-secondary" @click="loginPage = 'forgot'">Forgotten password?</SfButton>
          </div>
          <div class="bottom">
            Don't have and account yet?
            <SfButton data-cy="login-btn_sign-up" class="sf-button--text color-secondary" @click="loginPage = 'register'">Register today?</SfButton>
          </div>
        </div>
        <div v-else-if="loginPage == 'forgot'" key="forgot">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form class="form" @submit.prevent="handleSubmit(handleForgot)">
              <ValidationProvider rules="required|email" v-slot="{ errors }">
                <SfInput
                  data-cy="login-input_email"
                  v-model="form.username"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  name="email"
                  label="Your email"
                  class="form__element"
                />
              </ValidationProvider>
              <SfButton data-cy="login-btn_submit"
                type="submit"
                class="sf-button--full-width form__button"
                :disabled="loading"
              >
                <SfLoader :class="{ loader: loading }" :loading="loading">
                  <div>Reset password</div>
                </SfLoader>
              </SfButton>
            </form>
          </ValidationObserver>
          <div class="action">
            <SfButton data-cy="login-btn_login-into-account" class="sf-button--text color-secondary" @click="loginPage = 'login'">login in to your account</SfButton>
          </div>
          <div class="bottom">
            Don't have and account yet?
            <SfButton data-cy="login-btn_sign-up" class="sf-button--text color-secondary" @click="loginPage = 'register'">Register today?</SfButton>
          </div>
          <SfAlert :message="error" type="danger" v-if="error" />
        </div>
        <div v-else-if="loginPage == 'forgot-done'" key="forgot-done">
          <div>
            We've sent password reset instructions to your email. Check your inbox and follow the link.
          </div>
          <div class="action">
            <SfButton data-cy="login-btn_login-into-account" class="sf-button--text color-secondary" @click="loginPage = 'login'">login in to your account</SfButton>
          </div>
          <div class="bottom">
            Don't have and account yet?
            <SfButton data-cy="login-btn_sign-up" class="sf-button--text color-secondary" @click="loginPage = 'register'">Register today?</SfButton>
          </div>
        </div>
        <div v-else key="sign-up" class="form">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form class="form" @submit.prevent="handleSubmit(handleRegister)" autocomplete="off">
              <ValidationProvider rules="required|email" v-slot="{ errors }">
                <SfInput
                  data-cy="login-input_email"
                  v-model="form.email"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  name="email"
                  label="Your email"
                  class="form__element"
                />
              </ValidationProvider>
              <ValidationProvider rules="required" v-slot="{ errors }">
                <SfInput
                  data-cy="login-input_firstName"
                  v-model="form.firstName"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  name="first-name"
                  label="First Name"
                  class="form__element"
                />
              </ValidationProvider>
              <ValidationProvider rules="required" v-slot="{ errors }">
                <SfInput
                  data-cy="login-input_lastName"
                  v-model="form.lastName"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  name="last-name"
                  label="Last Name"
                  class="form__element"
                />
              </ValidationProvider>
              <ValidationProvider rules="required" v-slot="{ errors }">
                <SfInput
                  data-cy="login-input_password"
                  v-model="form.password"
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                  name="password"
                  label="Password"
                  type="password"
                  class="form__element"
                />
              </ValidationProvider>
              <SfCheckbox
                v-model="createAccount"
                name="create-account"
                label="I want to create an account"
                class="form__element"
              />
              <SfButton data-cy="login-btn_submit"
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
            <SfButton data-cy="login-btn_login-into-account" class="sf-button--text color-secondary" @click="loginPage = 'login'">login in to your account</SfButton>
          </div>
        </div>
      </transition>
    </SfModal>
  </div>
</template>
<script>
import { ref, watch } from '@vue/composition-api';
import { SfModal, SfInput, SfButton, SfCheckbox, SfLoader, SfAlert } from '@storefront-ui/vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import { useUser } from '<%= options.composables %>';
import uiState from '~/assets/ui-state';

const { isLoginModalOpen, toggleLoginModal } = uiState;

extend('email', {
  ...email,
  message: 'Invalid email'
});

extend('required', {
  ...required,
  message: 'This field is required'
});

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
    const form = ref({});
    const loginPage = ref('login');
    const createAccount = ref(false);
    const rememberMe = ref(false);
    const error = ref(null);
    const { register, login, forgotPassword, loading } = useUser();

    watch(isLoginModalOpen, () => {
      if (isLoginModalOpen) {
        form.value = {};
      }
    });

    const handleForm = (fn) => async () => {

      await fn(form.value);
      // forgot.
      if (loginPage.value == 'forgot') 
        loginPage.value = 'forgot-done';
      else
        toggleLoginModal();
    };

    const handleRegister = async () => handleForm(forgotPassword)();

    const handleLogin = async () => handleForm(login)();

    const handleForgot = async () => handleForm(forgotPassword)();

    return {
      form,
      loading,
      loginPage,
      createAccount,
      rememberMe,
      isLoginModalOpen,
      toggleLoginModal,
      handleLogin,
      handleRegister,
      handleForgot
    };
  }
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";

.form {
  margin-top: var(--spacer-sm);
  &__element {
    margin: 0 0 var(--spacer-xl) 0;
  }
}
.action,
.bottom {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
  font: var(--font-light) var(--font-base) / 1.6 var(--font-family-secondary);
  & > * {
    margin: 0 0 0 var(--spacer-xs);
  }
}
.action {
  margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
}
.bottom {
  padding: var(--spacer-xl) 0 0 0;
  border: 1px solid var(--c-light);
  border-width: 1px 0 0 0;
}
</style>
