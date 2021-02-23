import { ApolloQueryResult } from 'apollo-client';
import { Context } from '@vue-storefront/core';
import { ProductQueryResult } from './../../types/GraphQL';

interface ProductData {
  products: ProductQueryResult;
}

const getTranslated = (rawAttribute, context) => {
  const { locale } = context.$ct.config;
  if (rawAttribute.attributeDefinition.type.name === 'ltext') {
    return rawAttribute.value[locale];
  }

  if (rawAttribute.attributeDefinition.type.name === 'lenum') {
    return rawAttribute.value.label[locale];
  }

  return rawAttribute.value;
};

const enhanceProduct = (productResponse: ApolloQueryResult<ProductData>, context: Context): ApolloQueryResult<ProductData> => {
  (productResponse.data as any)._variants = productResponse.data.products.results
    .map((product) => {
      const current = product.masterData.current;

      return current.allVariants.map((variant) => ({
        ...variant,
        attributesRaw: variant.attributesRaw.map((raw) => ({
          ...raw,
          _translated: getTranslated(raw, context)
        })),
        _name: current.name,
        _slug: current.slug,
        _id: product.id,
        _master: current.masterVariant.id === variant.id,
        _description: current.description,
        _categoriesRef: current.categoriesRef.map((cr) => cr.id),
        _rating: (product as any).reviewRatingStatistics
      }));
    })
    .reduce((prev, curr) => [...prev, ...curr], []);

  return productResponse;
};

export default enhanceProduct;
