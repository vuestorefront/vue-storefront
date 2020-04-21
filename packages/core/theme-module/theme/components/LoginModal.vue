<template>
  <div>
    <SfModal
      :visible="isLoginModalOpen"
      title="Log in"
      class="modal"
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
                  class="form__element"
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
                  class="form__element"
                />
              </ValidationProvider>
              <SfCheckbox
                v-model="rememberMe"
                name="remember-me"
                label="Remember me"
                class="form__element"
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
            </form>
          </ValidationObserver>
          <div class="action">
            <SfButton class="sf-button--text color-secondary">Forgotten password?</SfButton>
          </div>
          <div class="bottom">
            Don't have and account yet?
            <SfButton class="sf-button--text color-secondary" @click="isLogin = false">Register today?</SfButton>
          </div>
        </div>
        <div v-else key="sign-up" class="form">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form class="form" @submit.prevent="handleSubmit(handleRegister)" autocomplete="off">
              <ValidationProvider rules="required|email" v-slot="{ errors }">
                <SfInput
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
            <SfButton class="sf-button--text color-secondary" @click="isLogin = true">login in to your account</SfButton>
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
    const isLogin = ref(false);
    const createAccount = ref(false);
    const rememberMe = ref(false);
    const { register, login, loading } = useUser();

    watch(isLoginModalOpen, () => {
      if (isLoginModalOpen) {
        form.value = {};
      }
    });

    const handleForm = (fn) => async () => {
      await fn(form.value);
      toggleLoginModal();
    };

    const handleRegister = async () => handleForm(register)();

    const handleLogin = async () => handleForm(login)();

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
  font: 300 var(--font-base) / 1.6 var(--font-family-secondary);
  & > * {
    margin: 0 0 0 var(--spacer-xs);
  }
}
.action {
  margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
}
.bottom {
  padding: var(--spacer-2xl) 0 0 0;
  margin: var(--spacer-2xl) 0 0 0;
  border: 1px solid var(--c-light);
  border-width: 1px 0 0 0;
}
</style>
