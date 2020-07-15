<template>
  <div id="thank-you">
    <SfCallToAction
      class="banner"
      title="Something went wrong with your payment."
      :image="{
        mobile: '/thank-you/BannerM.png',
        desktop: '/thank-you/BannerD.png',
      }"
    />
    <nuxt-link to="/" class="sf-button back-button color-primary button-size">Go back to shop</nuxt-link>
  </div>
</template>

<script>
import { SfHeading, SfButton, SfCallToAction } from '@storefront-ui/vue';

export default {
  components: {
    SfHeading,
    SfButton,
    SfCallToAction
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
#thank-you {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    padding: 0 var(--spacer-sm);
    margin: 40px auto;
  }
}

.banner {
  --call-to-action-color: var(--c-text);
  --call-to-action-title-font-size: var(--font-xl);
  --call-to-action-title-font-weight: var(--font-medium);
  --call-to-action-text-container-width: 50%;
  margin: 0 0 var(--spacer-base);
  @include for-desktop {
    margin: 0 0 var(--spacer-2xl) 0;
  }
  &__order-number {
    display: flex;
    flex-direction: column;
    font: var(--font-light) var(--font-sm) / 1.4 var(--font-family-primary);
    @include for-desktop {
      flex-direction: row;
      font-size: var(--font-normal);
    }
  }
}

.back-button {
  --button-width: calc(100% - (var(--spacer-sm) * 2));
  margin: 0 auto var(--spacer-sm) auto;

  &:hover {
    color:white;
  }

  @include for-desktop {
    --button-background: var(--c-secondary);
    margin: var(--spacer-xl) auto;
  }
}
.button-size {
  @include for-desktop {
    --button-width: 25rem;
  }
}
</style>
