<template>
  <div class="relative">
    <input
      class="py10 w-100 border-box brdr-none brdr-bottom brdr-cl-primary h4 weight-200 sans-serif"
      :type="type === 'password' ? passType : type"
      :name="name"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :value="value"
      :ref="focus ? name : false"
      @input="$emit('input', $event.target.value)"
      @blur="$emit('blur')"
      @keyup.enter="$emit('keyup.enter', $event.target.value)"
    >
    <i
      v-if="iconActive"
      class="icon material-icons absolute cl-brdr-secondary pointer"
      @click="togglePassType()"
    >
      {{ icon }}
    </i>
    <template v-if="validation">
      <span class="block cl-error h6" v-if="validation.condition">
        {{ validation.text }}
      </span>
    </template>
    <template v-else-if="validations">
      <span
        v-for="(validation, index) in validations"
        :key="index"
        v-if="validation.condition"
        class="block cl-error h6"
      >
        {{ validation.text }}
      </span>
    </template>
  </div>

</template>

<script>
import { coreComponent } from 'core/lib/themes'
export default {
  mixins: [coreComponent('blocks/Form/BaseInput')]
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-tertiary: color(tertiary);
  $color-black: color(black);
  $color-hover: color(tertiary, $colors-background);

  input {
    transition: 0.3s all;
    &::-webkit-input-placeholder {
      color: $color-tertiary;
    }
    &::-moz-placeholder {
      color: $color-tertiary;
    }
    &:hover,
    &:focus {
      outline: none;
      border-color: $color-black;
    }
  }

  .icon {
    right: 0;
    top: 10px;
    &:hover {
      color: $color-hover;
    }
  }
</style>
