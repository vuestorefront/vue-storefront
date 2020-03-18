<template>
  <SfTabs :open-tab="1" class="tab-orphan">
    <SfTab title="My newsletter">
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
        <SfButton class="form__button">Join Newsletter</SfButton>
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
@import '~@storefront-ui/vue/styles';
@mixin for-mobile {
  @media screen and (max-width: $desktop-min) {
    @content;
  }
}
@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}
.form {
  &__element {
    margin: 0 0 var(--spacer-big) 0;
    &:last-child {
      margin: 0;
    }
  }
  &__checkbox-group {
    margin: 0 0 var(--spacer-extra-big) 0;
  }
  &__title {
    margin: 0 0 var(--spacer-big) 0;
    font-family: var(--body-font-family-secondary);
    font-size: var(--font-size-regular-desktop);
    font-weight: 500;
    line-height: 1.6;
  }
  &__button {
    width: 100%;
    @include for-desktop {
      width: auto;
    }
  }
}
.message,
.notice {
  font-family: var(--body-font-family-primary);
  font-weight: var(--body-font-weight-primary);
  line-height: 1.6;
}
.message {
  margin: 0 0 var(--spacer-extra-big) 0;
  font-size: var(--font-size-regular-mobile);
  @include for-desktop {
    font-size: var(--font-size-regular-desktop);
  }
}
.notice {
  margin: var(--spacer-big) 0 0 0;
  font-size: var(--font-size-extra-small-desktop);
  @include for-desktop {
    max-width: 70%;
    margin: var(--spacer) 0 0 0;
    font-size: var(--font-size-extra-small-desktop);
  }
}
.tab-orphan {
  @include for-mobile {
    ::v-deep .sf-tabs {
      &__title {
        display: none;
      }
      &__content {
        border: 0;
        padding: 0;
      }
    }
  }
}
</style>
