<template>
  <SfTopBar>
    <template #left>
        <SfButton data-cy="top-bar-btn_faq" class="sf-button--text">Help & FAQs</SfButton>
      </template>
    <template #center>
        <p>Download our application.</p>
        <SfButton data-cy="top-bar-btn_more" class="topbar__button sf-button--text">Find out more</SfButton>
      </template>
      <template #right>
        <LocaleSelector />
    </template>
  </SfTopBar>
</template>

<script>
import { SfButton, SfTopBar } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
import { useUser, userGetters } from '<%= options.generate.replace.composables %>';
import LocaleSelector from './LocaleSelector';

export default {
  components: { SfTopBar,
    SfButton,
    LocaleSelector },
  setup() {
    const { toggleLoginModal } = useUiState();
    const { isAuthenticated, logout, user } = useUser();

    return {
      toggleLoginModal,
      isAuthenticated,
      logout,
      user,
      userGetters
    };
  }
};

</script>
<style lang="scss" scoped>
.topbar {
  &__button {
    margin: 0 0 0 var(--spacer-xs);
  }
}
</style>
