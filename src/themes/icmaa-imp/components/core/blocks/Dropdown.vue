<template>
  <div class="t-relative" v-outside="outsideClick">
    <div class="t-cursor-pointer" @click="toggle">
      <slot />
    </div>
    <div class="t-absolute t-top-full t-z-1 t-flex t-flex-wrap t-shadow t-bg-white t-border t-border-base-light t-rounded-sm" :class="[`t-${position}-0`, ...dropdownClassObject]" v-show="open">
      <label v-for="(o, i) in filteredOptions" :key="'option-' + i + '-' + o.value" class="t-flex t-w-full t-border-base-lighter t-px-3 t-py-2 t-text-left t-text-sm t-cursor-pointer hover:t-bg-base-lightest hover:t-text-primary" :class="[{ 't-bg-base-lighter t-text-primary': isCurrent(o.value) }, { 't-border-b': isLast(i) }]">
        {{ o.label }}
        <input type="radio" v-model="value" :name="name" :value="o.value" :selected="o.selected" class="t-hidden" @change="select">
      </label>
    </div>
  </div>
</template>

<script>
import outsideClickMixin from 'theme/mixins/outsideClickMixin'

export default {
  mixins: [ outsideClickMixin ],
  data () {
    return {
      value: this.current,
      open: false
    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    current: {
      type: [String, Number],
      default: ''
    },
    hideSelected: {
      type: Boolean,
      default: true
    },
    dropdownClass: {
      type: [String, Array, Object],
      default: ''
    },
    position: {
      type: String,
      default: 'left',
      validation: (v) => ['left', 'right'].includes(v)
    }
  },
  computed: {
    filteredOptions () {
      const options = this.hideSelected ? this.options.filter(o => !this.isCurrent(o.value)) : this.options
      return options.map(o => {
        o.selected = this.isCurrent(o.value)
        return o
      })
    },
    dropdownClassObject () {
      let v = this.dropdownClass
      if (['string', 'object'].includes(typeof v)) {
        v = [v]
      }

      return v
    }
  },
  methods: {
    toggle () {
      this.open = !this.open
    },
    isCurrent (v) {
      return this.current === v
    },
    select () {
      this.$emit('change', this.value)
      this.open = false
    },
    isLast (i) {
      return i !== this.filteredOptions.length - 1
    },
    outsideClick () {
      this.open = false
    }
  }
}
</script>
