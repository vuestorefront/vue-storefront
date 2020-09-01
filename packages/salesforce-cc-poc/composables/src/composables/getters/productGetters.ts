import {
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  AgnosticPrice,
  ProductGetters,
  AgnosticBreadcrumb
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
  if (product) {
    return {
      regular: product.priceMax || product.price,
      special: product.price
    };
  } else {
    return {
      regular: 0,
      special: 0
    };
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductGallery = (product: Product): AgnosticMediaGalleryItem[] => {
  if (product && product.images) {
    return product.images.map(pi => {
      return {
        big: pi.link,
        small: pi.link,
        normal: pi.link
      };
    }) as AgnosticMediaGalleryItem[];
  } else {
    return [];
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductCoverImage = (product: ProductHit): string => product.image ? product.image.link : '';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductFiltered = (products: Product[], filters: ProductFilters | any = {}): Product[] => {
  const filterValues = filters.attributes;
  if (filterValues && (filterValues.color || filterValues.size)) {
    products.map(product => {
      if (product && product.variationAttributes) {
        product.variationAttributes.map(va => {
          if (va && va.variationAttributeValues) {
            va.variationAttributeValues.map(vav => {
              vav.selected = filterValues[va.variationAttributeType.id] === vav.value;
            });
          }
        });
      }
    });
  }
  return products;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductAttributes = (products: Product[] | Product, filterByAttributeName?: string[]): Record<string, AgnosticAttribute | string> => {
  // if there is only single product passed - aggregate the configuration
  const product = ((products as Product[])?.length) ? products[0] : (products as Product);
  const productAttributes: { category?: any; productId?: any} = {};

  if (product && product.variationAttributes) {
    const aggregateConfiguration = (products as Product).name;
    if (filterByAttributeName && filterByAttributeName.length > 0) {
      product.variationAttributes.map(va => {
        if (va && va.variationAttributeValues) {
          va.variationAttributeValues.map(vav => {
            if (aggregateConfiguration) {
              if (vav.selected) {
                productAttributes[va.variationAttributeType.id] = vav.value;
              }
            } else {
              if (!productAttributes[va.variationAttributeType.id]) {
                productAttributes[va.variationAttributeType.id] = [];
              }
              productAttributes[va.variationAttributeType.id].push({
                label: vav.name,
                value: vav.value,
                name: vav.name,
                selected: vav.selected || false
              });
            }
          });

        }
      });
    } else {
      productAttributes.category = {
        label: 'Category',
        value: product?.primaryCategoryId
      };
      productAttributes.productId = {
        label: 'Product Code',
        value: product?.masterId
      };
    }
  }
  return productAttributes;
};

// TODO: add description to graphql
export const getProductDescription = (product: Product): any => product?.longDescription;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductCategoryIds = (product: Product): string[] => [product?.primaryCategoryId];

export const getProductId = (product: Product | ProductHit): string => ((product as ProductHit)?.productId) || ((product as Product)?.id);

export const getFormattedPrice = (price: number) => `${price} USD`;

export const getBreadcrumbs = (product: Product): AgnosticBreadcrumb[] => {
  if (product) {
    // TODO: add the current category info for the product
    return [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'Category',
        link: '/c/' + product?.primaryCategoryId
      },
      {
        text: product?.name,
        link: '#'
      }
    ];
  } else {
    return [
      {
        text: 'Home',
        link: '/'
      }];
  }
};

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
  getFormattedPrice: getFormattedPrice,
  getBreadcrumbs: getBreadcrumbs
};

export default productGetters;
