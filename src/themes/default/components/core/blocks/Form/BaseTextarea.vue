<template>
  <div class="relative">
    <div class="relative">
      <textarea
        class="
          mt10 pb10 w-100 border-box brdr-none brdr-bottom-1
          brdr-cl-primary h4 sans-serif
        "
        :class="{empty: value === ''}"
        :type="type"
        :name="name"
        :autocomplete="autocomplete"
        :value="value"
        :autofocus="autofocus"
        :ref="focus ? name : false"
        @input="$emit('input', $event.target.value)"
        @blur="$emit('blur')"
        @keyup.enter="$emit('keyup.enter', $event.target.value)"
        @keyup="$emit('keyup', $event)"
      />
      <label>
        {{ placeholder }}
      </label>
    </div>

    <ValidationMessages v-if="validations" :validations="validations" />
  </div>
</template>

<script>
import ValidationMessages from './ValidationMessages.vue'

export default {
  name: 'BaseTextarea',
  components: {
    ValidationMessages
  },
  data () {
    return {
      iconActive: false,
      icon: 'visibility'
    }
  },
  props: {
    type: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    },
    name: {
      type: String,
      required: false,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    autocomplete: {
      type: String,
      required: false,
      default: ''
    },
    focus: {
      type: Boolean,
      required: false,
      default: false
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
  mounted () {
    if (this.focus) {
      this.$refs[this.name].focus()
    }
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

  textarea {
    &:hover,
    &:focus {
      outline: none;
      border-color: $color-puerto-rico;
    }
    resize: none;
    background: inherit;
    min-height: 100px;
  }

  label {
    color: #999;
    position: absolute;
    pointer-events: none;
    left: 0;
    top: 10px;
    transition: 0.2s ease all;
  }

  textarea:focus ~ label,
  textarea:not(.empty) ~ label {
    top: -10px;
    font-size: 14px;
    color: $color-puerto-rico;
  }

  .icon {
    right: 6px;
    top: 10px;
    &:hover,
    &:focus {
      color: $color-hover;
    }
  }
</style>
