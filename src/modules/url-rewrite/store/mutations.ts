import { MutationTree } from 'vuex'
import { UrlRewrite, UrlRewriteState } from './types/State'

export const mutations: MutationTree<UrlRewriteState> = {
  setUrlRewriteForRequestPath (
    state: UrlRewriteState,
    { requestPath, urlRewrite }: { requestPath: string, urlRewrite: UrlRewrite | null }
  ) {
    state.urlRewriteForRequestPath[requestPath] = urlRewrite;
  }
}
