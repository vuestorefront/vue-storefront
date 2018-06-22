<template>
  <span class="tooltip relative">
    <i class="material-icons icon cl-accent">info</i>
    <div class="text absolute p25 h5 bg-cl-th-accent cl-white">
      <slot />
    </div>
  </span>
</template>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-border: color(accent);

.tooltip {
  cursor: default;

  &:hover .text {
    display: block;
  }
}

.icon {
  vertical-align: bottom;
}

.text {
  display: none;
  left: 50%;
  transform: translateX(-50%);
  bottom: 35px;
  box-sizing: border-box;
  width: 200px;
  text-align: center;

  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    border: 10px solid transparent;
    border-top: 10px solid $color-border;
    left: 50%;
    transform: translateX(-50%);
    bottom: -20px;
  }
}
</style>
