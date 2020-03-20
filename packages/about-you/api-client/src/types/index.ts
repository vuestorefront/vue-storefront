import { BapiCategory } from '@aboutyou/backbone/types/BapiCategory';
import { BapiProduct } from '@aboutyou/backbone/types/BapiProduct';
import { CategoryWith } from '@aboutyou/backbone/types/CategoryWith';
import { ProductWith } from '@aboutyou/backbone/types/ProductWith';
import { Pagination } from '@aboutyou/backbone/endpoints/products/productsByIds';
import { ProductSortConfig } from '@aboutyou/backbone/endpoints/products/products';
import { ProductSearchQuery } from '@aboutyou/backbone/types/ProductSearchQuery';

export interface SetupConfig {
  host: string;
  shopId: number;
}

export type GetCategorySearchParams = { ids?: number[]; path?: string[]; with?: CategoryWith; depth?: number }
export type GetProductSearchParams = { ids?: number[]; with?: ProductWith; where?: ProductSearchQuery; sort?: ProductSortConfig; pagination?: Pagination; masterKey?: string; term?: string };

export {
  BapiCategory,
  BapiProduct,
  CategoryWith,
  ProductWith,
  Pagination,
  ProductSortConfig,
  ProductSearchQuery
};
