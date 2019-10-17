<template>
  <div class="sort-by">
    <base-select name="sortby" v-model="sortBySelect" @change="sort" :options="sortingVariantsForSelect" :initial-option-text="$t('Sort By')" select-class="t-text-sm" />
  </div>
</template>

<script>
import { products } from 'config'
import i18n from '@vue-storefront/i18n'
import { CategorySort } from '@vue-storefront/core/modules/catalog/components/CategorySort'
import BaseSelect from 'theme/components/core/blocks/Form/BaseSelect'

export default {
  mixins: [ CategorySort ],
  components: {
    BaseSelect
  },
  data () {
    return {
      sortBySelect: undefined
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  watch: {
    value: {
      handler () {
        const { attribute, order } = products.defaultSortBy
        const defaultVariant = this.value && this.value.length ? this.value : `${attribute}:${order}`
        this.sortby = this.sortingVariants.find(variant => variant.id === defaultVariant)
        this.sortBySelect = this.sortby.id || this.sortby
      },
      immediate: true
    },
    sortBySelect (v) {
      this.sortby = this.sortingVariants.find(variant => variant.id === v)
    }
  },
  computed: {
    sortingVariantsForSelect () {
      return this.sortingVariants.map(v => { return { label: `${i18n.t('Sort by')} ${i18n.t(v.label)}`, value: v.id } })
    }
  }
}
</script>
