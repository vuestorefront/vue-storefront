import { UrlRewrite } from './types/State'
import { ActionTree } from 'vuex'
import config from 'config'
import RootState from '@vue-storefront/core/types/RootState'
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import { processURLAddress } from '@vue-storefront/core/helpers'

export const actions: ActionTree<{}, RootState> = {
  async loadUrlRewrite ({ commit }, { requestPath }): Promise<UrlRewrite | null> {
    const url = processURLAddress(`${config.urlRewrite.endpoint}/redirect?requestPath=${requestPath}`);

    const result = await TaskQueue.execute({
      url,
      payload: {
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors'
      },
      silent: true
    });

    if (result.code === 200) {
      return result.result;
    }

    return null;
  }
}
