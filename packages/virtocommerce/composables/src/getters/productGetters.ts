import {
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  AgnosticPrice,
  ProductGetters
} from '@vue-storefront/core';
import { Product, ImageType } from '@vue-storefront/virtocommerce-api';
import { formatPrice } from "../utils";
interface ProductVariantFilters {
  master?: boolean;
  attributes?: Record<string, string>;
}

// TODO: Add interfaces for some of the methods in core
// Product

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductName = (product: Product): string => product?.name || 'Product\'s name';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductSlug = (product: Product): string => product.code;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductPrice = (product: Product): AgnosticPrice => {
  
  const regular_price =  product?.price?.list?.amount || 0;
  const special_price = product?.price?.actual?.amount;
  const result = {
    regular : regular_price,
    special: regular_price !== special_price ? special_price : null
  };
  
  return result;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductGallery = (product: Product): AgnosticMediaGalleryItem[] => 
{
  const images = product?.images || [];

  return images.map((image: ImageType) => ({
    small: image.url,
    big: image.url,
    normal: image.url
  }));
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductCoverImage = (product: Product): string => product.imgSrc;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductFiltered = (products: Product[], filters: ProductVariantFilters | any = {}): Product[] => {
  return Array.isArray(products) ? products : [products];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductAttributes = (products: Product[] | Product, filterByAttributeName?: string[]): Record<string, AgnosticAttribute | string> => {
  return {};
};

export const getProductDescription = (product: Product): any => product?.description?.content || '';

export const getProductCategoryIds = (product: Product): string[] => [];

export const getProductId = (product: Product): string => product?.id || '';
//TODO: pass locale and currency as argument
export const getFormattedPrice = (price: number) => formatPrice("en-US", "USD", price);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductTotalReviews = (product: Product): number => 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductAverageRating = (product: Product): number => 0;

const productGetters: ProductGetters<Product, ProductVariantFilters> = {
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
  getFormattedPrice: getFormattedPrice,
  getTotalReviews: getProductTotalReviews,
  getAverageRating: getProductAverageRating
};

export default productGetters;
