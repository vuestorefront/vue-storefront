<template>
  <div :class="{ 't-relative': validationsAsTooltip }">
    <label v-if="hasLabel" :for="id" class="t-w-full t-flex t-self-center t-mb-1 t-px-1 t-text-base-tone t-text-sm">
      <slot>
        {{ label }}
      </slot>
    </label>
    <div class="base-input t-relative t-flex t-flex-wrap">
      <material-icon :icon="passTypeIcon" v-if="passIconActive" @click.native="togglePassType()" class="t-absolute t-flex t-self-center t-p-2 t-cursor-pointer t-text-base-lighter" :class="[`t-${iconPosition}-0`]" :aria-label="$t('Toggle password visibility')" :title="$t('Toggle password visibility')" />
      <input
        class="t-w-full t-h-10 t-px-3 t-border t-rounded-sm t-appearance-none t-text-sm t-leading-tight placeholder:t-text-base-light"
        :class="[ invalid ? 't-border-alert' : 't-border-base-light', { 't-pr-10': type === 'password' || (icon && iconPosition === 'right'), 't-pl-10': icon && iconPosition === 'left' } ]"
        :placeholder="placeholder"
        :type="type === 'password' ? passType : type"
        :name="name || null"
        :id="id || null"
        :autocomplete="autocomplete"
        :value="value"
        :autofocus="autofocus"
        :disabled="disabled"
        :ref="name"
        v-mask="maskSettings"
        @input="$emit('input', $event.target.value)"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
        @keyup.enter="$emit('keyup.enter', $event.target.value)"
        @keyup="$emit('keyup', $event)"
      >
      <material-icon v-if="icon" :icon="icon" class="t-absolute t-flex t-self-center t-p-2" :class="[`t-${iconPosition}-0`]" />
    </div>
    <ValidationMessages :validations="validations" :validations-as-tooltip="validationsAsTooltip" />
  </div>
</template>

<script>
import ValidationMessages from './ValidationMessages'
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'
import { mask as maskDirective } from 'vue-the-mask'

export default {
  name: 'BaseInput',
  components: {
    MaterialIcon,
    ValidationMessages
  },
  directives: {
    /**
     * This our way to make this directive conditional
     * https://github.com/vuejs-tips/vue-the-mask/issues/54
     */
    'mask': function (e, b) {
      if (!b.value) {
        return
      }
      maskDirective(e, b)
    }
  },
  data () {
    return {
      passType: 'password',
      passTypeIcon: 'visibility_off',
      passIconActive: false
    }
  },
  props: {
    label: {
      type: [String, Boolean],
      default: false
    },
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
      default: false
    },
    disabled: {
      type: Boolean,
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
    },
    mask: {
      type: [String, Object, Boolean],
      default: false
    }
  },
  computed: {
    invalid () {
      return this.validations.filter(v => v.condition).length > 0
    },
    maskSettings () {
      return this.mask === 'date' ? '##.##.####' : this.mask
    },
    hasLabel () {
      return this.$slots.default || this.label
    }
  },
  methods: {
    togglePassType () {
      if (this.passType === 'password') {
        this.passType = 'text'
        this.passTypeIcon = 'visibility'
      } else {
        this.passType = 'password'
        this.passTypeIcon = 'visibility_off'
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
