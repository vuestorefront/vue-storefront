import { BapiProduct } from '@aboutyou/backbone';
import {
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  AgnosticPrice,
  ProductGetters
} from '@vue-storefront/core';
import { getSettings } from '@vue-storefront/about-you-api';

type ProductVariantFilters = any

export const getProductMultiAttributeValue = (attributes: any, attributeName: string, attrType = 'fieldSet') => {
  const attributeValues = attributes?.[attributeName]?.values ?? null;
  if (Array.isArray(attributeValues)) {
    const [attrSets] = attributeValues;
    const [[attributeSetValues]] = attrSets[attrType];
    return attributeSetValues.value;
  }
  return attributeValues;
};

export const getProductName = (product: BapiProduct): any => {
  return product?.advancedAttributes ? getProductMultiAttributeValue(product.advancedAttributes, 'productName') : '';
};

export const getProductSlug = (product: BapiProduct): string => {
  return product ? product.id.toString() : '';
};

export const getProductPrice = (product: BapiProduct): AgnosticPrice => {
  const productPrice = product?.priceRange?.max?.withoutTax ?? 0;
  return {
    regular: productPrice,
    special: productPrice
  };
};

export const getProductGallery = (product: BapiProduct): AgnosticMediaGalleryItem[] => {
  return (product ? product.images : []).map(imgObj => ({
    big: `${getSettings().imgUrl}/${imgObj.hash}`,
    normal: '',
    small: ''
  }));
};

export const getProductCoverImage = (product: BapiProduct): string => {
  return product?.images?.[0].hash ? `${getSettings().imgUrl}/${product.images[0].hash}` : null;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductFiltered = (products: BapiProduct[] | BapiProduct, filters: ProductVariantFilters | any = {}): BapiProduct[] => {
  return Array.isArray(products) ? products : [products];
};

export const getProductAttributes = (product: BapiProduct, filterByAttributeName?: string[]): Record<string, AgnosticAttribute | string> => {
  return Object.assign({}, ...(filterByAttributeName ?? []).map(attrName => {
    return { [attrName]: product.attributes?.[attrName] || null };
  }));
};

export const getProductDescription = (product: BapiProduct): string => {
  return product?.advancedAttributes ? getProductMultiAttributeValue(product.advancedAttributes, 'description') : '';
};

export const getProductCategoryIds = (product: BapiProduct) => {
  const categories = (product?.categories ?? []).reduce((prevCategory, currCategory) => prevCategory.concat(currCategory), []);
  const categoryIdsSet = new Set(categories.map(category => category.categoryId.toString()));
  return Array.from(categoryIdsSet);
};

export const getProductId = (product: BapiProduct): string => product.id.toString();

export const getFormattedPrice = (price: number): string => price ? `${price}€` : '';

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
  getMultiAttributeValue: getProductMultiAttributeValue,
  getFormattedPrice
};

export default productGetters;
