<template>
  <div id="error">
    <SfImage
      class="image"
      :src="require('@storefront-ui/shared/icons/error.svg')"
    />
    <SfHeading
      title="Page not found"
      :level="2"
      description="We are sorry that we can’t find the page, please go back or try again"
      class="heading sf-heading--no-underline"
    />
    <div class="actions">
      <SfButton link="/" class="sf-button--full-width actions__button">
        Return home
      </SfButton>
      <SfButton class="sf-button--full-width sf-button--text actions__button">
        Back
      </SfButton>
    </div>
  </div>
</template>
<script>
import { SfButton, SfImage, SfHeading } from '@storefront-ui/vue';
export default {
  name: 'Error',
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
.sf-link {
  --link-text-decoration: none;
  &:visited, &:hover {
    color: var(--c-white);
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
