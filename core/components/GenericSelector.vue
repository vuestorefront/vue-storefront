<template>
  <button
    :class="{'active': active, 'p0': true, 'bg-cl-primary': true, 'brdr-1': true, 'brdr-cl-primary': true, 'brdr-square': true, 'h5': true, 'cl-tertiary': true, 'generic-selector': true}"
    @click="switchFilter(id, label)"
    :aria-label="$t('Select ' + label)"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'GenericSelector',
  props: {
    label: {
      type: null,
      required: false,
      default: () => false
    },
    id: {
      type: null,
      required: false,
      default: () => false
    },
    code: {
      type: null,
      required: false,
      default: () => false
    },
    context: {
      type: null,
      required: false,
      default: () => false
    }
  },
  data () {
    return {
      active: false
    }
  },
  beforeDestroy () {
    this.$bus.$off('filter-reset', this.filterReset)
    this.$bus.$off('filter-changed-' + this.context)
  },
  beforeMount () {
    this.$bus.$on('filter-reset', this.filterReset)
    this.$bus.$on('filter-changed-' + this.context, this.filterChanged)
  },
  methods: {
    filterChanged (filterOption) {
      if (filterOption.attribute_code === this.code) {
        if (filterOption.id === this.id) {
          if (this.active) {
            this.active = false
          } else {
            this.active = true
          }
        } else {
          this.active = false
        }
        // filterOption.id === this.id ? this.active = true : this.active = false
      }
    },
    filterReset (filterOption) {
      this.active = false
    },
    switchFilter (id, label) {
      this.$bus.$emit('filter-changed-' + this.context, { attribute_code: this.code, id: id, label: label })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-active: color(secondary);
  $color-disabled: color(secondary, $colors-border);

  .generic-selector {
    height: 40px;
    padding-left: 8px;
    padding-right: 8px;

    &:hover,
    &:focus {
      border-width: 2px;
    }

    &.active {
      border-color: $color-active;
      border-width: 2px;
      color: $color-active;
    }

    &:disabled {
      border-color: $color-disabled;
      color: $color-disabled;
      cursor: not-allowed;

      &:hover,
      &:after {
        border-width: 1px;
      }
    }
  }
</style>
