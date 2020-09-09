import { _shopifyCustomClient } from '../../index';
import { ProductSearchParams, ProductsByCollectionSearchParams, Category } from '../../types';

const defaultErrors = [{ message: 'an unknown error has occurred.' }];

const defaultResolver = (path) => {
  const keys = path.split('.');
  return (_ref) => {
    const model = _ref.model;
    const errors = _ref.errors;

    return new Promise((resolve, reject) => {
      try {
        const result = keys.reduce((ref, key) => {
          return ref[key];
        }, model);

        resolve(result);
      } catch (_) {
        if (errors) {
          reject(errors);
        } else {
          reject(defaultErrors);
        }
      }
    });
  };
};

/**
 * Fetch collection by handle with products on the shop.
 *
 * @example
 * collectionByHandleQuery(options).then((collection) => {
 *   // Do something with the collection
 * });
 *
 * @param {collectionByHandleQuery} options contains { handle, products filter query data: first, last, after, etc.. }
 * @return {collectionByHandleQuery} A Query for collection by handle.
 */
const collectionByHandleQuery = (client) => {
  const document = client.document();
  const spreads: any = {};
  const variables: any = {};
  variables.__defaultOperation__ = {};
  variables.__defaultOperation__.handle = client.variable('handle', 'String!');
  variables.__defaultOperation__.first = client.variable('first', 'Int!');
  variables.__defaultOperation__.after = client.variable('after', 'String');
  variables.__defaultOperation__.sortKey = client.variable('sortKey', 'ProductCollectionSortKeys!');
  variables.__defaultOperation__.reverse = client.variable('reverse', 'Boolean!');
  spreads.VariantFragment = document.defineFragment('VariantFragment', 'ProductVariant', (root) => {
    root.add('id');
    root.add('title');
    root.add('price');
    root.add('priceV2', (priceV2) => {
      priceV2.add('amount');
      priceV2.add('currencyCode');
    });
    root.add('presentmentPrices', {
      args: {
        first: 20
      }
    }, (presentmentPrices) => {
      presentmentPrices.add('pageInfo', (pageInfo) => {
        pageInfo.add('hasNextPage');
        pageInfo.add('hasPreviousPage');
      });
      presentmentPrices.add('edges', (edges) => {
        edges.add('node', (node) => {
          node.add('price', (price) => {
            price.add('amount');
            price.add('currencyCode');
          });
          node.add('compareAtPrice', (compareAtPrice) => {
            compareAtPrice.add('amount');
            compareAtPrice.add('currencyCode');
          });
        });
      });
    });
    root.add('weight');
    root.add('availableForSale', {
      alias: 'available'
    });
    root.add('sku');
    root.add('compareAtPrice');
    root.add('compareAtPriceV2', (compareAtPriceV2) => {
      compareAtPriceV2.add('amount');
      compareAtPriceV2.add('currencyCode');
    });
    root.add('image', (image) => {
      image.add('id');
      image.add('originalSrc', {
        alias: 'src'
      });
      image.add('altText');
    });
    root.add('selectedOptions', (selectedOptions) => {
      selectedOptions.add('name');
      selectedOptions.add('value');
    });
    root.add('unitPrice', (unitPrice) => {
      unitPrice.add('amount');
      unitPrice.add('currencyCode');
    });
    root.add('unitPriceMeasurement', (unitPriceMeasurement) => {
      unitPriceMeasurement.add('measuredType');
      unitPriceMeasurement.add('quantityUnit');
      unitPriceMeasurement.add('quantityValue');
      unitPriceMeasurement.add('referenceUnit');
      unitPriceMeasurement.add('referenceValue');
    });
  });
  spreads.ProductFragment = document.defineFragment('ProductFragment', 'Product', (root) => {
    root.add('id');
    root.add('availableForSale');
    root.add('createdAt');
    root.add('updatedAt');
    root.add('descriptionHtml');
    root.add('description');
    root.add('handle');
    root.add('productType');
    root.add('title');
    root.add('vendor');
    root.add('publishedAt');
    root.add('onlineStoreUrl');
    root.add('options', (options) => {
      options.add('name');
      options.add('values');
    });
    root.add('images', {
      args: {
        first: 250
      }
    }, (images) => {
      images.add('pageInfo', (pageInfo) => {
        pageInfo.add('hasNextPage');
        pageInfo.add('hasPreviousPage');
      });
      images.add('edges', (edges) => {
        edges.add('cursor');
        edges.add('node', (node) => {
          node.add('id');
          node.add('src');
          node.add('altText');
        });
      });
    });
    root.add('variants', {
      args: {
        first: 250
      }
    }, (variants) => {
      variants.add('pageInfo', (pageInfo) => {
        pageInfo.add('hasNextPage');
        pageInfo.add('hasPreviousPage');
      });
      variants.add('edges', (edges) => {
        edges.add('cursor');
        edges.add('node', (node) => {
          node.addFragment(spreads.VariantFragment);
        });
      });
    });
  });
  spreads.CollectionFragment = document.defineFragment('CollectionFragment', 'Collection', (root) => {
    root.add('id');
    root.add('handle');
    root.add('description');
    root.add('descriptionHtml');
    root.add('updatedAt');
    root.add('title');
    root.add('image', (image) => {
      image.add('id');
      image.add('originalSrc', {
        alias: 'src'
      });
      image.add('altText');
    });
  });
  spreads.CollectionsProductsFragment = document.defineFragment('CollectionsProductsFragment', 'Collection', (root) => {
    const productArgs: any = {
      first: variables.__defaultOperation__.first,
      sortKey: variables.__defaultOperation__.sortKey,
      reverse: variables.__defaultOperation__.reverse,
      after: variables.__defaultOperation__.after
    };
    root.add('products', {
      args: { ...productArgs }
    }, (products) => {
      products.add('pageInfo', (pageInfo) => {
        pageInfo.add('hasNextPage');
        pageInfo.add('hasPreviousPage');
      });
      products.add('edges', (edges) => {
        edges.add('cursor');
        edges.add('node', (node) => {
          node.addFragment(spreads.ProductFragment);
        });
      });
    });
  });
  document.addQuery([variables.__defaultOperation__.handle, variables.__defaultOperation__.first, variables.__defaultOperation__.sortKey, variables.__defaultOperation__.reverse, variables.__defaultOperation__.after], (root) => {
    root.add('collectionByHandle', {
      args: {
        handle: variables.__defaultOperation__.handle
      }
    }, (collectionByHandle) => {
      collectionByHandle.addFragment(spreads.CollectionFragment);
      collectionByHandle.addFragment(spreads.CollectionsProductsFragment, {
        first: variables.__defaultOperation__.first,
        sortKey: variables.__defaultOperation__.sortKey,
        reverse: variables.__defaultOperation__.reverse,
        after: variables.__defaultOperation__.after
      });
    });
  });
  return document;
};

