<template>
  <div
    class="button-outline inline-flex uppercase brdr-2 pointer weight-400 h4"
    tabindex="0"
    :class="{
      light : color === 'light', 'brdr-white' : color === 'light', 'c-white' : color === 'light',
      dark : color === 'dark', 'brdr-darkgray' : color === 'dark', 'c-gray-secondary' : color === 'dark'
    }"
  >
    <router-link
      v-if="link"
      :to="link"
      class="px40 py15 no-underline"
    >
      {{ text }}
    </router-link>
    <span
      v-else
      class="px40 py15"
    >
      {{ text }}
    </span>
  </div>
</template>

<script>
import focusClean from 'theme/components/theme/directives/focusClean'
export default {
  name: 'ButtonOutline',
  directives: { focusClean },
  props: {
    text: {
      type: String,
      required: true
    },
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
  }
  .light:hover {
    color: $black;
    background: $white;
    border-color: $white;
  }
  .dark:hover {
    color: $white;
    background: $black;
    border-color: $black;
  }
</style>
