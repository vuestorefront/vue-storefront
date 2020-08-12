<template>
  <div class="container">
    <SfButton
      data-cy="locale-select_change-langauge"
      class="container__lang container__lang--selected"
      @click="isLangModalOpen = !isLangModalOpen"
    >
      <SfImage :src="`/icons/langs/${locale}.png`" :alt="locale" width="20" />
    </SfButton>
    <SfBottomModal :is-open="isLangModalOpen" title="Choose language" @click:close="isLangModalOpen = !isLangModalOpen">
      <SfList>
        <SfListItem v-for="lang in availableLocales" :key="lang.name">
          <SfButton
            class="sf-button--full-width"
            :aria-label="lang.label"
            @click="handleChangeLang(lang)"
          >
            <SfCharacteristic>
              <template #title>
                <span>{{ lang.label }}</span>
              </template>
              <template #icon>
                <SfImage :src="`/icons/langs/${lang.name}.png`" :alt="lang.name" />
              </template>
            </SfCharacteristic>
          </SfButton>
        </SfListItem>
      </SfList>
    </SfBottomModal>
  </div>
</template>

<script>
import {
  SfImage,
  SfSelect,
  SfButton,
  SfList,
  SfBottomModal,
  SfCharacteristic
} from '@storefront-ui/vue';
import { useLocale } from '@vue-storefront/shopify';
import { ref } from '@vue/composition-api';

/*
  This is the old version of that component.
  Waiting for core useLocaleFactory.
*/

export default {
  components: {
    SfImage,
    SfSelect,
    SfButton,
    SfList,
    SfBottomModal,
    SfCharacteristic
  },
  setup(props, context) {
    const { $router, $route } = context.root;
    const { locale, ...fields } = useLocale();
    const setCookie = context.root.$i18n.setLocaleCookie;
    const isLangModalOpen = ref(false);

    const handleChangeLang = ({ name }) => {
      if (name === locale.value) {
        isLangModalOpen.value = false;
        return;
      }
      locale.value = name;
      setCookie(name);
      $router.go({ path: $route.fullPath, force: true });
    };

    return {
      handleChangeLang,
      locale,
      isLangModalOpen,
      ...fields
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";

.container {
  margin: 0 -5px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  position: relative;

  .sf-bottom-modal {
    z-index: 1;
    left: 0;
    @include for-desktop {
      --bottom-modal-height: 100vh;
    }
  }

  .sf-list {
    @include for-desktop {
      display: flex;
    }

    .sf-button {
      background: transparent;
      color: var(--c-text-muted);
      --button-box-shadow: none;
    }

    .sf-image {
      --image-width: 20px;
      margin-right: 1rem;
      border: 1px solid var(--c-light);
      border-radius: 50%;
    }
  }

  &__lang {
    --image-width: 20px;
    --button-box-shadow: none;
    background: none;
    padding: 0 5px;
    display: flex;
    align-items: center;
    opacity: 0.5;
    border: none;
    &:hover,
    &--selected {
      opacity: 1;
    }
  }
}
</style>
