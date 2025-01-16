import { Response } from 'express';
import Vue from 'vue';
import { ActionContext } from 'vuex';
import queryString from 'query-string';

import { LocalizedRoute } from '@vue-storefront/core/lib/types';
import RootState from '@vue-storefront/core/types/RootState';
import { UrlState } from '@vue-storefront/core/modules/url/types/UrlState';
import { AsyncDataLoader } from '@vue-storefront/core/lib/async-data-loader';
import { isServer } from '@vue-storefront/core/helpers';
import { Context } from '@vue-storefront/core/scripts/utils/types';

import { getUrlRewriteRouteData } from './helpers/get-url-rewrite-route-data.function';
import { UrlRewrite } from './store/types/url-rewrite.interface';

export const mappingFallbackForUrlRewrite = async (
  { dispatch }: ActionContext<UrlState, RootState>,
  {
    url,
    params,
    ssrContext
  }: {
    url: string,
    params: queryString.ParsedQuery<string>,
    ssrContext?: Context
  }
): Promise<LocalizedRoute | undefined> => {
  if (Vue.prototype.$cacheTags) {
    Vue.prototype.$cacheTags.add(`url_rewrite`);
    Vue.prototype.$cacheTags.add(`url_rewrite_${url}`);
  }

  const urlRewriteForRequestPath: UrlRewrite = await dispatch('urlRewrite/loadUrlRewrite', { requestPath: url }, { root: true });

  if (!urlRewriteForRequestPath) {
    return;
  }

  const targetPath = urlRewriteForRequestPath.targetPath;
  const redirectCode = urlRewriteForRequestPath.redirectCode;

  if (!isServer) {
    return getUrlRewriteRouteData(
      url,
      targetPath,
      queryString.stringify(params)
    );
  }

  let query = queryString.stringify(params);

  if (query) {
    query = `?${query}`;
  }

  const ssrRedirectFullPath = `/${targetPath}/${query}`;

  // serverPrefetch case, AsyncDataLoader is not used
  if (ssrContext) {
    (ssrContext.server.response as Response).redirect(
      redirectCode,
      ssrRedirectFullPath
    );
    return;
  }

  AsyncDataLoader.push({
    execute: async ({ context }) => {
      if (context) {
        context.server.response.redirect(
          redirectCode,
          ssrRedirectFullPath
        );
      }
    }
  })
}
