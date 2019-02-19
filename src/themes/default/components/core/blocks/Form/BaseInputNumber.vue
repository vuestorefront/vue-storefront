<template>
  <div class="base-input-number">
    <label class="base-input-number__label flex" :for="getInputId">{{ name }}</label>
    <input
      :id="getInputId"
      type="number"
      :min="min"
      class="m0 no-outline base-input-number__input brdr-cl-primary bg-cl-transparent h4"
      :focus="autofocus"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  data () {
    return {
    }
  },
  props: {
    value: {
      type: [String, Number],
      default: 0
    },
    name: {
      type: String,
      required: false,
      default: ''
    },
    min: {
      type: Number,
      default: 0
    },
    autofocus: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    getInputId () {
      return `input_${this._uid}`
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-tertiary: color(tertiary);
  $color-black: color(black);
  $color-puerto-rico: color(puerto-rico);
  $color-hover: color(tertiary, $colors-background);

  .base-input-number {
    &__input {
      border-style: solid;
      border-width: 0 0 1px 0;
      width: 90px;
    }

    &__label {
      cursor: pointer;
      font-size: 14px;
    }
  }

</style>
