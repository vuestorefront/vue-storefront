<template>
  <button class="brdr-none bg-cl-transparent p0 middle-xs inline-flex cl-secondary weight-400 h4 sans-serif fs-medium">
    <span class="clearcart-btn cl-accent">
      <i class="material-icons cl-accent mr5">
        cancel
      </i>
      {{ $t('Clear cart') }}
    </span>
  </button>
</template>

<style lang="scss" scoped>
  .clearcart {
    &-btn {
      display: flex;
      align-items: center;
    }
  }
</style>
