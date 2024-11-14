<template>
  <span class="opt-out-link">
    <a
      v-show="isMounted"
      class="_link"
      :class="{'truevault-polaris-optout': isMounted}"
      :href="url"
      target="_blank"
      noreferrer
      noopener
      hidden
    >
      <img src="https://polaris.truevaultcdn.com/static/assets/icons/optout-icon-blue.svg"
           alt="California Consumer Privacy Act (CCPA) Opt-Out Icon"
           style="vertical-align:middle" height="14px"
      >
      Your Privacy Choices
    </a>
  </span>
</template>

<script lang="ts">
import config from 'config';
import Vue from 'vue';

export default Vue.extend({
  name: 'OptOutLink',
  data () {
    return {
      isMounted: false
    }
  },
  computed: {
    url (): string {
      return config.privacyPolicy.optOutUrl;
    }
  },
  async mounted () {
    await this.$nextTick();
    this.isMounted = true;
  }
})
</script>

<style lang="scss">
.opt-out-link {
  ._link {
    color: var(--opt-out-link-color, var(--c-link));
    font-size: var(--opt-out-link-font-size, var(--font-xs));
  }
}
</style>
