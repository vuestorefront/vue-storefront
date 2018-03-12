<template>
  <div>
    <div class="checkboxStyled">
      <input
        type="checkbox"
        :id="id"
        :checked="value"
        @blur="$emit('blur')"
        :disabled="disabled"
      >
      <label :for="id" @click="$emit('click')"/>
    </div>
    <div class="checkboxText ml15 lh25" @click="$emit('click')">
      <span class="fs16 cl-accent">
        <slot/>
      </span>
    </div>
    <span
      class="validation-error"
      v-if="validationIf"
    >
      {{ validationText }}
    </span>
  </div>
</template>
<script>
export default {
  name: 'BaseCheckbox',
  props: {
    id: {
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      required: true
    },
    validationIf: {
      type: Boolean,
      required: false,
      default: false
    },
    validationText: {
      type: String,
      required: false,
      default: ''
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-secondary: color(secondary);
  $color-white: color(white);

  .checkboxStyled {
    width: 23px;
    position: relative;
    display: table-cell;

    label {
      cursor: pointer;
      position: absolute;
      width: 23px;
      height: 23px;
      top: 0;
      left: 0;
      background: $color-white;
      border: 1px solid $color-secondary;

      &:after {
        content: '';
        position: absolute;
        width: 11px;
        height: 5px;
        background: transparent;
        top: 6px;
        left: 5px;
        border: 3px solid $color-white;
        border-top: none;
        border-right: none;
        transform: rotate(-45deg);
      }
    }

    input[type=checkbox]:checked + label {
      background: $color-secondary;
    }
  }

  .checkboxText {
    display: table-cell;
    cursor: pointer;
    padding-left: 10px;

    span {
      vertical-align: middle;
      font-size: 18px;
    }
  }
</style>

