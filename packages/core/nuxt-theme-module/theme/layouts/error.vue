<template>
  <div id="error">
    <SfImage
      class="image"
      src="/error/error.svg"
      alt="leaves"
    />
    <SfHeading
      :title="error.statusCode === 404 ? 'Page not found' : 'An error occured'"
      :level="2"
      :description="error.statusCode === 404 ? 'We are sorry that we can’t find the page, please go back or try again' : 'Please go back or try again'"
      class="heading sf-heading--no-underline"
    />
    <div class="actions">
      <SfButton link="/" class="sf-button--full-width actions__button">
        Return home
      </SfButton>
      <SfButton class="sf-button--full-width sf-button--text actions__button" @click="$router.go(-1)">
        Back
      </SfButton>
    </div>
  </div>
</template>
<script>
import { SfButton, SfImage, SfHeading } from '@storefront-ui/vue';
export default {
  name: 'ErrorLayout',

  props: ['error'],

  components: { SfButton, SfImage, SfHeading }
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
#error {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 var(--spacer-sm);
  margin: var(--spacer-xl) 0;
  @include for-desktop {
    max-width: 77.5rem;
  }
}
.image {
  --image-width: 14.375rem;
  padding: var(--spacer-xl) 0;
  @include for-desktop {
    --image-width: 25.75rem;
  }
}
.heading {
  --heading-title-margin: 0 0 var(--spacer-sm);
  --heading-title-color: var(--c-primary);
  --heading-title-font-weight: var(--font-weight--semibold);
  --heading-description-color: var(--c-text-muted);
  --heading-description-font-size: var(--font-size--base);
  --heading-description-margin: 0 var(--spacer-base);
  --heading-description-font-family: var(--font-family--primary);
  @include for-desktop {
    --heading-description-margin: 0;
  }
}
.actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  width: 100%;
  margin: var(--spacer-xl) 0 0 0;
  &__button {
    --button-width: 100%;
    &:first-child:hover {
      color: var(--c-white);
    }
    &:last-child {
      margin: var(--spacer-sm) 0;
    }
  }
  @include for-desktop {
    margin: var(--spacer-lg) 0 0 0;
    &__button {
      --button-width: 25rem;
    }
  }
}
</style>
