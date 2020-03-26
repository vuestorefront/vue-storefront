import {
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  AgnosticPrice,
  ProductGetters
} from '@vue-storefront/interfaces';
import { ProductVariant } from '@vue-storefront/boilerplate-api/src/types';

type ProductVariantFilters = any

// TODO: Add interfaces for some of the methods in core
// Product
export const getProductName = (product: ProductVariant): string => 'product name';

export const getProductSlug = (product: ProductVariant): string => 'product-slug';

export const getProductPrice = (product: ProductVariant): AgnosticPrice => {
  return {
    regular: 0,
    special: 0
  };
};

export const getProductGallery = (product: ProductVariant): AgnosticMediaGalleryItem[] => [];

export const getProductCoverImage = (product: ProductVariant): string => '';

export const getProductFiltered = (products: ProductVariant[], filters: ProductVariantFilters | any = {}): ProductVariant[] => {
  return products;
};

export const getProductAttributes = (products: ProductVariant[] | ProductVariant, filterByAttributeName?: string[]): Record<string, AgnosticAttribute | string> => {
  return {};
};

export const getProductDescription = (product: ProductVariant): any => (product as any)._description;

export const getProductCategoryIds = (product: ProductVariant): string[] => (product as any)._categoriesRef;

export const getProductId = (product: ProductVariant): string => (product as any)._id;

const productGetters: ProductGetters<ProductVariant, ProductVariantFilters> = {
  getName: getProductName,
  getSlug: getProductSlug,
  getPrice: getProductPrice,
  getGallery: getProductGallery,
  getCoverImage: getProductCoverImage,
  getFiltered: getProductFiltered,
  getAttributes: getProductAttributes,
  getDescription: getProductDescription,
  getCategoryIds: getProductCategoryIds,
  getId: getProductId
};

export default productGetters;
