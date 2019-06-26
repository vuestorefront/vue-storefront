import { Category } from '../../types/Category';
import Product from 'core/modules/catalog/types/Product';

export default interface CategoryState {
  categoriesMap: { [id: string]: Category },
  availableFilters: any,
  products: Product[],
  searchProductsStats: any,
  /**
   * TODO: need to have better name for this
   *
   * Allows to easily get all ids in hierarchy of parent categories.
   * example of map:
   * [
   *   [2],
   *   [2, 20],
   *   [2, 20, 33],
   *   [2, 22]
   * ]
   */
  categoriesHierarchyMap: number[][]
}
