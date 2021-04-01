<template>
  <div class='login-form form'>
    <ValidationObserver v-slot="{ handleSubmit }" key="log-in">
      <SfAlert
        v-if="loginError && loginError.message && !loginError.field"
        type="danger"
        :message="$t(loginError.message)"
      />
      <form class="form" @submit.prevent="handleSubmit(handleLogin)">
        <ValidationProvider rules="required|email" v-slot="{ errors }">
          <SfInput
            data-cy="login-input_email"
            v-model="form.username"
            :valid="!errors[0]"
            :errorMessage="$t(errors[0])"
            name="email"
            :label="$t('Your email')"
            class="form__element"
          />
        </ValidationProvider>
        <ValidationProvider rules="required" v-slot="{ errors }">
          <SfInput
            data-cy="login-input_password"
            v-model="form.password"
            :valid="!errors[0]"
            :errorMessage="$t(errors[0])"
            name="password"
            :label="$t('Password')"
            type="password"
            class="form__element"
          />
        </ValidationProvider>
        <SfCheckbox
          data-cy="login-checkbox-remember-me"
          v-model="rememberMe"
          name="remember-me"
          :label="$t('Remember me')"
          class="form__element checkbox"
        />
        <SfButton
          data-cy="login-btn_submit"
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
      <SfButton
        data-cy="login-btn_sign-up"
        class="sf-button--text"
        @click="switchAuthModal('register')"
      >
        {{ $t('Register today') }}
      </SfButton>
    </div>
  </div>
</template>
<script>
import { ref } from '@vue/composition-api';
import { SfInput, SfButton, SfCheckbox, SfLoader, SfAlert } from '@storefront-ui/vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import { useUser } from '@vue-storefront/commercetools';
import { useUiState, useUiNotification } from '~/composables';

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
    SfInput,
    SfButton,
    SfCheckbox,
    SfLoader,
    SfAlert,
    ValidationProvider,
    ValidationObserver
  },
  setup(_, context) {
    const { login, loading, error } = useUser();
    const { toggleAuthModal, switchAuthModal } = useUiState();
    const { send } = useUiNotification();
    const form = ref({});
    const rememberMe = ref(false);
    const { $i18n } = context.root;
    const loginError = ref(null);

    const handleError = () => {
      loginError.value = error.value.login;
      if (!loginError.value) {
        send({
          type: 'success',
          message: $i18n.t('Successfully logged in')
        });
        toggleAuthModal();
        return;
      }
      send({
        type: 'danger',
        message: $i18n.t('Something went wrong!')
      });
    };

    const handleForm = (fn) => async () => {
      await fn({ user: form.value });
      handleError();
    };

    const handleLogin = async () => handleForm(login)();

    return {
      form,
      loginError,
      loading,
      rememberMe,
      toggleAuthModal,
      handleLogin,
      switchAuthModal
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
