<template>
  <div class="button-outline uppercase px40 py15" tabindex="0" :class="{
    light : color === 'light', 'brdr-white' : color === 'light', 'c-white' : color === 'light',
    dark : color === 'dark', 'brdr-darkgray' : color === 'dark', 'c-gray-secondary' : color === 'dark'
  }">
    {{ text }}
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/global_vars';
$gray-secondary: map-get($colors, gray-secondary);

.button-outline {
    font-size: 16px;
    border: 2px solid;
    display: inline-flex;
    cursor: pointer;
    font-weight: 400;
}
.button-outline.dark {
    font-weight: 200;
    border: 1px solid $gray-secondary;
}
.light:hover {
    color: #000;
    background: white;
    border-color: white;
}
.dark:hover {
    color: white;
    background: #000;
    border-color: black;
}
</style>
