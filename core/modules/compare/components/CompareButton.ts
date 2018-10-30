export const CompareButton = {
  name: 'CompareButton',
  computed: {
    isEmpty () : boolean {
      return this.$store.getters['compare/isEmpty']
    }
  }
}
