<template>
  <div>
    <label :for="id" class="t-flex t-items-center t-cursor-pointer">
      <input
        class="t-hidden"
        type="checkbox"
        :id="id"
        :checked="value === true"
        @keyup.enter="$emit('click')"
        @click="$emit('click')"
        @blur="$emit('blur')"
        @change="$emit('change', $event.target.checked)"
        :disabled="disabled"
        :value="value"
      >
      <div
        class="t-flex t-flex-fix t-items-center t-justify-center t-h-6 t-w-6 t-my-2 t-mr-2 t-bg-white t-border t-rounded-sm t-appearance-none t-text-sm t-leading-tight"
        :class="[ invalid ? 't-border-alert' : 't-border-base-light', { 't-opacity-75': disabled } ]"
      >
        <material-icon icon="check" size="sm" v-if="value" />
      </div>
      <div class="checkbox-label t-text-sm t-leading-tight" :class="{ 't-text-alert': invalid }">
        <slot />
      </div>
    </label>
    <ValidationMessages v-if="showValidationMessage" :validations="validations" />
  </div>
</template>

<script>
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'
import ValidationMessages from 'theme/components/core/blocks/Form/ValidationMessages.vue'

export default {
  name: 'BaseCheckbox',
  components: {
    MaterialIcon,
    ValidationMessages
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    id: {
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      default: false
    },
    validations: {
      type: Array,
      default: () => []
    },
    showValidationMessage: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    invalid () {
      return this.validations.filter(v => v.condition).length > 0
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-primary: color(base-dark);

.checkbox-label {
  >>> a {
    color: $color-primary;
    text-decoration: underline;
  }
}
</style>
