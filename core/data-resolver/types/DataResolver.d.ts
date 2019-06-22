import { Category } from "core/modules/catalog-next/types/Category";

declare namespace DataResolver {

  interface CategorySearchOptions {
    parentId?: number,
    filters?: Map<string, Array<string> | string>,
    level?: number,
    onlyActive?: Boolean,
    onlyNotEmpty?: Boolean,
    size?: number,
    start?: number,
    sort?: string,
    includeFields?: Array<string>, 
    excludeFields?: Array<string>
  }

  interface CategoryService {
    getCategories: (searchRequest?: CategorySearchOptions) => Promise<Array<Category>>
  }
}