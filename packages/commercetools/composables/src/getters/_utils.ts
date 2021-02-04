import { AgnosticAttribute, AgnosticPrice } from '@vue-storefront/core';
import { ProductVariant, ProductPrice, DiscountedProductPriceValue, LineItem } from './../types/GraphQL';
import { DiscountedLineItemPrice } from '../types/GraphQL';

export const getAttributeValue = (attribute) => {
  switch (attribute.attributeDefinition.type.name) {
    case 'text':
    case 'boolean':
    case 'number':
    case 'date':
    case 'time':
    case 'datetime':
      return attribute.value;

    case 'lenum':
    case 'enum':
      return attribute.value.key;

    case 'reference':
      return { typeId: attribute.value.typeId, id: attribute.value.id };

    case 'ltext':
      return attribute.value;

    default:
      return null;
  }
};

export const formatAttributeList = (attributes: Array<any>): AgnosticAttribute[] =>
  attributes.map((attr) => {
    const attrValue = getAttributeValue(attr);
    return {
      name: attr.name,
      value: attrValue,
      label: attr._translated
    };
  });

export const getVariantByAttributes = (products: ProductVariant[] | Readonly<ProductVariant[]>, attributes: any): ProductVariant => {
  if (!products || products.length === 0) {
    return null;
  }

  const configurationKeys = Object.keys(attributes);

  return products.find((product) => {
    const currentAttributes = formatAttributeList(product.attributesRaw);

    return configurationKeys.every((attrName) =>
      currentAttributes.find(({ name, value }) => attrName === name && attributes[attrName] === value)
    );
  });
};

const getPrice = (price: ProductPrice | DiscountedProductPriceValue | DiscountedLineItemPrice) => price ? price.value.centAmount / 100 : null;

const getDiscount = (product: ProductVariant | LineItem) => product.price?.discounted;

const getSpecialPrice = (product: ProductVariant | LineItem) => {
  const discount = getDiscount(product);

  if (product.__typename === 'LineItem') {
    const { discountedPricePerQuantity } = product;
    const discountsLength = discountedPricePerQuantity.length;

    if (discountsLength > 0) {
      return getPrice(discountedPricePerQuantity[discountsLength - 1].discountedPrice);
    }
  }

  if (discount?.discount.isActive) {
    return getPrice(discount);
  }

  return null;
};

export const createPrice = (product: ProductVariant | LineItem): AgnosticPrice => {
  if (!product) {
    return { regular: null, special: null };
  }

  const regularPrice = getPrice(product.price);
  const specialPrice = getSpecialPrice(product);

  return {
    regular: regularPrice,
    special: specialPrice
  };
};
