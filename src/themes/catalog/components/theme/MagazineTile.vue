<template>
  <section class="magazine-tile center-xs flex c-on-dark pt50% pl20% pr20%" >
    <img :src="bgUrl" alt="">
    <div class="category"> {{ category }} </div>
    <h1 class="c-on-dark regular fs-large"> {{ title }} </h1>
  </section>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    category: String,
    bgUrl: String
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/mixins/transitions';

.magazine-tile {
  height: 520px;
  flex-direction: column;
  background-size: cover;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  &:hover img {
    transform: scale(1.1)
  }
}
div, h1 {
  z-index: 2;
}
img {
  @include transition-long;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
