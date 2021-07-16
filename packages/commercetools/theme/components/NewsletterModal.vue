<template>
  <SfModal
    v-e2e="'login-modal'"
    :visible="isNewsletterModalOpen"
    class="modal"
    @close="closeModal"
  >
    <template #modal-bar>
      <SfBar
        class="smartphone-only"
        :close="true"
        :title="$t('Subscribe to newsletter')"
        @click:close="closeModal"
      />
    </template>
    <transition name="sf-fade" mode="out-in">
      <div>
        <SfHeading
          :level="3"
          :title="$t('Subscribe to newsletter')"
          class="desktop-only"
        />
        <form  @submit.prevent="">
          <SfInput type="email" label="Email address"/>
          <SfButton class="modal-button" type="submit">
            I confirm subscription
          </SfButton>
        </form>
        <SfHeading
          description="You can unsubscribe at any time"
          :level="3"
        />
        <SfScrollable :maxContentHeight="isMobile ? '' : '3.75rem'" showText="show more" hideText="hide">
          <p>
            After signing up for the newsletter, you will receive special offers and messages from VSF via email.
            We will not sell or distribute your email to any third party at any time.
            Please see our <SfLink link="https://www.vuestorefront.io/privacy-policy">Privacy Policy</SfLink>
          </p>
        </SfScrollable>
      </div>
    </transition>
  </SfModal>
</template>
<script>
import { ref } from '@vue/composition-api';
import { SfModal, SfHeading, SfInput, SfButton, SfScrollable, SfBar, SfLink } from '@storefront-ui/vue';
import {
  mapMobileObserver,
  unMapMobileObserver
} from '@storefront-ui/vue/src/utilities/mobile-observer.js';
import { computed, onBeforeUnmount } from '@vue/composition-api';
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
    SfHeading,
    SfInput,
    SfButton,
    SfScrollable,
    SfBar,
    SfLink
  },
  setup() {
    const { isNewsletterModalOpen, toggleNewsletterModal } = useUiState();
    const form = ref({});

    const closeModal = () => {
      toggleNewsletterModal();
    };

    const isMobile = computed(() => mapMobileObserver().isMobile.get());

    onBeforeUnmount(() => {
      unMapMobileObserver();
    });

    return {
      form,
      isNewsletterModalOpen,
      toggleNewsletterModal,
      isMobile,
      closeModal
    };
  }
};
</script>

<style lang="scss" scoped>

.modal {
  display: flex;
  justify-content: center;
  --modal-index: 3;
  --overlay-z-index: 3;
}
.modal-button {
  margin: 0 auto;
}
</style>
