import ProductNameHelper from '../helpers/productName'

export default {
  computed: {
    translatedProductName () {
      return new ProductNameHelper(this.product.name).translatedName
    }
  }
}
