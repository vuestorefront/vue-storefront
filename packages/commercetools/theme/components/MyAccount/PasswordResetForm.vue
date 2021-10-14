<template>
  <ValidationObserver v-slot="{ handleSubmit, reset }">
    <form class="form" @submit.prevent="handleSubmit(submitForm(reset))">
      <ValidationProvider rules="required" v-slot="{ errors }" class="form__element">
        <SfInput
          v-e2e="'myaccount-current-password'"
          v-model="form.currentPassword"
          type="password"
          name="currentPassword"
          label="Current Password"
          required
          :valid="!errors[0]"
          :errorMessage="errors[0]"
        />
      </ValidationProvider>
      <div class="form__horizontal">
        <ValidationProvider rules="required|password" v-slot="{ errors }" vid="password" class="form__element">
          <SfInput
            v-e2e="'myaccount-new-password'"
            v-model="form.newPassword"
            type="password"
            name="newPassword"
            label="New Password"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider rules="required|confirmed:password" v-slot="{ errors }" class="form__element">
          <SfInput
            v-e2e="'myaccount-repeat-password'"
            v-model="form.repeatPassword"
            type="password"
            name="repeatPassword"
            label="Repeat Password"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
      </div>
      <SfButton
        v-e2e="'myaccount-update-password-btn'"
        class="form__button"
      >
        {{ $t('Update password') }}
      </SfButton>
    </form>
  </ValidationObserver>
</template>

<script>
import { ref } from '@nuxtjs/composition-api';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { SfInput, SfButton } from '@storefront-ui/vue';

export default {
  name: 'PasswordResetForm',

  components: {
    SfInput,
    SfButton,
    ValidationProvider,
    ValidationObserver
  },

  setup(_, { emit }) {
    const resetForm = () => ({
      currentPassword: '',
      newPassword: '',
      repeatPassword: ''
    });

    const form = ref(resetForm());

    const submitForm = (resetValidationFn) => {
      return () => {
        const onComplete = () => {
          form.value = resetForm();
          resetValidationFn();
        };

        const onError = () => {
          // TODO: Handle error
        };

        emit('submit', { form, onComplete, onError });
      };
    };

    return {
      form,
      submitForm
    };
  }
};
</script>

<style lang='scss' scoped>
.form {
  &__element {
    display: block;
    margin: 0 0 var(--spacer-lg) 0;
  }
  &__button {
    display: block;
    width: 100%;
    @include for-desktop {
      width: 17.5rem;
    }
  }
  &__horizontal {
    @include for-desktop {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .form__element {
      @include for-desktop {
        flex: 1;
        margin-right: var(--spacer-lg);
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
