<template>
  <div class="category-tile center-xs middle-xs flex fs-large extrabold bg-accent bg-accent-hover c-on-accent">
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

.category-tile {
    height: 350px;
}
</style>
