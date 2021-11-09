import { ProductGetters, AgnosticMediaGalleryItem, AgnosticAttribute, AgnosticPrice } from '@vue-storefront/core';
import { ProductVariant, Image } from '@vue-storefront/commercetools-api';
import { formatAttributeList, getVariantByAttributes, createPrice } from './_utils';

export interface ProductVariantFilters {
  master?: boolean;
  attributes?: Record<string, string>;
}

export const getProductName = (product: ProductVariant | Readonly<ProductVariant>): string => (product as any)?._name || '';

export const getProductSlug = (product: ProductVariant | Readonly<ProductVariant>): string => (product as any)?._slug || '';

export const getProductPrice = (product: ProductVariant | Readonly<ProductVariant>): AgnosticPrice => createPrice(product);

export const getProductGallery = (product: ProductVariant): AgnosticMediaGalleryItem[] => {
  const images = product?.images || [];

  return images.map((image: Image) => ({
    small: image.url,
    big: image.url,
    normal: image.url
  }));
};

export const getProductCoverImage = (product: ProductVariant): string => product?.images?.[0]?.url || '';

export const getProductFiltered = (products: ProductVariant[], filters: ProductVariantFilters | any = {}): ProductVariant[] => {
  if (!products) {
    return [];
  }

  if (filters.attributes && Object.keys(filters.attributes).length > 0) {
    return [getVariantByAttributes(products, filters.attributes)];
  }

  if (filters.master) {
    return products.filter((product) => (product as any)._master);
  }

  return products;
};

export const getProductAttributes = (products: ProductVariant[] | ProductVariant, filterByAttributeName?: string[]): Record<string, AgnosticAttribute | string> => {
  const isSingleProduct = !Array.isArray(products);
  const productList = (isSingleProduct ? [products] : products) as ProductVariant[];

  if (!products || productList.length === 0) {
    return {} as any;
  }

  const formatAttributes = (product: ProductVariant): AgnosticAttribute[] =>
    formatAttributeList(product.attributesRaw).filter((attribute) => filterByAttributeName ? filterByAttributeName.includes(attribute.name) : attribute);

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

export const getProductDescription = (product: ProductVariant): any => (product as any)?._description || '';

export const getProductCategoryIds = (product: ProductVariant): string[] => (product as any)?._categoriesRef || '';

export const getProductId = (product: ProductVariant): string => (product as any)?._id || '';

export const getFormattedPrice = (price: number) => price as any as string;

export const getTotalReviews = (product: ProductVariant): number => (product as any)?._rating?.count || 0;

export const getAverageRating = (product: ProductVariant): number => (product as any)?._rating?.averageRating || 0;

export const getProductSku = (product: ProductVariant): any => (product as any)?.sku || '';

/**
 * @remarks References:
 * {@link @vue-storefront/commercetools-api#ProductVariant}, {@link ProductVariantFilters}
 */
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
  getId: getProductId,
  getSku: getProductSku,
  getFormattedPrice,
  getTotalReviews,
  getAverageRating
};

export default productGetters;
