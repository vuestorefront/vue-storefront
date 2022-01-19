import { ActionContext } from 'vuex';
import { LocalizedRoute } from '@vue-storefront/core/lib/types';
import RootState from '@vue-storefront/core/types/RootState';
import { UrlState } from '@vue-storefront/core/modules/url/types/UrlState';

export const mappingFallbackForUrlRewrite = async (
  { dispatch, rootGetters }: ActionContext<UrlState, RootState>,
  { url }: { url: string }
): Promise<LocalizedRoute | undefined> => {
  if (!url) return;

  url = url.replace(/^[/]+|[/]+$/g, '');

  if (!url) {
    return;
  }

  let urlRewriteForRequestPath = rootGetters['urlRewrite/getUrlRewriteForRequestPath'](url);

  if (urlRewriteForRequestPath === undefined) {
    urlRewriteForRequestPath = await dispatch('urlRewrite/loadUrlRewrite', { requestPath: url }, { root: true });
  }

  if (!urlRewriteForRequestPath) {
    return;
  }

  let targetPath = urlRewriteForRequestPath.target_path;

  targetPath = targetPath.replace(/^[/]+|[/]+$/g, '');

  return { name: 'url-rewrite', params: { targetPath: `/${targetPath}` } };
}
