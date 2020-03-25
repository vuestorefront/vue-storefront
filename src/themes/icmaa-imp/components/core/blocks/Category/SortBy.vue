<template>
  <div class="sort-by">
    <base-select name="sortby" v-model="selected" @change="sort" :options="sortingOptionsForSelect" :initial-option-text="$t('Sort By')" select-class="t-text-sm" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { products, icmaa_catalog } from 'config'
import i18n from '@vue-storefront/i18n'
import isEmpty from 'lodash-es/isEmpty'

import { CategorySort } from '@vue-storefront/core/modules/catalog/components/CategorySort'
import BaseSelect from 'theme/components/core/blocks/Form/BaseSelect'

export default {
  name: 'SortBy',
  components: {
    BaseSelect
  },
  data () {
    return {
      selected: undefined
    }
  },
  computed: {
    ...mapGetters({
      query: 'category-next/getCurrentSearchQuery',
      category: 'category-next/getCurrentCategory'
    }),
    sortingOptions () {
      let variants = []
      Object.keys(this.sortingConfigOptions).map(label => {
        variants.push({
          label: label,
          id: this.sortingConfigOptions[label],
          type: 'sort'
        })
      })

      return variants
    },
    sortingOptionsForSelect () {
      return this.sortingOptions
        .map(v => ({ label: `${i18n.t('Sort by')} ${i18n.t(v.label)}`, value: v.id }))
    },
    sortingConfigOptions () {
      return Object.assign(products.sortByAttributes, this.customConfigOptions)
    },
    customConfigOptions () {
      /**
       * We could do this the clean way by importing the values of `available_sort_by` and `default_sort_by` of the ES.
       * But as we need this feature for only 3 categories yet we do it using a configuration array.
       * This way we save space in our category payload and state which we would only use in 3 categories.
       */
      const customSortAttr = icmaa_catalog.entities.category.customSortByAttributes
      const customCategory = customSortAttr.find(c => c.id === this.category.id)
      if (customCategory) {
        return { [customCategory.label]: customCategory.sort }
      }

      return {}
    },
    hasCustomConfigOptions () {
      return !isEmpty(this.customConfigOptions)
    },
    currentOption () {
      return this.sortingOptions.find(o => o.id === this.selected)
    }
  },
  mounted () {
    this.initSelected()
  },
  watch: {
    category () {
      this.initSelected()
    }
  },
  methods: {
    initSelected () {
      const sort = this.query && this.query.sort ? this.query.sort : null
      if (sort && Object.values(this.sortingConfigOptions).includes(sort)) {
        this.selected = sort
      } else {
        if (this.hasCustomConfigOptions) {
          this.selected = Object.values(this.customConfigOptions)[0]
        } else {
          const { attribute, order } = products.defaultSortBy
          this.selected = `${attribute}:${order}`
        }
      }
    },
    sort (value) {
      this.$emit('change', this.currentOption)
    }
  }
}
</script>
