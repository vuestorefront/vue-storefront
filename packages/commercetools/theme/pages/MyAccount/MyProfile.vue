<template>
  <SfTabs :open-tab="1">
    <!-- Personal data update -->
    <SfTab title="Personal data">
      <p class="message">
        {{ $t('Feel free to edit') }}
      </p>

      <ProfileUpdateForm @submit="updatePersonalData" />

      <p class="notice">
        {{ $t('Use your personal data') }}
        <a href="">{{ $t('Privacy Policy') }}</a>
      </p>
    </SfTab>

    <!-- Password reset -->
    <SfTab title="Password change">
      <p class="message">
        {{ $t('Change password your account') }}:<br />
        {{ $t('Your current email address is') }}
        <span
          v-e2e="'myaccount-message-email'"
          class="message__label"
        >
          {{currentEmail}}
        </span>
      </p>

      <PasswordResetForm @submit="updatePassword" />
    </SfTab>
  </SfTabs>
</template>

<script>
import { extend } from 'vee-validate';
import { email, required, min, confirmed } from 'vee-validate/dist/rules';
import ProfileUpdateForm from '~/components/MyAccount/ProfileUpdateForm';
import PasswordResetForm from '~/components/MyAccount/PasswordResetForm';
import { SfTabs, SfInput, SfButton } from '@storefront-ui/vue';
import { useUser, userGetters } from '@vue-storefront/commercetools';

extend('email', {
  ...email,
  message: 'Invalid email'
});

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('min', {
  ...min,
  message: 'The field should have at least {length} characters'
});

extend('password', {
  validate: value => String(value).length >= 8 && String(value).match(/[A-Za-z]/gi) && String(value).match(/[0-9]/gi),
  message: 'Password must have at least 8 characters including one letter and a number'
});

extend('confirmed', {
  ...confirmed,
  message: 'Passwords don\'t match'
});

export default {
  name: 'PersonalDetails',

  components: {
    SfTabs,
    SfInput,
    SfButton,
    ProfileUpdateForm,
    PasswordResetForm
  },

  setup() {
    const { updateUser, changePassword, user } = useUser();

    const currentEmail = userGetters.getEmailAddress(user.value);

    const formHandler = async (fn, onComplete, onError) => {
      try {
        const data = await fn();
        await onComplete(data);
      } catch (error) {
        onError(error);
      }
    };

    const updatePersonalData = ({ form, onComplete, onError }) => formHandler(() => updateUser({ user: form.value }), onComplete, onError);
    const updatePassword = ({ form, onComplete, onError }) => formHandler(() => changePassword({ current: form.value.currentPassword, new: form.value.newPassword }), onComplete, onError);

    return {
      currentEmail,
      updatePersonalData,
      updatePassword
    };
  }
};
</script>

<style lang='scss' scoped>
.message,
.notice {
  font-family: var(--font-family--primary);
  line-height: 1.6;
}
.message {
  margin: 0 0 var(--spacer-xl) 0;
  font-size: var(--font-size--base);
  &__label {
    font-weight: 400;
  }
}
.notice {
  margin: var(--spacer-lg) 0 0 0;
  font-size: var(--font-size--sm);
}

</style>
