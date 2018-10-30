export const CompareButton = {
  name: 'CompareButton',
  computed: {
    compareIsActive () : boolean {
      return this.$store.getters['compare/isActive']
    }
  }
}
