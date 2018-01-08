<template>
  <div class="category-tile center-xs middle-xs flex fs-large extrabold">
      {{ label }}
  </div>
</template>

<script>
// not in Core
export default {
  props: {
    label: { type: String, required: true },
    img: String
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/vars/colors';

.category-tile {
    background: $c-accent;
    color: $c-text-on-accent;
    height: 350px;
}
</style>
