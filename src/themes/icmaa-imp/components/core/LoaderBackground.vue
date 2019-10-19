<template>
  <div class="loader t-absolute t-left-0 t-w-full t-overflow-hidden" :class="[ background, height] ">
    <div class="bar t-w-1/2 t-h-full" :class="[ bar ]" />
  </div>
</template>

<script>
export default {
  name: 'LoaderBackground',
  props: {
    background: {
      type: String,
      default: 't-bg-transparent'
    },
    bar: {
      type: String,
      default: 't-bg-base-light'
    },
    height: {
      type: String,
      default: 't-h-1/8'
    }
  }
}
</script>

<style lang="scss">

.loader .bar {
  animation: loaderbackground 2s linear infinite;
}

@keyframes loaderbackground {
  from { transform: translate(-100%, 0) }
  to   { transform: translate(200%, 0) }
}

</style>
