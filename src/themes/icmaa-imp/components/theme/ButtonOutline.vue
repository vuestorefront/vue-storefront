<template>
  <component
    :is="compontentType"
    :to="redirectionLink"
    class="no-outline bg-cl-transparent no-underline t-text-xs t-px-5 t-p-3 t-rounded-sm t-border t-border-black"
    :class="{
      light: color === 'light',
      'brdr-white': color === 'light',
      'cl-white': color === 'light',
      dark: color === 'dark',
      'brdr-darkgray': color === 'dark',
      'cl-secondary': color === 'dark',
      px0: link ? true : false,
      px40: link ? false : true
    }"
    :style="{ '--color': color, color: color }"
  >
    <slot>Button</slot>
  </component>
</template>

<script>
import focusClean from 'theme/components/theme/directives/focusClean';

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
  },
  computed: {
    compontentType () {
      return this.link ? 'router-link' : 'button'
    },
    redirectionLink () {
      return this.link ? this.localizedRoute(this.link) : null
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~theme/css/variables/colors";
@import "~theme/css/helpers/functions/color";
$dark-border: color(secondary);
$white: color(white);
$black: color(black);

.button-outline {
  border: 1px solid var(--color);
}

.dark {
  border: 1px solid $dark-border;
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
