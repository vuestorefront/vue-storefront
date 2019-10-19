<template>
  <ul class="">
    <li v-if="searchable">
      <base-input v-model="filterString" :placeholder="$t('Filter {label}', { label: attributeLabel }) + ' ...'" icon="search" />
    </li>
    <li v-for="(option, index) in filteredOptions" :key="index" class="t-border-b t-border-base-lighter t-px-2 t-py-3">
      <button @click="$emit('change', option)" :aria-label="option.label" class="t-w-full t-text-sm t-flex t-items-center t-justify-between">
        {{ option.label }}
        <material-icon icon="check" class="t-leading-1-rem" v-if="isActiveOption(option)" />
      </button>
    </li>
    <li v-if="filteredOptions.length === 0" class="t-text-base-light t-text-sm t-px-2 t-py-3">
      {{ $t('No results found') }}
    </li>
  </ul>
</template>

<script>
import filterMixin from 'theme/mixins/filterMixin'
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput'

export default {
  name: 'ListSelector',
  data () {
    return {
      filterString: '',
      filteredOptions: this.options
    }
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    attributeKey: {
      type: String,
      default: ''
    },
    attributeLabel: {
      type: String,
      default: ''
    },
    searchable: {
      type: Boolean,
      default: false
    }
  },
  mixins: [ filterMixin ],
  components: {
    BaseInput,
    MaterialIcon
  },
  watch: {
    filterString (s) {
      if (s.length >= 3) {
        const regex = RegExp(s, 'i')
        this.filteredOptions = this.options.filter(f => regex.test(f.label) || this.isActiveOption(f))
      } else {
        this.filteredOptions = this.options
      }
    }
  }
}
</script>
