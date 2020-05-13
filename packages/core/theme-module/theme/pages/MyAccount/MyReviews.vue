<template>
  <SfTabs :open-tab="1" class="tab-orphan">
    <SfTab data-cy="my-reviews-tab" title="My reviews">
      <p class="message">
        This feature is not implemented yet! Please take a look at<br />
        <a href="#"
          >https://github.com/DivanteLtd/vue-storefront/issues for our
          Roadmap!</a
        >
      </p>
    </SfTab>
  </SfTabs>
</template>
<script>
import { SfTabs } from '@storefront-ui/vue';
export default {
  name: 'MyReviews',
  components: { SfTabs }
};
</script>
<style lang='scss' scoped>
@import "~@storefront-ui/vue/styles";

.tab-orphan {
  @include for-mobile {
    --tabs-title-display: none;
    --tabs-content-padding: 0;
    --tabs-conent-border-width: 0;
  }
}
.message {
  margin: 0 0 var(--spacer-2xl) 0;
  font: 300 var(--font-base) / 1.6 var(--font-family-secondary);
  &__label {
    font-weight: 500;
  }
}
a {
  color: var(--c-text-muted);
  text-decoration: none;
  &:hover {
    color: var(--c-text);
  }
}
</style>
