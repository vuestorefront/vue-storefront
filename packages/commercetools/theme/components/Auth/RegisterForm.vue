<template>
  <div class="register-form form">
    <ValidationObserver v-slot="{ handleSubmit }" key="sign-up">
      <SfAlert
        v-if="serverError && serverError.fieldName === null"
        type="danger"
        :message="serverError && $t(serverError.displayMessage)" />
      <form class="form" @submit.prevent="handleSubmit(handleRegister)" autocomplete="off">
        <ValidationProvider rules="required|email" v-slot="{ errors }">
          <SfInput
            data-cy="login-input_email"
            v-model="form.email"
            :valid="serverError && serverError.fieldName === 'email' ? false : !errors[0]"
            :errorMessage="serverError && serverError.fieldName === 'email' ? $t(serverError.displayMessage) : errors[0]"
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
      <SfButton data-cy="login-btn_login-into-account" class="sf-button--text" @click="switchAuthModal('login')">
        {{ $t('login in to your account') }}
      </SfButton>
    </div>
  </div>
</template>

<script>
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate';
import { SfAlert, SfButton, SfCheckbox, SfInput, SfLoader } from '@storefront-ui/vue';
import { email, required } from 'vee-validate/dist/rules';
import { ref } from '@vue/composition-api';
import { useUser } from '@vue-storefront/commercetools';
import { useUiState, useUiNotification } from '~/composables';
import { getFriendlyError } from '~/helpers/errors';

extend('email', {
  ...email,
  message: 'Invalid email'
});

extend('required', {
  ...required,
  message: 'This field is required'
});

export default {
  name: 'RegisterForm',
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
    const { register, loading, error } = useUser();
    const { toggleAuthModal, switchAuthModal } = useUiState();
    const { send } = useUiNotification();
    const serverError = ref({});
    const form = ref({});
    const createAccount = ref(false);
    const { $i18n } = context.root;

    const handleError = ({ email }) => {
      const currErr = error.value.register;
      if (!currErr) {
        send({
          type: 'success',
          message: $i18n.t('Successfully created a new account')
        });
        toggleAuthModal();
        return;
      }

      serverError.value = getFriendlyError(currErr.message, email);
      send({
        type: 'danger',
        message: $i18n.t('Something went wrong!')
      });
    };

    const handleForm = (fn) => async () => {
      await fn({ user: form.value });
      handleError(form.value);
    };

    const handleRegister = async () => handleForm(register)();

    return {
      serverError,
      loading,
      error,
      form,
      createAccount,
      switchAuthModal,
      handleRegister
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
