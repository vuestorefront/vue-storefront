import { Category } from '../../types/Category';

export default interface CategoryState {
  categoriesMap: { [id: string]: Category },
  availableFilters: any,
  products: any
}
