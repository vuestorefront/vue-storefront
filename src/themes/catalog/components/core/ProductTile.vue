<template>
  <div class="product-tile center-xs fs-medium-small p30">
        <img src="/assets/product-tile.png" alt="">
        <div class="c-secondary mt30">Force in Jr.</div>
        <div class="bold c-on-light mt10"> {{ '39.87' | price }}</div>
  </div>
</template>


<style lang="scss" scoped>
@import '~theme/css/mixins/transitions';

.product-tile img {
    @include transition-long;
}
.product-tile:hover img {
    transform: scale(1.05);
}
</style>
