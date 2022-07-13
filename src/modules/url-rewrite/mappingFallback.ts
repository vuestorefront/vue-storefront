import { ActionContext } from 'vuex';
import { LocalizedRoute } from '@vue-storefront/core/lib/types';
import RootState from '@vue-storefront/core/types/RootState';
import { UrlState } from '@vue-storefront/core/modules/url/types/UrlState';
import { AsyncDataLoader } from '@vue-storefront/core/lib/async-data-loader';
import { isServer } from '@vue-storefront/core/helpers';

export const mappingFallbackForUrlRewrite = async (
  { dispatch, rootGetters }: ActionContext<UrlState, RootState>,
  { url }: { url: string }
): Promise<LocalizedRoute | undefined> => {
  if (!url) {
    return;
  }

  url = url.replace(/^[/]+|[/]+$/g, '');

  if (!url) {
    return;
  }

  const urlRewriteForRequestPath = await dispatch('urlRewrite/loadUrlRewrite', { requestPath: url }, { root: true });

  if (!urlRewriteForRequestPath) {
    return;
  }

  const targetPath = urlRewriteForRequestPath.target_path.replace(/^[/]+|[/]+$/g, '');

  if (url === targetPath) {
    return;
  }

  const redirectCode = urlRewriteForRequestPath.rewrite_options === 'RP' ? 301 : 302;

  if (!isServer) {
    return {
      name: `rewrite-${url}`,
      path: `/${targetPath}/`
    };
  }

  AsyncDataLoader.push({
    execute: async ({ context }) => {
      if (context) {
        context.server.response.redirect(redirectCode, '/' + targetPath);
      }
    }
  })
}
