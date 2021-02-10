<template>
  <SfModal
    :visible="isAuthModalOpen"
    class="modal"
    @close="toggleAuthModal"
  >
    <template #modal-bar>
      <SfBar
        class="sf-modal__bar smartphone-only"
        :close="true"
        :title="currentAuthModal === 'login' ? 'Log in' : 'Sign in'"
        @click:close="toggleAuthModal"
      />
    </template>
    <transition name="sf-fade" mode="out-in">
      <LoginForm v-if="currentAuthModal === 'login'" />
      <RegisterForm v-else />
    </transition>
  </SfModal>
</template>

<script>
import { SfBar, SfModal } from '@storefront-ui/vue';
import { useUiState } from '~/composables';

export default {
  name: 'AuthModal',
  components: {
    SfModal,
    SfBar,
    LoginForm: () => import('~/components/Auth/LoginForm'),
    RegisterForm: () => import('~/components/Auth/RegisterForm')
  },
  setup() {
    const { isAuthModalOpen, toggleAuthModal, currentAuthModal } = useUiState();

    return {
      isAuthModalOpen,
      toggleAuthModal,
      currentAuthModal
    };
  }
};
</script>
