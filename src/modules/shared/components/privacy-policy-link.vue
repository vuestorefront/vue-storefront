<template>
  <a
    :href="url"
    target="_blank"
  >
    {{ $t('Privacy Policy') }}
  </a>
</template>

<script lang="ts">
import config from 'config';
import Vue from 'vue';

export default Vue.extend({
  name: 'PrivacyPolicyLink',
  computed: {
    url (): string {
      return config.privacyPolicy.url;
    }
  }
});
</script>
