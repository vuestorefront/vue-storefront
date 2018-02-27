export default {
  check (state) {
    return {
      isOnWishlist: (product) => {
        let item = state.itemsWishlist.find(p => p.sku === product.sku)
        return (item !== undefined)
      }
    }
  }
}
