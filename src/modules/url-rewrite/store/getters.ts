import { UrlRewrite, UrlRewriteState } from './types/State';
import { GetterTree } from 'vuex';

export const getters: GetterTree<UrlRewriteState, any> = {
  getUrlRewriteForRequestPath: (state: UrlRewriteState, getters: any) => (requestPath: string): UrlRewrite | null | undefined => {
    return state.urlRewriteForRequestPath[requestPath];
  }
}
