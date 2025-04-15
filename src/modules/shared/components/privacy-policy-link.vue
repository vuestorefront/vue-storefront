<template>
  <a
    :href="url"
    target="_blank"
  >
    {{ $t(text) }}
  </a>
</template>

<script lang="ts">
import config from 'config';
import Vue from 'vue';

export default Vue.extend({
  name: 'PrivacyPolicyLink',
  props: {
    text: {
      type: String,
      default: 'Privacy Policy'
    }
  },
  computed: {
    url (): string {
      return config.privacyPolicy.url;
    }
  }
});
</script>
