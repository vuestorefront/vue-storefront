<template>
  <div class="container">
    <SfButton
      v-for="lang in availableLocales"
      :key="lang.code"
      :class="['container__lang', { 'container__lang--selected': lang.code === locale.code}]"
      @click="handleChangeLang(lang.code)"
    >
      <SfImage :src="`/icons/langs/${lang.code}.png`" width="20" />
    </SfButton>
  </div>
</template>

<script>
import { SfImage, SfSelect, SfButton } from '@storefront-ui/vue';
import { useLocale } from '@vue-storefront/about-you';

export default {
  components: {
    SfImage,
    SfSelect,
    SfButton
  },
  setup(props, context) {
    const { $router, $route } = context.root;
    const { availableLocales, locale, setCookie, setLocale } = useLocale();

    const handleChangeLang = (name) => {
      setLocale(name);
      setCookie(name);
      $router.go({ path: $route.fullPath, force: true });
    };

    const handleSelectChange = () => {
      $router.go({ path: $route.fullPath, force: true });
    };

    return {
      handleChangeLang,
      handleSelectChange,
      locale,
      availableLocales
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
  &::v-deep .sf-select {
    --select-font-size: var(--font-sm);
  }
  &__select {
    padding: 0 5px;
    margin: 0;
    cursor: pointer;
    &::v-deep .sf-select__dropdown {
      min-width: 150px;
    }
    &::v-deep .sf-select__selected {
      padding: 0;
      display: flex;
      align-items: center;
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