/**
 * Fetch products by collection handle with pagination & sorting on the shop.
 *
 * @example
 * fetchByCustomQuery(options).then((collection) => {
 *   // Do something with the collection
 * });
 *
 * @param {ProductSearchParams} options contains { handle, products filter query data: first, last, after, etc.. }
 * @return {Promise|Category} A promise resolving with an products `ProductsByCollection`.
 */
async function fetchByCustomQuery(options: ProductsByCollectionSearchParams): Promise<Category> {
  const queryParams: ProductSearchParams = {
    first: 20,
    handle: options.handle,
    reverse: false
  };

  if (options.products?.first) queryParams.first = options.products?.first;
  if (options.products?.after) queryParams.after = options.products?.after;
  if (options.products?.sortKey) queryParams.sortKey = options.products?.sortKey;
  if (options.products?.reverse) queryParams.reverse = options.products?.reverse;

  const collection = await _shopifyCustomClient.graphQLClient.send(collectionByHandleQuery, { ...queryParams })
    .then((response) => {
      let cursor = null;
      const totalFetchProducts = (response?.data?.collectionByHandle?.products?.edges.length - 1);
      if (totalFetchProducts) {
        cursor = response?.data?.collectionByHandle?.products?.edges?.[totalFetchProducts]?.cursor;
        response.model.collectionByHandle.productCursor = cursor;
      }
      return response;
    })
    .then(defaultResolver('collectionByHandle'));
  return collection;
}

export default fetchByCustomQuery;
