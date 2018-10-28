export const CompareButton = {
  name: 'CompareButton',
  computed: {
    compareIsActive () {
      return this.$store.getters['compare/isActive']
    }
  }
}
