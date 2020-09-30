<template>
  <SfTabs :open-tab="1">
    <SfTab data-cy="my-profile-tab_personal-data" title="Personal data">
      <p class="message">
        Feel free to edit any of your details below so your account is always up
        to date
      </p>
      <ValidationObserver v-slot="{ handleSubmit, reset }">
        <form class="form" @submit.prevent="handleSubmit(updatePersonalData(reset))">
          <div class="form__horizontal">
            <ValidationProvider rules="required|min:2" v-slot="{ errors }" class="form__element">
              <SfInput
                data-cy="my-profile-input_firstName"
                v-model="personalDataForm.firstName"
                name="firstName"
                label="First Name"
                required
                :valid="!errors[0]"
                :errorMessage="errors[0]"
              />
            </ValidationProvider>
            <ValidationProvider rules="required|min:2" v-slot="{ errors }" class="form__element">
              <SfInput
                data-cy="my-profile-input_lastName"
                v-model="personalDataForm.lastName"
                name="lastName"
                label="Last Name"
                required
                :valid="!errors[0]"
                :errorMessage="errors[0]"
              />
            </ValidationProvider>
          </div>
          <ValidationProvider rules="required|email" v-slot="{ errors }" class="form__element">
            <SfInput
              data-cy="my-profile-input_email"
              v-model="personalDataForm.email"
              type="email"
              name="email"
              label="Your e-mail"
              required
              :valid="!errors[0]"
              :errorMessage="errors[0]"
            />
          </ValidationProvider>
          <SfButton data-cy="my-profile-btn_update" class="form__button">Update personal data</SfButton>
        </form>
      </ValidationObserver>
      <p class="notice">
        At Brand name, we attach great importance to privacy issues and are
        committed to protecting the personal data of our users. Learn more about
        how we care and use your personal data in the
        <a href="">Privacy Policy.</a>
      </p>
    </SfTab>
    <SfTab data-cy="my-profile-tab_password-change" title="Password change">
      <p class="message">
        If you want to change the password to access your account, enter the
        following information:<br />Your current email address is
        <span class="message__label">example@email.com</span>
      </p>
      <ValidationObserver v-slot="{ handleSubmit, reset }">
        <form class="form" @submit.prevent="handleSubmit(updatePassword(reset))">
          <ValidationProvider rules="required" v-slot="{ errors }" class="form__element">
            <SfInput
              data-cy="my-profile-input_currentPassword"
              v-model="passwordResetForm.currentPassword"
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
                data-cy="my-profile-input_newPassword"
                v-model="passwordResetForm.newPassword"
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
                data-cy="my-profile-input_repeatPassword"
                v-model="passwordResetForm.repeatPassword"
                type="password"
                name="repeatPassword"
                label="Repeat Password"
                required
                :valid="!errors[0]"
                :errorMessage="errors[0]"
              />
            </ValidationProvider>
          </div>
          <SfButton data-cy="my-profile-btn_update-password" class="form__button">Update password</SfButton>
        </form>
      </ValidationObserver>
    </SfTab>
  </SfTabs>
</template>
<script>
import { ref } from '@vue/composition-api';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { email, required, min, confirmed } from 'vee-validate/dist/rules';
import { SfTabs, SfInput, SfButton } from '@storefront-ui/vue';
import { useUser, userGetters } from '<%= options.generate.replace.composables %>';

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
    ValidationProvider,
    ValidationObserver
  },

  setup() {
    const { user, updateUser, changePassword } = useUser();
    const cleanPersonalForm = () => ({
      firstName: userGetters.getFirstName(user.value),
      lastName: userGetters.getLastName(user.value),
      email: userGetters.getEmailAddress(user.value)
    });
    const cleanPasswordForm = () => ({
      currentPassword: '',
      newPassword: '',
      repeatPassword: ''
    });
    const personalDataForm = ref(cleanPersonalForm());
    const passwordResetForm = ref(cleanPasswordForm());

    const updatePersonalData = (resetValidationFn) => {
      return async () => {
        try {
          await updateUser(personalDataForm.value);
          personalDataForm.value = cleanPersonalForm();
          resetValidationFn();
        } catch (error) {
          // TODO: Handle error
        }
      };
    };

    const updatePassword = (resetValidationFn) => {
      return async () => {
        try {
          await changePassword(passwordResetForm.value.currentPassword, passwordResetForm.value.newPassword);
          passwordResetForm.value = cleanPasswordForm();
          resetValidationFn();
        } catch (error) {
          // TODO: Handle error
        }
      };
    };

    return {
      personalDataForm,
      passwordResetForm,
      updatePersonalData,
      updatePassword
    };
  }
};
</script>
<style lang='scss' scoped>
@import "~@storefront-ui/vue/styles";

.form {
  &__element {
    display: block;
    margin: 0 0 var(--spacer-2xl) 0;
  }

  &__button {
    display: block;
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
        margin-right: var(--spacer-2xl);
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
.message,
.notice {
  font-family: var(--font-family-primary);
  line-height: 1.6;
}
.message {
  margin: 0 0 var(--spacer-2xl) 0;
  font-size: var(--font-base-mobile);
  @include for-desktop {
    font-size: var(--font-base-desktop);
  }
  &__label {
    font-weight: 400;
  }
}
.notice {
  margin: var(--spacer-xl) 0 0 0;
  font-size: var(--font-xs-mobile);
  @include for-desktop {
    max-width: 70%;
    margin: var(--spacer) 0 0 0;
    font-size: var(--font-xs-desktop);
  }
}
</style>
