<template>
  <div
    v-show="!isOnline"
    class="offline-badge fixed w-100 p10 bg-cl-th-error c-white center-xs"
  >
    {{ $t('You are offline, some of the functionalities are limited') }}
  </div>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

export default {
  mixins: [coreComponent('OfflineBadge')]
}
</script>

<style scoped>
.offline-badge {
  bottom: 0;
  left: 0;
}
</style>
