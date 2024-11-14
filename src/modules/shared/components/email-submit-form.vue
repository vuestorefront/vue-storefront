<template>
  <div
    class="subscription-form"
  >
    <validation-observer
      ref="validationObserver"
      v-slot="{passes}"
      slim
    >
      <form
        @submit.prevent="() => passes(() => onSubmitForm())"
        class="_form"
      >
        <validation-provider
          v-slot="{errors}"
          rules="required|email"
          slim
          :name="fieldName"
        >
          <SfInput
            v-model="email"
            class="_input"
            :name="emailInputName"
            :label="$t('E-mail address')"
            :disabled="isSubmitting"
            :valid="!errors.length"
            :error-message="errors[0]"
          />
        </validation-provider>

        <SfButton
          class="_button"
          :disabled="isSubmitting"
        >
          {{ buttonText }}
        </SfButton>

        <california-privacy-notice-link />
      </form>
    </validation-observer>
  </div>
</template>

<script lang="ts">
import { extend, ValidationProvider, ValidationObserver } from 'vee-validate';
import { email, required } from 'vee-validate/dist/rules';
import Vue, { PropType } from 'vue';
import { SfButton, SfInput } from '@storefront-ui/vue';

import { CaliforniaPrivacyNoticeLink } from 'src/modules/true-vault';

extend('required', {
  ...required,
  message: 'Field is required'
});

extend('email', email);

export default Vue.extend({
  name: 'EmailSubmitForm',
  components: {
    CaliforniaPrivacyNoticeLink,
    SfButton,
    SfInput,
    ValidationProvider,
    ValidationObserver
  },
  props: {
    name: {
      type: String,
      required: true
    },
    buttonText: {
      type: String,
      required: true
    },
    submitAction: {
      type: Function as PropType<(email: string) => Promise<void>>,
      required: true
    },
    prefilledEmail: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      email: '',
      isSubmitting: false
    };
  },
  computed: {
    emailInputName (): string {
      return this.name + '-email-input';
    },
    fieldName (): string {
      return 'E-mail';
    }
  },
  methods: {
    async onSubmitForm (): Promise<void> {
      if (this.isSubmitting) {
        return;
      }

      this.isSubmitting = true;

      try {
        await this.submitAction(this.email);
      } catch (error) {
        const errorMessage = (error as Error).message;
        this.showError(errorMessage);
      } finally {
        this.isSubmitting = false;
      }
    },
    showError (errorMessage: string): void {
      const validationObserver = this.$refs.validationObserver as InstanceType<typeof ValidationObserver>;

      validationObserver.setErrors({
        [this.fieldName]: errorMessage
      })
    }
  },
  watch: {
    prefilledEmail: {
      handler (val: string | undefined) {
        if (!val) {
          return;
        }

        this.email = this.prefilledEmail;
      },
      immediate: true
    }
  }
});
</script>

<style lang="scss" scoped>
.subscription-form {
  ._form {
    display: flex;
    flex-direction: column;
    align-items: center;

    ._input {
      flex: unset;
      width: 100%;
    }

    ._button {
      margin-top: var(--spacer-sm);
    }
  }
}
</style>
