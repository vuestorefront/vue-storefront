<template>
  <button @click="$emit('click')" class="brdr-none bg-cl-transparent p0 middle-xs inline-flex cl-secondary">
    <span class="hidden-xs h6">
      {{ $t('Remove') }}
    </span>
    <i class="material-icons h4 p5 pr0">remove_shopping_cart</i>
  </button>
</template>
