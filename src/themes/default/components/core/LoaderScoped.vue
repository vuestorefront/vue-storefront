<template>
  <div class="loader-container absolute">
    <div class="loader-inner-container absolute">
      <div class="spinner relative">
        <div class="double-bounce1 absolute w-100 brdr-circle bg-cl-th-success" />
        <div class="double-bounce2 absolute w-100 brdr-circle bg-cl-th-success" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoaderScoped'
}
</script>

<style lang="scss" scoped>
@import '~theme/css/base/global_vars';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-container-bg: color(black);
$color-message-bg: color(success);
$z-index-loader: map-get($z-index, loader);

.loader-container {
  z-index: $z-index-loader;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba($color-container-bg, 0.65);
}

.loader-inner-container {
  left: 50%;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
}

.loader-message-container {
  background-color: rgba($color-message-bg, 0.75);
  border-radius: 50px;
  letter-spacing: 0.5px;
}

.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto;
}

.double-bounce1,
.double-bounce2 {
  height: 100%;
  opacity: 0.6;
  top: 0;
  left: 0;
  -webkit-animation: sk-bounce 2s infinite ease-in-out;
  animation: sk-bounce 2s infinite ease-in-out;
}

.double-bounce2 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

@-webkit-keyframes sk-bounce {
  0%,
  100% {
    -webkit-transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bounce {
  0%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  50% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
</style>
