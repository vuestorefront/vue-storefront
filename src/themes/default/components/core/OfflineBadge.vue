<template>
  <no-ssr>
    <div
      v-offline
      class="offline-badge fixed w-100 p10 bg-cl-th-error cl-white center-xs"
    >
      {{ $t('You are offline, some of the functionalities are limited') }}
    </div>
  </no-ssr>
</template>

<style scoped>
.offline-badge {
  bottom: 0;
  left: 0;
}
</style>
