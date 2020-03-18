<template>
  <SfTabs :open-tab="1">
    <SfTab title="Personal data">
      <p class="message">
        Feel free to edit any of your details below so your account is always up
        to date
      </p>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form class="form" @submit.prevent="handleSubmit(updatePersonal)">
          <div class="form__horizontal">
            <ValidationProvider rules="required|min:2" v-slot="{ errors }" class="form__element">
              <SfInput
                v-model="firstName"
                name="firstName"
                label="First Name"
                required
                :valid="!errors[0]"
                :errorMessage="errors[0]"
              />
            </ValidationProvider>
            <ValidationProvider rules="required|min:2" v-slot="{ errors }" class="form__element">
              <SfInput
                v-model="lastName"
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
              v-model="email"
              type="email"
              name="email"
              label="Your e-mail"
              required
              :valid="!errors[0]"
              :errorMessage="errors[0]"
            />
          </ValidationProvider>
          <SfButton class="form__button">Update personal data</SfButton>
        </form>
      </ValidationObserver>
      <p class="notice">
        At Brand name, we attach great importance to privacy issues and are
        committed to protecting the personal data of our users. Learn more about
        how we care and use your personal data in the
        <a href="">Privacy Policy.</a>
      </p>
    </SfTab>
    <SfTab title="Password change">
      <p class="message">
        If you want to change the password to access your account, enter the
        following information:<br />Your current email address is
        <span class="message__label">example@email.com</span>
      </p>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form class="form" @submit.prevent="handleSubmit(updatePassword)">
          <ValidationProvider rules="required" v-slot="{ errors }" vid="password" class="form__element">
            <SfInput
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
          <SfAlert v-if="error" class="alert" type="danger" :message="error" />
          <SfButton class="form__button">Update password</SfButton>
        </form>
      </ValidationObserver>
    </SfTab>
  </SfTabs>
</template>
<script>
import { ref } from '@vue/composition-api';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { email, required, min, confirmed } from 'vee-validate/dist/rules';
import { SfTabs, SfInput, SfButton, SfAlert } from '@storefront-ui/vue';
import { useUser } from '<%= options.composables %>';

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
  validate: value => String(value).match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
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
    SfAlert,
    ValidationProvider,
    ValidationObserver
  },
  props: {
    account: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    const resetPassForm = () => ({ currentPassword: '', newPassword: '', repeatPassword: '' });
    const { user, changePassword, error } = useUser();
    const form = ref(resetPassForm());

    const updatePassword = async () => {
      await changePassword(form.value.currentPassword, form.value.newPassword);
      if (!error.value) {
        form.value = resetPassForm();
      }
    };

    return {
      user,
      error,
      form,
      updatePassword
    };
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: ''
    };
  },
  watch: {
    account: {
      handler(value) {
        this.firstName = value.firstName;
        this.lastName = value.lastName;
        this.email = value.email;
      },
      immediate: true
    }
  },
  methods: {
    updatePersonal() {
      const personal = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email
      };
      this.$emit('update:personal', personal);
    }
  }
};
</script>
<style lang='scss' scoped>
@import '~@storefront-ui/vue/styles';
@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}

.form {
  &__element {
    display: block;
    margin-bottom: var(--spacer-extra-big);
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
        margin-right: var(--spacer-extra-big);
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
.message,
.notice {
  font-family: var(--body-font-family-primary);
  font-weight: var(--body-font-weight-primary);
  line-height: 1.6;
}
.message {
  margin: 0 0 var(--spacer-extra-big) 0;
  font-size: var(--font-size-regular-mobile);
  @include for-desktop {
    font-size: var(--font-size-regular-desktop);
  }
  &__label {
    font-weight: 400;
  }
}
.notice {
  margin: var(--spacer-big) 0 0 0;
  font-size: var(--font-size-extra-small-mobile);
  @include for-desktop {
    max-width: 70%;
    margin: var(--spacer) 0 0 0;
    font-size: var(--font-size-extra-small-desktop);
  }
}
</style>
