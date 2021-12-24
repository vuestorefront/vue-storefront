import { ActionContext } from 'vuex';

import { formatProductLink } from '@vue-storefront/core/modules/url/helpers';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { LocalizedRoute } from '@vue-storefront/core/lib/types';
import RootState from '@vue-storefront/core/types/RootState';
import { UrlState } from '@vue-storefront/core/modules/url/types/UrlState';

export const mappingFallbackForProduct = async (
  { dispatch }: ActionContext<UrlState, RootState>,
  { url }: { url: string }
): Promise<LocalizedRoute | undefined> => {
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

  return formatProductLink(product, currentStoreView().storeCode) as LocalizedRoute;
}
