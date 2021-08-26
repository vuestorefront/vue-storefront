import { localizedDispatcherRouteName, currentStoreView } from '@vue-storefront/core/lib/multistore';

export const transformProductUrl = (product, urlParams = {}) => {
  const { storeCode, appendStoreCode } = currentStoreView()
  return {
    name: localizedDispatcherRouteName(product.type_id + '-product', storeCode, appendStoreCode),
    params: {
      slug: product.slug,
      parentSku: product.parentSku || product.sku,
      childSku: urlParams['childSku'] ? urlParams['childSku'] : product.sku
    }
  }
}

export const transformCategoryUrl = (category) => {
  const { storeCode, appendStoreCode } = currentStoreView()
  return {
    name: localizedDispatcherRouteName('category', storeCode, appendStoreCode),
    params: {
      slug: category.slug
    }
  }
}

export const transformCmsPageUrl = (cmsPage) => {
  return {
    name: 'cms-page',
    params: {
      slug: cmsPage.identifier
    }
  }
}
