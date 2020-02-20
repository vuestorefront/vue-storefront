<template>
  <SfTopBar>
    <template #left>
      <LocaleSelector />
    </template>
    <template #right>
      <SfButton
        v-if="!isAuthenticated"
        class="sf-button--text color-secondary"
        @click="toggleLoginModal">
          Register / login
      </SfButton>
      <div v-else>
        {{ getUserFullName(user) }} (
          <SfButton
            class="sf-button--text color-secondary"
            @click="logout">
              logout
          </SfButton>
        )
      </div>
    </template>
  </SfTopBar>
</template>

<script>
import { SfButton, SfTopBar } from '@storefront-ui/vue';
import uiState from '~/assets/ui-state';
import { useUser } from '@vue-storefront/commercetools-composables';
import { getUserFullName } from '@vue-storefront/commercetools-helpers';
import LocaleSelector from './LocaleSelector';

const { toggleLoginModal } = uiState;

export default {
  components: { SfTopBar,
    SfButton,
    LocaleSelector },
  setup() {
    const { isAuthenticated, logout, user } = useUser();

    return {
      toggleLoginModal,
      isAuthenticated,
      logout,
      user,
      getUserFullName
    };
  }
};

</script>
