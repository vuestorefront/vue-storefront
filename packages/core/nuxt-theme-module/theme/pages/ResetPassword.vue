<template>
  <SfModal
    v-e2e="'login-modal'"
    visible
    class="modal"
    :cross="false"
  >
    <template #modal-bar>
      <SfBar
        class="sf-modal__bar"
        :title="$t('Reset Password')"
      />
    </template>
      <div v-if="!isPasswordChanged">
        <ValidationObserver v-slot="{ handleSubmit }" key="log-in">
          <form class="form" @submit.prevent="handleSubmit(setNewPassword)">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <SfInput
                v-e2e="'reset-password-modal-password'"
                v-model="form.password"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                :label="$t('Password')"
                name="password"
                type="password"
                class="form__element"
              />
            </ValidationProvider>
            <ValidationProvider rules="required" v-slot="{ errors }">
              <SfInput
                v-e2e="'reset-password-modal-password-repeat'"
                v-model="form.repeatPassword"
                :valid="!errors[0]"
                :errorMessage="errors[0]"
                :label="$t('Repeat Password')"
                name="repeat-password"
                type="password"
                class="form__element"
              />
            </ValidationProvider>
            <div v-if="passwordMatchError || forgotPasswordError.setNew">
              {{ passwordMatchError || forgotPasswordError.setNew.message }}
            </div>
            <SfButton
              v-e2e="'reset-password-modal-submit'"
              type="submit"
              class="sf-button--full-width form__button"
              :disabled="forgotPasswordLoading"
            >
              <SfLoader :class="{ loader: forgotPasswordLoading }" :loading="forgotPasswordLoading">
                <div>{{ $t('Save Password') }}</div>
              </SfLoader>
            </SfButton>
          </form>
        </ValidationObserver>
      </div>
      <div v-else>
        <p>{{ $t('Password Changed') }}</p>
        <SfButton class="sf-button--text" link="/">
          {{ $t('Back to home') }}
        </SfButton>
      </div>
  </SfModal>
</template>
<script>

import { SfModal, SfButton, SfLoader, SfBar, SfInput } from '@storefront-ui/vue';
import { ref, computed, useRoute } from '@nuxtjs/composition-api';
import { useForgotPassword, forgotPasswordGetters } from '<%= options.generate.replace.composables %>';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'This field is required'
});

export default {
  name: 'ResetPassword',
  layout: 'blank',
  middleware({ redirect, route }) {
    if (!route.query.token) {
      return redirect('/');
    }
  },
  components: {
    SfButton,
    SfModal,
    SfLoader,
    SfBar,
    SfInput,
    ValidationProvider,
    ValidationObserver
  },
  setup() {
    const route = useRoute();
    const { result, setNew, error: forgotPasswordError, loading: forgotPasswordLoading } = useForgotPassword();
    const passwordMatchError = ref(false);
    const form = ref({});
    const isPasswordChanged = computed(() => forgotPasswordGetters.isPasswordChanged(result.value));

    const setNewPassword = async () => {
      passwordMatchError.value = false;
      if (form.value.password !== form.value.repeatPassword) {
        passwordMatchError.value = 'Passwords do not match';
        return;
      }

      await setNew({
        tokenValue: route.value.query.token,
        newPassword: form.value.password
      });
    };

    return {
      isPasswordChanged,
      form,
      setNewPassword,
      forgotPasswordLoading,
      forgotPasswordError,
      passwordMatchError
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
