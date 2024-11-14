<template>
  <span class="california-privacy-notice-link">
    <a
      class="truevault-polaris-privacy-notice"
      target="_blank"
      :href="url"
      noreferrer
      noopener
      hidden
    >
      {{ text }}
    </a>
  </span>
</template>

<script lang="ts">
import config from 'config';
import Vue from 'vue';

export default Vue.extend({
  name: 'CaliforniaPrivacyNoticeLink',
  props: {
    text: {
      type: String,
      default: 'California Privacy Notice'
    }
  },
  computed: {
    url (): string {
      return config.privacyPolicy.californiaPrivacyNoticeUrl;
    }
  }
});
</script>

<style lang="scss" scoped>
.california-privacy-notice-link {
  .truevault-polaris-privacy-notice {
    font-size: var(--privacy-notice-link-font-size, var(--font-xs));
    color: var(--privacy-notice-link-color, var(--c-link));
    text-align: var(--privacy-notice-link-text-align, inherit);

    &:not([hidden]) {
      display: var(--privacy-notice-link-display, inline-block);
      margin: var(--privacy-notice-link-margin, var(--spacer-sm) 0 0);
      width: var(--privacy-notice-link-width, auto);
    }
  }
}
</style>
