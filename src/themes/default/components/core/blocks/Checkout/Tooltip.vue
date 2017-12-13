<template>
  <span class="tooltip relative">
    <i class="material-icons icon c-darkgray">info</i>
    <div class="text absolute p25 h5 bg-darkgray c-white">
      <slot />
    </div>
  </span>
</template>

<style lang="scss" scoped>
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
    border-top: 10px solid #333333;
    left: 50%;
    transform: translateX(-50%);
    bottom: -20px;
  }
}
</style>
