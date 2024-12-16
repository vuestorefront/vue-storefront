import Vue from 'vue'
import { ActionTree } from 'vuex'
import config from 'config'
import RootState from '@vue-storefront/core/types/RootState'
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import { processURLAddress } from '@vue-storefront/core/helpers'
import { UrlRewrite } from './types/url-rewrite.interface'
import { UrlRewriteApiResponse } from './types/url-rewrite-api-response.interface'
import { State } from './types/state.interface'

export const actions: ActionTree<State, RootState> = {
  async loadUrlRewrite ({ state }, { requestPath }): Promise<UrlRewrite | null> {
    if (!requestPath) {
      return null;
    }

    requestPath = requestPath.replace(/^[/]+|[/]+$/g, '');

    if (!requestPath) {
      return null;
    }

    const existingUrlRewrite = state.urlRewrite[requestPath];

    if (existingUrlRewrite) {
      return existingUrlRewrite;
    }

    const url = processURLAddress(`${config.urlRewrite.endpoint}/redirect?requestPath=${requestPath}`);

    const result = await TaskQueue.execute({
      url,
      payload: {
        method: 'GET',
        mode: 'cors'
      },
      silent: true
    });

    if (result.code === 200) {
      const urlRewriteApiResponse: UrlRewriteApiResponse = result.result;

      const targetPath = urlRewriteApiResponse.target_path.replace(/^[/]+|[/]+$/g, '');

      if (requestPath === targetPath) {
        return null;
      }

      const urlRewrite = {
        targetPath,
        redirectCode: urlRewriteApiResponse.rewrite_options === 'RP' ? 301 : 302
      }

      Vue.set(state.urlRewrite, requestPath, urlRewrite);

      return urlRewrite;
    }

    return null;
  }
}
