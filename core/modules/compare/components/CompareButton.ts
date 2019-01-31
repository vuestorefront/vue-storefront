import moduleComponentMounted from '@vue-storefront/core/modules/compare/mixins/moduleComponentMounted'

export const CompareButton = {
  name: 'CompareButton',
  mixins: [moduleComponentMounted],
  computed: {
    isEmpty () : boolean {
      return this.$store.getters['compare/isEmpty']
    }
  }
}
