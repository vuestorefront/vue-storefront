import { Category } from 'core/modules/catalog-next/types/Category';

declare namespace DataResolver {

  interface CategorySearchOptions {
    parentId?: number,
    filters?: Map<string, string[] | string>,
    level?: number,
    onlyActive?: boolean,
    onlyNotEmpty?: boolean,
    size?: number,
    start?: number,
    sort?: string,
    includeFields?: string[],
    excludeFields?: string[]
  }

  interface CategoryService {
    getCategories: (searchRequest?: CategorySearchOptions) => Promise<Category[]>
  }
}
