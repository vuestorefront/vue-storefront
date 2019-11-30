<template>
  <no-ssr>
    <div
      v-show="OfflineOnly"
      class="offline-badge fixed p10 bg-cl-th-error cl-white center-xs"
    >
      {{ $t('You are offline. Some features might not be available.') }}
    </div>
  </no-ssr>
</template>

<script>
import NoSSR from 'vue-no-ssr'
import VueOfflineMixin from 'vue-offline/mixin'

export default {
  components: {
    'no-ssr': NoSSR
  },
  mixins: [VueOfflineMixin]
}
</script>
<style lang="scss" scoped>
@import '~theme/css/base/global_vars';
$z-index: map-get($z-index, overlay) - 1;

.offline-badge {
  bottom: 0;
  left: 0;
  right: 0;
  z-index: $z-index;
}
</style>
