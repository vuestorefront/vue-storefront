<template>
  <div class="sort-by">
    <base-select name="sortby" v-model="selected" @change="sort" :options="sortingOptionsForSelect" :initial-option-text="$t('Sort By')" select-class="t-text-sm" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { products } from 'config'
import i18n from '@vue-storefront/i18n'
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
      query: 'category-next/getCurrentSearchQuery'
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
      return products.sortByAttributes
    },
    currentOption () {
      return this.sortingOptions.find(o => o.id === this.selected)
    }
  },
  mounted () {
    const sort = this.query && this.query.sort ? this.query.sort : null
    if (sort && Object.values(this.sortingConfigOptions).includes(sort)) {
      this.selected = sort
    } else {
      const { attribute, order } = products.defaultSortBy
      this.selected = `${attribute}:${order}`
    }
  },
  methods: {
    sort (value) {
      this.$emit('change', this.currentOption)
    }
  }
}
</script>
