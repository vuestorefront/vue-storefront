/* istanbul ignore file */

import {
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  AgnosticPrice,
  ProductGetters
} from '@vue-storefront/core';
import { BapiProduct } from '@aboutyou/backbone';

type ProductVariantFilters = any

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductName = (product: BapiProduct): string => 'product-name';

// platform doesn't seem to support slugs
export const getProductSlug = (product: BapiProduct): string => product.id.toString();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductPrice = (product: BapiProduct): AgnosticPrice => {
  return {
    regular: 0,
    special: 0
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductGallery = (product: BapiProduct): AgnosticMediaGalleryItem[] => [];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductCoverImage = (product: BapiProduct): string => '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductFiltered = (products: BapiProduct[], filters: ProductVariantFilters | any = {}): BapiProduct[] => {
  return products;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductAttributes = (products: BapiProduct[] | BapiProduct, filterByAttributeName?: string[]): Record<string, AgnosticAttribute | string> => {
  return {};
};

export const getProductDescription = (product: BapiProduct): any => (product as any)._description;

export const getProductCategoryIds = (product: BapiProduct): string[] => (product as any)._categoriesRef;

export const getProductId = (product: BapiProduct): string => product.id.toString();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getFormattedPrice = (price: number) => String(price);

const productGetters: ProductGetters<BapiProduct, ProductVariantFilters> = {
  getName: getProductName,
  getSlug: getProductSlug,
  getPrice: getProductPrice,
  getGallery: getProductGallery,
  getCoverImage: getProductCoverImage,
  getFiltered: getProductFiltered,
  getAttributes: getProductAttributes,
  getDescription: getProductDescription,
  getCategoryIds: getProductCategoryIds,
  getId: getProductId,
  getFormattedPrice
};

export default productGetters;
