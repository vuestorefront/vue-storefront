<template>
  <div class="category-tile center-xs middle-xs flex fs-large extrabold bg-accent bg-accent-hover c-on-accent">
    {{ label }}
  </div>
</template>

<script>
// not in Core
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/vars/additional';
.category-tile {
    height: 150px;
    @media ( min-width: $md ) {
      height: 350px;
    }
}
</style>
