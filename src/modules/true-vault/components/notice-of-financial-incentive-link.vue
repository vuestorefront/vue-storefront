<template>
  <span class="notice-of-financial-incentive-link">
    <a
      class="truevault-polaris-privacy-notice"
      :href="url"
      target="_blank"
      noreferrer
      noopener
      hidden
    >
      Notice of Financial Incentive
    </a>
  </span>
</template>

<script lang="ts">
import config from 'config';
import Vue from 'vue';

export default Vue.extend({
  name: 'NoticeOfFinancialIncentiveLink',
  computed: {
    url (): string {
      return config.privacyPolicy.financialIncentiveNoticeUrl;
    }
  }
})
</script>

<style lang="scss" scoped>
.notice-of-financial-incentive-link {
  .truevault-polaris-privacy-notice {
    font-size: var(--font-xs);
    color: var(--financial-incentive-link-color, var(--c-link));

    &:not([hidden]) {
      display: var(--financial-incentive-link-display, inline);
      margin: var(--financial-incentive-link-margin, 0)
    }
  }
}
</style>
