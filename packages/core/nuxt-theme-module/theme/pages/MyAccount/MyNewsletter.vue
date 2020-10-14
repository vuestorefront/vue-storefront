<template>
  <SfTabs :open-tab="1" class="tab-orphan">
    <SfTab data-cy="my-newsletter-tab" title="My newsletter">
      <p class="message">
        Set up your newsletter and we will send you information about new
        products and trends from the sections you selected every week.
      </p>
      <div class="form">
        <p class="form__title">Sections that interest you</p>
        <div class="form__checkbox-group">
          <SfCheckbox
            v-model="newsletter"
            label="Woman"
            value="woman"
            class="form__element"
          />
          <SfCheckbox
            v-model="newsletter"
            label="Man"
            value="man"
            class="form__element"
          />
          <SfCheckbox
            v-model="newsletter"
            label="Kids"
            value="kids"
            class="form__element"
          />
        </div>
        <SfButton data-cy="newsletter-btn_join" class="form__button">Save changes</SfButton>
      </div>
      <p class="notice">
        I have read and understand the <SfLink class="notice__link" href="#">Privacy</SfLink> and
        <SfLink class="notice__link" href="#">Cookies Policy</SfLink> and agree to receive personalized
        commercial information from Brand name by email.
      </p>
    </SfTab>
  </SfTabs>
</template>
<script>
import { SfTabs, SfCheckbox, SfButton, SfLink } from '@storefront-ui/vue';
export default {
  name: 'MyNewsletter',
  components: {
    SfTabs,
    SfCheckbox,
    SfButton,
    SfLink
  },
  data() {
    return { newsletter: [] };
  }
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
.form {
  &__element {
    margin: 0 0 var(--spacer-sm) 0;
    &:last-child {
      margin: 0;
    }
  }
  &__checkbox-group {
    margin: 0 0 var(--spacer-xl) 0;
  }
  &__title {
    margin: 0 0 var(--spacer-xl) 0;
    font: var(--font-weight--normal) var(--font-size--base) / 1.6 var(--font-family--roboto);
  }
  &__button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: 17.5rem;
    }
  }
}
.message {
  margin: 0 0 var(--spacer-xl) 0;
  font: var(--font-weight--light) var(--font-size--sm) / 1.6 var(--font-family--roboto);
  &__label {
    font-weight: 500;
  }
}
.notice {
  margin: var(--spacer-xl) 0 0 0;
  font: var(--font-weight--light) var(--font-size--sm) / 1.6 var(--font-family--roboto);
  &__link {
    color: var(--c-text-muted);
    text-decoration: none;
    &:hover {
      color: var(--c-text);
    }
  }
}

</style>
