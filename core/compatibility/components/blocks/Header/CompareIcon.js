import { CompareButton } from '@vue-storefront/core/modules/compare/components/CompareButton.ts'

export default {
  name: 'CompareIcon',
  mixins: [CompareButton],
  computed: {
    isActive () {
      // Computed Property renamed to 'isEmpty'
      return !this.isEmpty
    }
  }
}
