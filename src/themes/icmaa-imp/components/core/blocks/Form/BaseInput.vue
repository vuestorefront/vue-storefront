<template>
  <div class="base-input t-relative t-flex t-flex-wrap">
    <button
      v-if="iconActive"
      type="button"
      class="icon material-icons absolute brdr-none no-outline p0 bg-cl-transparent cl-brdr-secondary pointer"
      @click="togglePassType()"
      :aria-label="$t('Toggle password visibility')"
      :title="$t('Toggle password visibility')"
    >
      {{ icon }}
    </button>
    <input
      class="t-w-full t-h-10 t-px-3 t-border t-rounded-sm t-appearance-none t-leading-tight placeholder:t-text-base-light"
      :class="[ invalid ? 't-border-alert' : 't-border-base-light', { 't-pr-8': type === 'password' } ]"
      :placeholder="placeholder"
      :type="type === 'password' ? passType : type"
      :name="name"
      :id="id"
      :autocomplete="autocomplete"
      :value="value"
      :autofocus="autofocus"
      :ref="name"
      @input="$emit('input', $event.target.value)"
      @blur="$emit('blur')"
      @keyup.enter="$emit('keyup.enter', $event.target.value)"
      @keyup="$emit('keyup', $event)"
    >
    <ValidationMessages v-if="invalid" :validations="validations" :validations-as-tooltip="validationsAsTooltip" />
  </div>
</template>

<script>
import ValidationMessages from './ValidationMessages'

export default {
  name: 'BaseInput',
  components: {
    ValidationMessages
  },
  data () {
    return {
      passType: 'password',
      iconActive: false,
      icon: 'visibility_off'
    }
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
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
  methods: {
    togglePassType () {
      if (this.passType === 'password') {
        this.passType = 'text'
        this.icon = 'visibility'
      } else {
        this.passType = 'password'
        this.icon = 'visibility_off'
      }
    },
    // setFocus sets focus on a field which has a value of 'ref' tag equal to fieldName
    setFocus (fieldName) {
      if (this.name === fieldName) {
        this.$refs[this.name].focus()
      }
    }
  },
  created () {
    if (this.type === 'password') {
      this.iconActive = true
    }
  },
  mounted () {
    if (this.focus) {
      this.$refs[this.name].focus()
    }
  }
}
</script>

<style lang="scss">
.base-input input:focus + .validation-message {
  display: block;
}
</style>
