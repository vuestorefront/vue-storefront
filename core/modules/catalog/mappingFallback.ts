import { formatProductLink } from '@vue-storefront/core/modules/url/helpers';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { LocalizedRoute } from '@vue-storefront/core/lib/types';

export const mappingFallbackForProduct = async ({ dispatch }, { url }: { url: string }): Promise<LocalizedRoute | undefined> => {
  if (!url) return;

  if (url.startsWith('/')) {
    url = url.substring(1);
  }

  url = url.replace(/\/?(\?.*)?$/, '');

  if (!url) {
    return;
  }

  const product = await dispatch('product/single', {
    options: {
      url_key: url
    },
    key: 'url_key'
  },
  {
    root: true
  });

  if (!product) return;

  const isConfigurable = product.type_id === 'configurable';

  const params: {
    parentSku: string,
    slug: string,
    childSku?: string
  } = {
    parentSku: product.sku,
    slug: product.slug
  }

  if (isConfigurable) {
    params.childSku = product.configurable_children[0].sku;
  }

  return formatProductLink(product, currentStoreView().storeCode) as LocalizedRoute;
}
