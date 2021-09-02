<template>
  <SfTabs :open-tab="1" class="tab-orphan">
    <SfTab title="My reviews">
      <p class="message">
         This feature is not implemented yet! Please take a look at
        <br />
        <SfLink class="message__link" href="#"
          >https://github.com/DivanteLtd/vue-storefront/issues </SfLink
        >
        for our Roadmap!
      </p>
    </SfTab>
  </SfTabs>
</template>

<script>
import { SfTabs, SfLink } from '@storefront-ui/vue';
export default {
  name: 'MyReviews',
  components: { SfTabs, SfLink }
};
</script>

<style lang='scss' scoped>
.tab-orphan {
  @include for-mobile {
    --tabs-title-display: none;
    --tabs-content-padding: 0;
    --tabs-conent-border-width: 0;
  }
}
.message {
  margin: 0 0 var(--spacer-2xl) 0;
  font: var(--font-weight--light) var(--font-size--base) / 1.6 var(--font-family--primary);
    &__link {
    color: var(--c-primary);
    --link-weight: var(--font-weight--medium);
    --link-font-family: var(--font-family--primary);
    --link-font-size: var(--font-size--base);
    text-decoration: none;
    &:hover {
      color: var(--c-text);
    }
  }
}
</style>
