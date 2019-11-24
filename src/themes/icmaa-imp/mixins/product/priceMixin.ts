export default {
  computed: {
    hasMultiplePrices () {
      const product = this.originalProduct || this.product
      if (product.type_id === 'configurable' &&
        product.configurable_children &&
        product.configurable_children.length > 0
      ) {
        let price = 0
        return product.configurable_children.find(c => {
          if (!(c.stock.is_in_stock && c.stock.qty > 0)) {
            return false
          }

          if (price === 0) {
            price = c.price
            return false
          }
          return c.price !== price
        })
      }
      return false
    }
  }
}
