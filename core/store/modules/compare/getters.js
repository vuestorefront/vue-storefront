export default {
  check (state) {
    return {
      isOnCompare: (product) => {
        let item = state.itemsCompare.find(p => p.sku === product.sku)
        return (item !== undefined)
      }
    }
  }
}
