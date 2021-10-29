<template>
  <div class="container">
    <SfButton
      class="container__lang container__lang--selected"
      @click="isLangModalOpen = !isLangModalOpen"
    >
      <SfImage :src="`/icons/langs/${locale}.webp`" width="20" alt="Flag" />
    </SfButton>
    <SfBottomModal
      :is-open="isLangModalOpen"
      :title="availableStores.length > 0 ? 'Choose store': ''"
      @click:close="isLangModalOpen = !isLangModalOpen"
    >
      <SfList>
        <SfListItem v-for="store in availableStores" :key="store.id">
          <a
            href="/"
            class="container__store--link"
            :class="isStoreSelected(store) ? 'container__store--selected' : ''"
            @click="changeStore(store)"
          >
            <SfCharacteristic class="language">
              <template #title>
                <span>{{ store.name }}</span>
              </template>
              <template #icon>
                <SfImage :src="`/icons/langs/${getStoreLocale(store)}.webp`" width="20" alt="Flag" class="language__flag" />
              </template>
            </SfCharacteristic>
          </a>
        </SfListItem>
      </SfList>

      <SfHeading
        :level="3"
        title="Choose language"
        class="container__lang--title"
      />
      <SfList>
        <SfListItem v-for="lang in availableLocales" :key="lang.code">
          <nuxt-link :to="switchLocalePath(lang.code)">
            <SfCharacteristic class="language">
              <template #title>
                <span>{{ lang.label }}</span>
              </template>
              <template #icon>
                <SfImage :src="`/icons/langs/${lang.code}.webp`" width="20" alt="Flag" class="language__flag" />
              </template>
            </SfCharacteristic>
          </nuxt-link>
        </SfListItem>
      </SfList>
    </SfBottomModal>
  </div>
</template>

<script>
import {
  SfBottomModal,
  SfButton,
  SfCharacteristic,
  SfHeading,
  SfImage,
  SfList,
  SfSelect
} from '@storefront-ui/vue';
import { useStore, useCart } from '@vue-storefront/commercetools';
import { ref, computed } from '@nuxtjs/composition-api';

export default {
  components: {
    SfBottomModal,
    SfButton,
    SfCharacteristic,
    SfHeading,
    SfImage,
    SfList,
    SfSelect
  },
  setup(props, context) {
    const { locales, locale, defaultLocale } = context.root.$i18n;
    const { change, response } = useStore();
    const { clear, cart } = useCart();
    const isLangModalOpen = ref(false);
    const availableLocales = computed(() => locales.filter(i => i.code !== locale));

    // to be added on local useStore factory
    function getSelected(stores) {
      return stores.results?.find((result) => result.key === stores._selectedStore);
    }

    const availableStores = computed(() => response.value?.results ?? []);
    const selectedStore = computed(() => getSelected(response.value));

    const changeStore = async (store) => {
      isLangModalOpen.value = false;
      if (cart?.value) await clear(cart);
      await change({store});
    };

    const isStoreSelected = (store) => selectedStore.value?.id === store.id;
    const getStoreLocale = (store) => store?.languages[0] ?? defaultLocale;

    return {
      changeStore,
      response,
      availableStores,
      selectedStore,
      isStoreSelected,
      getStoreLocale,
      availableLocales,
      locale,
      defaultLocale,
      isLangModalOpen
    };
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 -5px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  position: relative;
  .sf-bottom-modal {
    z-index: 2;
    left: 0;
    @include for-desktop {
      --bottom-modal-height: 100vh;
    }
  }
  .sf-bottom-modal::v-deep .sf-bottom-modal__close {
    position: var(--circle-icon-position, absolute);
    top: var(--spacer-xs);
    right: var(--spacer-xs);
  }
  .sf-list {
    .language {
      padding: var(--spacer-sm);
      &__flag {
        margin-right: var(--spacer-sm);
      }
    }
    @include for-desktop {
      display: flex;
    }
  }

  &__store {
    &--selected {
      font-weight: bold;
    }
  }

  &__lang {
    width: 20px;
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

    &--title {
    --heading-title-font-weight: var(--font-weight--normal);
    padding: var(
      --bottom-modal-title-padding,
      var(--spacer-sm) var(--spacer-lg)
    );
    color: var(--bottom-modal-title-color, var(--c-text));
    text-align: var(--bottom-modal-title-text-align, center);
    @include for-mobile {
      --heading-title-font-size: var(--font-size--xs);
      --heading-title-font-weight: var(--font-weight--bold);
    }
  }
  }
}
</style>
