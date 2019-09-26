<template>
  <div class="base-textarea relative">
    <textarea
      class="t-w-full t-h-40 t-px-3 t-py-2 t-border t-rounded-sm t-appearance-none placeholder:t-text-base-light"
      :class="[ invalid ? 't-border-alert' : 't-border-base-light' ]"
      :placeholder="placeholder"
      :name="name"
      :id="id"
      :autocomplete="autocomplete"
      :value="value"
      :autofocus="autofocus"
      :ref="focus ? name : false"
      @input="$emit('input', $event.target.value)"
      @blur="$emit('blur')"
      @keyup.enter="$emit('keyup.enter', $event.target.value)"
      @keyup="$emit('keyup', $event)"
    />
    <ValidationMessages v-if="invalid" :validations="validations" :validations-as-tooltip="validationsAsTooltip" />
  </div>
</template>

<script>
import ValidationMessages from './ValidationMessages'

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
    value: {
      type: [String, Number],
      default: ''
    },
    id: {
      type: String,
      required: false,
      default: ''
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
    },
    validationsAsTooltip: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    invalid () {
      return this.validations.filter(v => v.condition).length > 0
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
.base-textarea textarea:focus + .validation-message {
  display: block;
}
</style>
