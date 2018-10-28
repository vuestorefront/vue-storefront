
export const IsOnCompare = {
  name: 'IsOnCompare',
  computed: {
    isOnCompare () {
      return !!this.$store.state.compare.items.find(p => p.sku === this.product.sku)
    }
  }
}
