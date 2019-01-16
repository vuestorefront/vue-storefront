<template>
  <no-ssr>
    <div
      v-show="OfflineOnly"
      class="offline-badge fixed w-100 p10 bg-cl-th-error cl-white center-xs"
    >
      {{ $t('You are offline, some of the functionalities are limited') }}
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
<style scoped>
.offline-badge {
  bottom: 0;
  left: 0;
}
</style>
