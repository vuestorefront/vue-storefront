import {
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  AgnosticPrice,
  ProductGetters
} from '@vue-storefront/core';
import { ProductVariant } from '@vue-storefront/shopify-api/src/types';

type ProductVariantFilters = any

// TODO: Add interfaces for some of the methods in core
// Product

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductName = (product: ProductVariant): string => {
  if ((product as any)) {
    return (product as any).title;
  }
  return '';
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductSlug = (product: ProductVariant): string => {
  if ((product as any)) {
    return (product as any).handle;
  }
  return '';
};

export const selectedVariant = (product: ProductVariant): any => {
  let defaultVariant = product;
  if (product && (product.variants && product.variants.length > 0)) {
    defaultVariant = product.variants[0];
    // defaultVariant.
  }
  return defaultVariant;
};

export const checkSpecialPrice = (product: ProductVariant): boolean => {
  const defaultVariant = selectedVariant(product);
  if (defaultVariant.compareAtPrice !== '0.00') {
    return true;
  }
  return false;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductPrice = (product: ProductVariant): AgnosticPrice => {
  const defaultVariant = selectedVariant(product);
  let productPrice = {
    regular: defaultVariant.price,
    special: 0
  };
  const hasSpecialPrice = checkSpecialPrice(product);
  if (hasSpecialPrice) productPrice = { regular: defaultVariant.compareAtPrice, special: defaultVariant.price };

  return productPrice;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductGallery = (product: ProductVariant): AgnosticMediaGalleryItem[] =>
  (product ? product.images : [])
    .map((image) => ({
      // alt: 'Product A',
      // mobile: { url: image.src },
      // desktop: { url: image.src },
      // zoom: { url: image.src }
      small: image.src,
      big: image.src,
      normal: image.src
    }));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductCoverImage = (product: ProductVariant): string => {
  return product?.images?.[0].src ? product.images[0].src : null;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductFiltered = (products: ProductVariant[] | ProductVariant, filters: ProductVariantFilters | any = {}): ProductVariant[] => {
  if (!products) {
    return [];
  }
  if (filters.attributes && Object.keys(filters.attributes).length > 0) {
    // const currentProduct = typeof products === 'object' ? products : products[0];
    // return [];
  }
  if (filters.master) {
    return Array.isArray(products) ? products : [products];
  }
  return Array.isArray(products) ? products : [products];
};

const fetchPVariantObject = (params: any) => {
  const returnJson = {};
  params.map(({name, value}) => returnJson[name.toLowerCase()] = value);
  return returnJson;
};

const compareJson = (obj1: any, obj2: any) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

const fetchVariant = (product: ProductVariant, filterByAttributeName?: string[]): ProductVariant | any => {
  const productVariants = product?.variants;
  if (productVariants) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const selectedVariant = productVariants.find((pVariant) => {
      const currentAttributeObj = fetchPVariantObject(pVariant.selectedOptions);
      if (compareJson(currentAttributeObj, filterByAttributeName)) {
        return pVariant;
      }
    });
    return selectedVariant;
  }
  return {};
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductAttributes = (product: ProductVariant, filterByAttributeName?: string[]): Record<string, AgnosticAttribute | string> => {
  // Fetch all attributes
  let selectedOption = {};
  if (product && product.variants && typeof product.variants[0] !== undefined && !filterByAttributeName) {
    // Get selected options
    product.variants[0].selectedOptions.map((pOption) => {
      selectedOption[`${pOption.name.toLowerCase()}`] = `${pOption.value}`;
    });
  } else {
    // Fetch the new variant of the product
    const selectedVariant = fetchVariant(product, filterByAttributeName);
    if (selectedVariant) {
      product.selectedVariant = fetchVariant(product, filterByAttributeName);
      selectedOption = fetchPVariantObject(selectedVariant.selectedOptions);
    } else {
      product.variants[0].selectedOptions.map((pOption) => {
        selectedOption[`${pOption.name.toLowerCase()}`] = `${pOption.value}`;
      });
    }
  }
  return selectedOption;
};

export const getProductOptions = (product: ProductVariant): Record<string, AgnosticAttribute | string> => {
  const productOptions = (product as any).options;
  return productOptions;
};

export const getProductDescription = (product: ProductVariant, isWantHtml?: boolean): any => {
  if (isWantHtml) (product as any).descriptionHtml;
  return (product as any).description;
};

export const getProductCategoryIds = (product: ProductVariant): string[] => [(product as any).id];

export const getProductId = (product: ProductVariant): string => (product as any).id;

export const getFormattedPrice = (price: number): string => price ? `$ ${price}` : '';

export const getProductStatus = (product: ProductVariant): boolean => {
  if (product && (product.availableForSale || product.available)) {
    return true;
  }
  return false;
};

export const checkForWishlist = (product: ProductVariant): boolean => (product as any).isOnWishlist ?? false;

export const getBreadcrumbs = (product: ProductVariant): any => {
  const breadCrumbs = [
    {
      text: 'Home',
      route: {
        link: '/'
      }
    }
  ];
  if (product && product.productType) {
    breadCrumbs.push({
      text: product.productType,
      route: {
        link: '#'
      }
    });
  }
  if (product && product.title) {
    breadCrumbs.push({
      text: getProductName(product),
      route: {
        link: '#'
      }
    });
  }
  return breadCrumbs;
};

const productGetters: ProductGetters<ProductVariant, ProductVariantFilters> = {
  getName: getProductName,
  getSlug: getProductSlug,
  getPrice: getProductPrice,
  getGallery: getProductGallery,
  getCoverImage: getProductCoverImage,
  getFiltered: getProductFiltered,
  getAttributes: getProductAttributes,
  getOptions: getProductOptions,
  getDescription: getProductDescription,
  getCategoryIds: getProductCategoryIds,
  getId: getProductId,
  getFormattedPrice: getFormattedPrice,
  getStatus: getProductStatus,
  hasSpecialPrice: checkSpecialPrice,
  isOnWishlist: checkForWishlist,
  getBreadcrumbs: getBreadcrumbs
};

export default productGetters;
