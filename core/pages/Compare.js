import { Compare } from '@vue-storefront/core/modules/compare/components/Compare.ts'

export default {
  name: 'Compare',
  mixins: [Compare],
  computed: {
    all_comparable_attributes () {
      // Computed Property renamed to 'allComparableAttributes'
      return this.allComparableAttributes
    }
  }
}
