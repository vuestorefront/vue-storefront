<template>
  <button :type="submit ? 'submit' : 'button'" class="t-flex t-items-center t-rounded-sm t-cursor-pointer t-webkit-tap-transparent" :class="[ { 't-uppercase': !['select', 'tag', 'tag-active'].includes(type) }, sizeClass, colorClass, alignClass ]" :style="customColorStyle" @click="click">
    <material-icon v-if="icon && iconPosition === 'left'" :icon="icon" :icon-set="iconSet" :size="size === 'md' ? size : 'xs'" class="t-align-middle" :class="[{ 't-mr-4': !iconOnly }, iconClass ]" />
    <template v-if="iconOnly">
      <span class="t-sr-only">
        <slot />
      </span>
    </template>
    <template v-else>
      <template v-if="confirm && confirmState === 'unconfirmed'">
        {{ $t('Are you sure?') }}
      </template>
      <template v-else>
        <slot />
      </template>
    </template>
    <material-icon v-if="icon && iconPosition === 'right'" :icon="icon" :icon-set="iconSet" :size="size === 'md' ? size : 'xs'" class="t-align-middle" :class="[{ 't-ml-4': !iconOnly }, iconClass ]" />
  </button>
</template>

<script>
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'

export default {
  name: 'Button',
  components: {
    MaterialIcon
  },
  props: {
    size: {
      type: String,
      default: 'md',
      validation: (value) => {
        return ['md', 'sm', 'xs'].indexOf(value) !== -1
      }
    },
    type: {
      type: String,
      default: 'second',
      validation: (value) => {
        return [
          'primary',
          'second',
          'sale',
          'facebook',
          'tag',
          'tag-active',
          'ghost',
          'ghost-white',
          'ghost-sale',
          'ghost-custom',
          'transparent',
          'transparent-white',
          'transparent-primary',
          'select'
        ].includes(value)
      }
    },
    align: {
      type: [String],
      default: 'center',
      validation: (v) => ['center', 'stretch'].includes(v)
    },
    customColor: {
      type: [String, Boolean],
      default: false
    },
    icon: {
      type: [String, Boolean],
      default: false
    },
    iconSet: {
      type: [String, Boolean],
      default: 'material'
    },
    iconClass: {
      type: [String, Boolean],
      default: false
    },
    iconOnly: {
      type: Boolean,
      default: false
    },
    iconPosition: {
      type: String,
      default: 'right',
      validation: (v) => ['left', 'right'].includes(v)
    },
    submit: {
      type: Boolean,
      default: false
    },
    confirm: {
      type: Boolean,
      default: undefined
    }
  },
  data () {
    return {
      confirmState: false
    }
  },
  computed: {
    sizeClass () {
      let size = 't-h-10 t-px-4 t-text-xs'
      switch (this.size) {
        case 'xs':
          size = 't-h-6 t-px-2 t-text-xxs'
          break
        case 'sm':
          size = 't-h-8 t-px-4 t-text-xs'
      }

      return size
    },
    colorClass () {
      const map = {
        'primary': 't-bg-primary t-text-white',
        'second': 't-bg-base-darkest t-text-white',
        'sale': 't-bg-sale t-text-white',
        'facebook': 't-bg-facebook t-text-white',
        'tag': 't-border t-border-base-light t-bg-white t-text-base-dark hover:t-border-base-dark',
        'tag-active': 't-border t-border-base-dark  t-bg-base-dark t-text-white',
        'ghost': 't-border t-border-base-darkest t-bg-transparent t-text-base-darkest',
        'ghost-white': 't-border t-border-white t-bg-transparent t-text-white',
        'ghost-sale': 't-border t-border-sale t-bg-transparent t-text-sale',
        'ghost-custom': 't-border t-bg-transparent',
        'transparent': 't-bg-transparent',
        'transparent-white': 't-bg-transparent t-text-white',
        'select': 't-border t-border-base-light t-bg-transparent t-text-base-tone t-text-left t-text-sm'
      }

      return map[this.type]
    },
    alignClass () {
      return this.align === 'stretch' || this.type === 'select' ? 't-justify-between' : 't-justify-center'
    },
    customColorStyle () {
      if (this.customColor && this.type === 'ghost-custom') {
        return [
          { color: this.customColor },
          { borderColor: this.customColor }
        ]
      }

      return ''
    }
  },
  methods: {
    click () {
      if (this.confirm) {
        if (!this.confirmState) {
          this.confirmState = 'unconfirmed'
          return
        }

        this.confirmState = false
      }

      this.$emit('click')
    }
  }
}
</script>
