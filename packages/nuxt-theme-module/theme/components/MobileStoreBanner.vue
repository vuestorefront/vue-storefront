<template>
  <SfBanner
    :image="addBasePath('/homepage/bannerD.png')"
    subtitle="Fashon to take away"
    title="Download our application to your mobile"
    class="sf-banner--left desktop-only banner-app"
  >
    <template #call-to-action>
      <div class="banner-app__call-to-action">
        <SfButton
          class="banner-app__button sf-button--pure"
          aria-label="Go to Apple Product"
          @click="() => {}"
        >
          <SfImage
            :src="addBasePath('/homepage/apple.png')"
            alt="App store"
          />
        </SfButton>
        <SfButton
          class="banner-app__button sf-button--pure"
          aria-label="Go to Google Product"
          @click="() => {}"
        >
          <SfImage
            :src="addBasePath('/homepage/google.png')"
            alt="Google play"
          />
        </SfButton>
      </div>
    </template>
  </SfBanner>
</template>
<script>
import {
  SfBanner,
  SfImage,
  SfButton
} from '@storefront-ui/vue';
import { addBasePath } from '@vue-storefront/core';
export default {
  name: 'AppStoreBanner',
  components: {
    SfBanner,
    SfImage,
    SfButton
  },
  setup() {
    return {
      addBasePath
    };
  }
};
</script>
<style lang="scss" scoped>

.banner-app {
  --banner-title-margin: var(--spacer-base) 0 var(--spacer-xl) 0;
  --banner-padding: 0 0 var(--spacer-2xl);
  --banner-title-font-size: var(--h1-font-size);
  --banner-subtitle-font-size: var(--font-size--xl);
  --banner-title-font-weight: var(--font-weight--semibold);
  --banner-subtitle-font-weight: var(--font-weight--medium);
  --banner-title-text-transform: capitalize;
  --banner-title-text-transform: none;
  --banner-background-size: contain;
  --banner-background-position: right;
  display: block;
  min-height: 26.25rem;
  max-width: 77.5rem;
  margin: 0 auto;
  padding: 5.625rem 31.25rem 0 5.625rem;
  &__call-to-action {
    display: flex;
    flex-wrap: nowrap;
  }
  &__button {
    --image-width: 10.875rem;
    --image-height: 3.5625rem;
    pointer-events: visible;
    & + & {
      margin: 0 0 0 var(--spacer-base);
    }
  }
}

</style>
