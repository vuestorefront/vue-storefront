<template>
  <div class="base-input-number">
    <label class="base-input-number__label cl-primary flex" :for="getInputId">{{ name }}</label>
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
    <ValidationMessages v-if="validations" :validations="validations" />
  </div>
</template>

<script>
import ValidationMessages from './ValidationMessages.vue'
export default {
  name: 'BaseInput',
  components: {
    ValidationMessages
  },
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
    validations: {
      type: Array,
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
      height: 1.4rem;
      line-height: 1.7rem;
      @media (min-width: 768px) {
        height: 1.7rem;
      }
    }

    &__label {
      font-size: 0.8rem;
      line-height: 1.2rem;
      max-width: 100px;
      @media (min-width: 768px) {
        font-size: 1rem;
        line-height: 1.4rem;
      }
    }
  }

</style>
