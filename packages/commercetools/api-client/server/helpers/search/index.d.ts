import { CategoryWhereSearch, ProductWhereSearch, OrderWhereSearch } from './../../types/Api';
import { Config } from './../../types/setup';
declare const buildProductWhere: (settings: Config, search: ProductWhereSearch) => string;
declare const buildCategoryWhere: (settings: Config, search: CategoryWhereSearch) => string;
declare const buildOrderWhere: (search: OrderWhereSearch) => string;
export { buildProductWhere, buildCategoryWhere, buildOrderWhere };
