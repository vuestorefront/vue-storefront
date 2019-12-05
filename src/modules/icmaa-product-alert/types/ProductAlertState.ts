import Product from '@vue-storefront/core/modules/catalog/types/Product'

export default interface ProductAlert {
  stock: string[],
  product: Product[]
}
