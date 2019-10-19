<template>
  <div class="base-input t-relative t-flex t-flex-wrap">
    <material-icon icon="visibility_off" v-if="passIconActive" @click="togglePassType()" class="t-absolute t-flex t-self-center t-p-2 t-cursor-pointer" :class="[`t-${iconPosition}-0`]" :aria-label="$t('Toggle password visibility')" :title="$t('Toggle password visibility')" />
    <input
      class="t-w-full t-h-10 t-px-3 t-border t-rounded-sm t-appearance-none t-text-sm t-leading-tight placeholder:t-text-base-light"
      :class="[ invalid ? 't-border-alert' : 't-border-base-light', { 't-pr-10': type === 'password' || (icon && iconPosition === 'right'), 't-pl-10': icon && iconPosition === 'left' } ]"
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
    <material-icon :icon="icon" v-if="icon" class="t-absolute t-flex t-self-center t-p-2" :class="[`t-${iconPosition}-0`]" />
    <ValidationMessages v-if="invalid" :validations="validations" :validations-as-tooltip="validationsAsTooltip" />
  </div>
</template>

<script>
import ValidationMessages from './ValidationMessages'
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'

export default {
  name: 'BaseInput',
  components: {
    MaterialIcon,
    ValidationMessages
  },
  data () {
    return {
      passType: 'password',
      passIconActive: false
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
    },
    icon: {
      type: [Boolean, String],
      default: false
    },
    iconPosition: {
      type: String,
      default: 'right',
      validations: (v) => ['left', 'right'].includes(v)
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
      this.passIconActive = true
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
