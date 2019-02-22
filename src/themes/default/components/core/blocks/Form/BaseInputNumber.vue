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
      @blur="$emit('blur', $event.target.value)"
    >
    <template v-if="validation">
      <span class="block cl-error h6 mt8" v-if="validation.condition">
        {{ validation.text }}
      </span>
    </template>
    <template v-else-if="validations">
      <span
        v-for="(validation, index) in validations"
        :key="index"
        v-if="validation.condition"
        class="block cl-error h6 mt8"
        data-testid="errorMessage"
      >
        {{ validation.text }}
      </span>
    </template>
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
    },
    validation: {
      type: Object,
      required: false,
      default: () => { }
    },
    validations: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  computed: {
    getInputId () {
      return `input_${this._uid}`
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';

  .base-input-number {
    width: 100%;

    &__input {
      border-style: solid;
      border-width: 0 0 1px 0;
      width: 50px;
      height: 1.7rem;
      line-height: 1.7rem;
    }

    &__label {
      font-size: 14px;
      max-width: 100px;
    }
  }

</style>
