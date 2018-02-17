<template>
  <router-link
    v-if="link"
    :to="link"
    class="button-outline inline-flex uppercase weight-400 h4 px40 py15 no-underline"
    :class="{
      light : color === 'light', 'brdr-white' : color === 'light', 'c-white' : color === 'light',
      dark : color === 'dark', 'brdr-darkgray' : color === 'dark', 'c-gray-secondary' : color === 'dark'
    }"
  >
    <slot>Button</slot>
  </router-link>
  <button
    v-else
    class="button-outline px40 py15 bg-transparent uppercase h4"
    :class="{
      light : color === 'light', 'brdr-white' : color === 'light', 'c-white' : color === 'light',
      dark : color === 'dark', 'brdr-darkgray' : color === 'dark', 'c-gray-secondary' : color === 'dark'
    }"
  >
    <slot>Button</slot>
  </button>
</template>

<script>
import focusClean from 'theme/components/theme/directives/focusClean'
export default {
  name: 'ButtonOutline',
  directives: { focusClean },
  props: {
    color: {
      type: String,
      required: true
    },
    link: {
      type: String,
      default: null,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/base/global_vars';
  $gray-secondary: map-get($colors, gray-secondary);
  $white: map-get($colors, white);
  $black: map-get($colors, black);

  .button-outline {
    border: 2px solid;
  }
  .dark {
    font-weight: 200;
    border: 1px solid $gray-secondary;
    &:hover,
    &:focus {
      color: $white;
      background: $black;
      border-color: $black;
    }
  }
  .light {
    &:hover,
    &:focus {
      color: $black;
      background: $white;
      border-color: $white;
    }
  }
</style>
