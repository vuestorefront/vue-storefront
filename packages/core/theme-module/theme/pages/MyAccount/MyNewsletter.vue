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
            label="Children"
            value="children"
            class="form__element"
          />
        </div>
        <SfButton data-cy="newsletter-btn_join" class="form__button">Join Newsletter</SfButton>
      </div>
      <p class="notice">
        I have read and understand the <a href="#">Privacy</a> and
        <a href="#">Cookies Policy</a> and agree to receive personalized
        commercial information from Brand name by email.
      </p>
    </SfTab>
  </SfTabs>
</template>
<script>
import { SfTabs, SfCheckbox, SfButton } from '@storefront-ui/vue';
export default {
  name: 'MyNewsletter',
  components: {
    SfTabs,
    SfCheckbox,
    SfButton
  },
  data() {
    return { newsletter: '' };
  }
};
</script>
<style lang='scss' scoped>
@import "~@storefront-ui/vue/styles";
.shipping-list {
  margin: 0 0 var(--spacer-2xl) 0;
}
.shipping {
  display: flex;
  padding: var(--spacer-xl) 0;
  border: 1px solid var(--c-light);
  border-width: 1px 0 0 0;
  &:last-child {
    border-width: 1px 0 1px 0;
  }
  &__content {
    flex: 1;
    color: var(--c-text);
    font: 300 var(--font-sm) / 1.6 var(--font-family-secondary);
  }
  &__actions {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    @include for-desktop {
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    }
  }
  &__button-delete {
    --button-background: var(--c-light);
    --button-color: var(--c-dark-variant);
    &:hover {
      --button-background: var(--c-light-variant);
    }
    @include for-desktop {
      margin: 0 0 0 var(--spacer-xl);
    }
  }
  &__address {
    margin: 0 0 var(--spacer-xl) 0;
    &:last-child {
      margin: 0;
    }
  }
  &__client-name {
    font: 500 var(--font-base) / 1.6 var(--font-family-secondary);
  }
}
.tab-orphan {
  @include for-mobile {
    --tabs-title-display: none;
    --tabs-content-padding: 0;
    --tabs-conent-border-width: 0;
  }
}
.form {
  &__element {
    margin: 0 0 var(--spacer-xl) 0;
    &:last-child {
      margin: 0;
    }
  }
  &__checkbox-group {
    margin: 0 0 var(--spacer-2xl) 0;
  }
  &__title {
    margin: 0 0 var(--spacer-xl) 0;
    font: 500 var(--font-base) / 1.6 var(--font-family-secondary);
  }
  &__button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: auto;
    }
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
.notice {
  margin: var(--spacer-xl) 0 0 0;
  font: 300 var(--font-xs) / 1.6 var(--font-family-secondary);
}
.action-button {
  --button-width: 100%;
  @include for-desktop {
    --button-width: auto;
  }
}
</style>
