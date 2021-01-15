<template>
  <SfModal
    :visible="isLoginModalOpen"
    class="modal"
    @close="toggleLoginModal"
  >
    <template #modal-bar>
      <SfBar
        class="sf-modal__bar smartphone-only"
        :close="true"
        :title="isLogin ? 'Log in' : 'Sign in'"
        @click:close="toggleLoginModal"
      />
    </template>
    <transition name="sf-fade" mode="out-in">
      <div v-if="isLogin">
        <ValidationObserver v-slot="{ handleSubmit }" key="log-in">
          <SfAlert
            v-if="serverError && serverError.fieldName === null"
            type="danger"
            :message="serverError && serverError.displayMessage" />
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
              class="form__element checkbox"
            />
            <SfButton data-cy="login-btn_submit"
              type="submit"
              class="sf-button--full-width form__button"
              :disabled="loading"
            >
              <SfLoader :class="{ loader: loading }" :loading="loading">
                <div>{{ $t('Login') }}</div>
              </SfLoader>
            </SfButton>
          </form>
        </ValidationObserver>
        <div class="action">
          <SfButton data-cy="login-btn_forgot-password" class="sf-button--text">
            {{ $t('Forgotten password?') }}
          </SfButton>
        </div>
        <div class="bottom">
          <p class="bottom__paragraph">{{ $t('No account') }}</p>
          <SfButton data-cy="login-btn_sign-up" class="sf-button--text" @click="isLogin = false">
            {{ $t('Register today') }}
          </SfButton>
        </div>
      </div>
      <div v-else class="form">
        <ValidationObserver v-slot="{ handleSubmit }" key="sign-up">
          <SfAlert
            v-if="serverError && serverError.fieldName === null"
            type="danger"
            :message="serverError && serverError.displayMessage" />
          <form class="form" @submit.prevent="handleSubmit(handleRegister)" autocomplete="off">
            <ValidationProvider rules="required|email" v-slot="{ errors }">
              <SfInput
                data-cy="login-input_email"
                v-model="form.email"
                :valid="serverError && serverError.fieldName === 'email' ? false : !errors[0]"
                :errorMessage="serverError && serverError.fieldName === 'email' ? serverError.displayMessage : errors[0]"
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
            <ValidationProvider :rules="{ required: { allowFalse: false } }" v-slot="{ errors }">
              <SfCheckbox
                v-model="createAccount"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                name="create-account"
                label="I want to create an account"
                class="form__element"
              />
            </ValidationProvider>
            <SfButton
              data-cy="login-btn_submit"
              type="submit"
              class="sf-button--full-width form__button"
              :disabled="loading"
            >
              <SfLoader :class="{ loader: loading }" :loading="loading">
                <div>{{ $t('Create an account') }}</div>
              </SfLoader>
            </SfButton>
          </form>
        </ValidationObserver>
        <div class="action">
          {{ $t('or') }}
          <SfButton data-cy="login-btn_login-into-account" class="sf-button--text" @click="isLogin = true">
            {{ $t('login in to your account') }}
          </SfButton>
        </div>
      </div>
    </transition>
  </SfModal>
</template>
<script>
import { ref, watch } from '@vue/composition-api';
import { SfAlert, SfBar, SfButton, SfCheckbox, SfInput, SfLoader, SfModal } from '@storefront-ui/vue';
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate';
import { email, required } from 'vee-validate/dist/rules';
import { useUser } from '<%= options.generate.replace.composables %>';
import { useUiState } from '~/composables';
import { knownErrors } from '~/helpers/errors';

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
    ValidationObserver,
    SfBar
  },
  setup(_, context) {
    const { isLoginModalOpen, toggleLoginModal } = useUiState();
    const form = ref({});
    const serverError = ref({});
    const isLogin = ref(false);
    const createAccount = ref(false);
    const rememberMe = ref(false);
    const { register, login, loading, error } = useUser();

    watch([isLoginModalOpen, isLogin], (newValue, prevValues) => {
      if (isLoginModalOpen) {
        form.value = {};
        serverError.value = {};
      }
      if (newValue[1] !== prevValues[1]) serverError.value = {};
    });

    const handleError = ({ email }) => {
      const authErrors = knownErrors(context, email);
      const activeModal = isLogin.value ? 'login' : 'register';
      const currErr = error.value[activeModal];
      if (!currErr) return;

      serverError.value = authErrors.find(authError => authError.originalMessage === currErr.message);
    };

    const handleForm = (fn) => async () => {
      await fn({ user: form.value });
      handleError(form.value);
      if (isLogin.value && !error.value.login) toggleLoginModal();
      if (!isLogin.value && !error.value.register) toggleLoginModal();
    };

    const handleRegister = async () => handleForm(register)();

    const handleLogin = async () => handleForm(login)();

    return {
      form,
      loading,
      isLogin,
      createAccount,
      rememberMe,
      error,
      serverError,
      isLoginModalOpen,
      toggleLoginModal,
      handleLogin,
      handleRegister
    };
  }
};
</script>

<style lang="scss" scoped>

.modal {
  --modal-index: 3;
  --overlay-z-index: 3;
}
.form {
  margin-top: var(--spacer-sm);
  &__element {
    margin: 0 0 var(--spacer-xl) 0;
  }
}
.action {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
  font: var(--font-weight--light) var(--font-size--base) / 1.6 var(--font-family--secondary);
  & > * {
    margin: 0 0 0 var(--spacer-xs);
  }
}
.action {
  margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
}
.checkbox {
  margin-bottom: var(--spacer-2xl);
}
.bottom {
  text-align: center;
  margin-bottom: var(--spacer-lg);
  font-size: var(--h3-font-size);
  font-weight: var(--font-weight--semibold);
  font-family: var(--font-family--secondary);
  &__paragraph {
    color: var(--c-primary);
    margin: 0 0 var(--spacer-base) 0;
    @include for-desktop {
      margin: 0;
    }
  }
}
</style>
