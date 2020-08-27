import {
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  AgnosticPrice,
  ProductGetters
} from '@vue-storefront/core';
import { Product, ProductHit } from '@vue-storefront/salesforce-cc-poc-api/src/types';

type ProductFilters = any

// TODO: Add interfaces for some of the methods in core
// Product

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductName = (product: Product | ProductHit): string => (product as ProductHit)?.productName || (product as Product)?.name || 'Product\'s name';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductSlug = (product: Product | ProductHit): string => (product as ProductHit).productId || (product as Product).id;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductPrice = (product: Product): AgnosticPrice => {
  return {
    regular: product?.prices?.list || 0,
    special: product?.prices?.sale || 0
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductGallery = (product: Product): AgnosticMediaGalleryItem[] => {
  return product.images.map(pi => {
    return {
      big: pi.link,
      small: pi.link,
      normal: pi.link
    };
  }) as AgnosticMediaGalleryItem[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductCoverImage = (product: ProductHit): string => product.image ? product.image.link : '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductFiltered = (products: Product[], filters: ProductFilters | any = {}): Product[] => {
  return products;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductAttributes = (products: Product[] | Product, filterByAttributeName?: string[]): Record<string, AgnosticAttribute | string> => {
  // TODO: (products as Product).variationAttributes
  return {};
};

// TODO: add description to graphql
export const getProductDescription = (product: Product): any => product.longDescription;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductCategoryIds = (product: Product): string[] => [product?.primaryCategoryId];

export const getProductId = (product: Product): string => (product as any).productId;

export const getFormattedPrice = (price: number) => String(price);

const productGetters: ProductGetters<Product | ProductHit, ProductFilters> = {
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
  getFormattedPrice: getFormattedPrice
};

export default productGetters;
