<template>
  <div />
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { localizedRoute } from '@vue-storefront/core/lib/multistore';

export default Vue.extend({
  name: 'RedirectPage',
  props: {
    targetPath: {
      type: String,
      required: true
    }
  },
  async mounted () {
    this.$router.push(localizedRoute(this.targetPath))
  }
});
</script>
