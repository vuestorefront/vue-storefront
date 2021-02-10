<template>
  <div class='login-form'>
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
      <SfButton data-cy="login-btn_sign-up" class="sf-button--text" @click="switchAuthModal('register')">
        {{ $t('Register today') }}
      </SfButton>
    </div>
  </div>
</template>

<script>
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate';
import { SfAlert, SfButton, SfCheckbox, SfInput, SfLoader } from '@storefront-ui/vue';
import { email, required } from 'vee-validate/dist/rules';
import { ref } from '@vue/composition-api';
import { useUser } from '<%= options.generate.replace.composables %>';
import { useUiState, useUiNotification } from '~/composables';
import { authErrors } from '~/helpers/errors';

extend('email', {
  ...email,
  message: 'Invalid email'
});

extend('required', {
  ...required,
  message: 'This field is required'
});

export default {
  name: 'LoginForm',
  components: {
    ValidationProvider,
    ValidationObserver,
    SfAlert,
    SfButton,
    SfCheckbox,
    SfInput,
    SfLoader
  },
  setup(_, context) {
    const { login, loading, error } = useUser();
    const { isAuthModalOpen, toggleAuthModal, switchAuthModal } = useUiState();
    const { send } = useUiNotification();
    const serverError = ref({});
    const rememberMe = ref(false);
    const form = ref({});
    const { $i18n } = context.root;

    const handleError = ({ email }) => {
      const currErr = error.value.login;
      if (!currErr) return;

      const knownErrors = authErrors(context, email);
      serverError.value = knownErrors.find(authError => authError.originalMessage === currErr.message);
      send({
        type: 'danger',
        message: $i18n.t('Something went wrong!')
      });
    };

    const handleForm = (fn) => async () => {
      await fn({ user: form.value });
      handleError(form.value);

      if (!error.value.login) {
        send({
          type: 'success',
          message: $i18n.t('Successfully logged in')
        });
        toggleAuthModal();
      }
    };

    const handleLogin = async () => handleForm(login)();

    return {
      serverError,
      rememberMe,
      loading,
      error,
      form,
      handleLogin,
      switchAuthModal,
      isAuthModalOpen,
      toggleAuthModal
    };
  }
};
</script>

<style lang="scss" scoped>
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
