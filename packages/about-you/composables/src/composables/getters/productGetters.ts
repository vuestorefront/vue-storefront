import { BapiProduct } from '@aboutyou/backbone';
import {
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  AgnosticPrice,
  ProductGetters
} from '@vue-storefront/core';
import { getSettings } from '@vue-storefront/about-you-api';
import { Attributes } from '@aboutyou/backbone/types/BapiProduct';

type ProductVariantFilters = any

const formatAttributeList = (attributes: Attributes): AgnosticAttribute[] => {
  const result = [];
  for (const key in attributes) {
    result.push({
      name: key,
      value: attributes[key].values,
      label: attributes[key].label
    });
  }

  return result;
};

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
  const productPriceMin = product?.priceRange.min?.withoutTax / 100 || 0;
  const productPriceMax = product?.priceRange.max?.withoutTax / 100 || 0;
  return {
    regular: productPriceMax,
    special: productPriceMax !== productPriceMin ? productPriceMin : null
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

export const getProductAttributes = (products: BapiProduct | BapiProduct[], filterByAttributeName?: string[]): any => {
  const isSingleProduct = !Array.isArray(products);
  const productList = (isSingleProduct ? [products] : products) as BapiProduct[];

  if (!products || productList.length === 0) {
    return {} as any;
  }

  const formatAttributes = (product: BapiProduct): AgnosticAttribute[] =>
    formatAttributeList(product.attributes).filter((attribute) => filterByAttributeName ? filterByAttributeName.includes(attribute.name) : attribute);

  const reduceToUniques = (prev, curr) => {
    const isAttributeExist = prev.some((el) => el.name === curr.name && el.value === curr.value);

    if (!isAttributeExist) {
      return [...prev, curr];
    }

    return prev;
  };

  const reduceByAttributeName = (prev, curr) => ({
    ...prev,
    [curr.name]: isSingleProduct ? curr.value : [
      ...(prev[curr.name] || []),
      {
        value: curr.value,
        label: curr.label
      }
    ]
  });

  return productList
    .map((product) => formatAttributes(product))
    .reduce((prev, curr) => [...prev, ...curr], [])
    .reduce(reduceToUniques, [])
    .reduce(reduceByAttributeName, {});
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

export const getFormattedPrice = (price: number): string => price ? `${price.toFixed(2)}€` : '';

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
