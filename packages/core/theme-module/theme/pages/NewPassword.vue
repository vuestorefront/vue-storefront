<template>
  <div id="new-password">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form class="form" @submit.prevent="handleSubmit(handleResetPassword)">
        <ValidationProvider rules="required" v-slot="{ errors }">
          <SfInput
            data-cy="login-input_password"
            v-model="password"
            :valid="!errors[0]"
            :errorMessage="errors[0]"
            name="password"
            label="Choose a new password"
            type="password"
            class="form__element"
          />
        </ValidationProvider>
        <SfButton
          data-cy="login-btn_submit"
          type="submit"
          class="sf-button--full-width form__button"
        >
          <div>Reset password</div>
        </SfButton>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import { ref } from '@vue/composition-api';
import { SfInput, SfButton } from "@storefront-ui/vue";
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import { computed } from "@vue/composition-api";
import { useUser } from "<%= options.composables %>";
import uiState from '~/assets/ui-state';

const { toggleLoginModal } = uiState;

extend('required', {
  ...required,
  message: 'This field is required'
});

export default {
  name: "NewPassword",
   components: {
    SfInput,
    SfButton,
    ValidationProvider,
    ValidationObserver
  },
  setup(props, context) {
    const { $router, $route } = context.root;
    const { createPassword } = useUser();
    const { username, token } = $route.params;
    const password = ref(null);

    const handleResetPassword = async () => {
      await createPassword(username, token, password.value);
      $router.push('/');
      toggleLoginModal();
      return;
    }

    return { handleResetPassword, password };
  }
};
</script>
<style lang='scss' scoped>
@import "~@storefront-ui/vue/styles";

#new-password {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 600px;
    margin: 0 auto;
  }
}
</style>
