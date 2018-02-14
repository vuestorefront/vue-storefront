<template>
  <div
    class="button-full inline-flex px55 py20 center-xs ripple pointer weight-400 h4 bg-black c-white"
    tabindex="0"
    v-focus-clean="{class: 'no-outline'}"
  >
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'ButtonFull',
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/base/global_vars';
$darkgray: map-get($colors, darkgray);

.button-full:hover {
  background: $darkgray;
}
</style>
