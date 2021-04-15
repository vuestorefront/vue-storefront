<template>
  <div class="register-form form">
    <ValidationObserver v-slot="{ handleSubmit }" key="sign-up">
      <SfAlert
        v-if="registerError && registerError.message && !registerError.field"
        type="danger"
        :message="$t(registerError.message)"
      />
      <form class="form" @submit.prevent="handleSubmit(handleRegister)" autocomplete="off">
        <ValidationProvider rules="required|email" v-slot="{ errors }">
          <SfInput
            v-e2e="'login-modal-email'"
            v-model="form.email"
            :valid="errorFieldName === 'email' ? false : !errors[0]"
            :errorMessage="errorFieldName === 'email' ? $t(registerError.message) : $t(errors[0])"
            name="email"
            :label="$t('Your email')"
            class="form__element"
          />
        </ValidationProvider>
        <ValidationProvider rules="required" v-slot="{ errors }">
          <SfInput
            v-e2e="'login-modal-firstName'"
            v-model="form.firstName"
            :valid="!errors[0]"
            :errorMessage="$t(errors[0])"
            name="first-name"
            :label="$t('First Name')"
            class="form__element"
          />
        </ValidationProvider>
        <ValidationProvider rules="required" v-slot="{ errors }">
          <SfInput
            v-e2e="'login-modal-lastName'"
            v-model="form.lastName"
            :valid="!errors[0]"
            :errorMessage="$t(errors[0])"
            name="last-name"
            :label="$t('Last Name')"
            class="form__element"
          />
        </ValidationProvider>
        <ValidationProvider rules="required" v-slot="{ errors }">
          <SfInput
            v-e2e="'login-modal-password'"
            v-model="form.password"
            :valid="!errors[0]"
            :errorMessage="$t(errors[0])"
            name="password"
            :label="$t('Password')"
            type="password"
            class="form__element"
          />
        </ValidationProvider>
        <ValidationProvider :rules="{ required: { allowFalse: false } }" v-slot="{ errors }">
          <SfCheckbox
            v-e2e="'login-modal-create-account'"
            v-model="createAccount"
            :valid="!errors[0]"
            :errorMessage="$t(errors[0])"
            name="create-account"
            :label="$t('I want to create an account')"
            class="form__element"
          />
        </ValidationProvider>
        <SfButton
          v-e2e="'login-modal-submit'"
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
      <SfButton v-e2e="'login-modal-login-to-your-account'" class="sf-button--text" @click="switchAuthModal('login')">
        {{ $t('login in to your account') }}
      </SfButton>
    </div>
  </div>
</template>

<script>
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate';
import { SfButton, SfCheckbox, SfInput, SfLoader, SfAlert } from '@storefront-ui/vue';
import { email, required } from 'vee-validate/dist/rules';
import { computed, ref } from '@vue/composition-api';
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
  name: 'RegisterForm',
  components: {
    ValidationProvider,
    ValidationObserver,
    SfButton,
    SfCheckbox,
    SfInput,
    SfLoader,
    SfAlert
  },
  setup(_, context) {
    const { register, loading, error } = useUser();
    const { toggleAuthModal, switchAuthModal } = useUiState();
    const { send } = useUiNotification();
    const form = ref({});
    const createAccount = ref(false);
    const { $i18n } = context.root;
    const registerError = ref(null);

    const errorFieldName = computed(() => registerError.value && registerError.value.field);
    const hasDuplicatedEmail = computed(() => registerError.value && registerError.value.code === 'DuplicateField' && registerError.value.message.search(form.value.email) !== -1);

    const handleError = () => {
      registerError.value = error.value.register;
      if (!registerError.value) {
        send({
          type: 'success',
          message: $i18n.t('Successfully created a new account')
        });
        toggleAuthModal();
        return;
      }

      if (hasDuplicatedEmail) registerError.value.message = $i18n.t('There is already an existing customer with this email {EMAIL}', { EMAIL: form.value.email });

      send({
        type: 'danger',
        message: $i18n.t('Something went wrong!')
      });
    };

    const handleForm = (fn) => async () => {
      await fn({ user: form.value });
      handleError();
    };

    const handleRegister = async () => handleForm(register)();

    return {
      loading,
      registerError,
      errorFieldName,
      form,
      createAccount,
      switchAuthModal,
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
