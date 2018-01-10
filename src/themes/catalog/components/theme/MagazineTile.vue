<template>
  <section class="magazine-tile center-xs flex c-on-dark pt50% pl20% pr20%" :style="'background-image: url(' + bgUrl + ')'" >
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
  .magazine-tile {
    height: 520px;
    flex-direction: column;
    background-size: cover;
    box-sizing: border-box;
  }
</style>
