<template>
  <SfModal
    v-e2e="'login-modal'"
    :visible="isNewsletterModalOpen"
    class="modal"
    @close="closeModal"
  >
    <template #modal-bar>
      <SfBar
        class="sf-modal__bar smartphone-only"
        :close="true"
        :title="$t('Subscribe to newsletter')"
        @click:close="closeModal"
      />
    </template>
    <transition name="sf-fade" mode="out-in">
      <div>
        <SfInput type="email" placeholder="email address">
        </SfInput>
        <SfButton>
          I confirm subscription
        </SfButton>
        <p>
          Lorem ipsum
        </p>
      </div>
    </transition>
  </SfModal>
</template>
<script>
import { ref } from '@vue/composition-api';
import { SfModal, SfInput, SfButton, SfCheckbox, SfLoader, SfBar } from '@storefront-ui/vue';
import { extend } from 'vee-validate';
import { email } from 'vee-validate/dist/rules';
import { useUiState } from '~/composables';

extend('email', {
  ...email,
  message: 'Invalid email'
});

export default {
  name: 'LoginModal',
  components: {
    SfModal,
    SfInput,
    SfButton,
    SfCheckbox,
    SfLoader,
    SfBar
  },
  setup() {
    const { isNewsletterModalOpen, toggleNewsletterModal } = useUiState();
    const form = ref({});

    const closeModal = () => {
      toggleNewsletterModal();
    };

    return {
      form,
      isNewsletterModalOpen,
      toggleNewsletterModal,
      closeModal
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
.thank-you {
  &__paragraph {
    &--bold {
      font-weight: var(--font-weight--semibold);
    }
  }
}
</style>
