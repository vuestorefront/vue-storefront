import { apiClientMethodFactory } from './../../configuration';

async function customerSignOut(): Promise<void> {
  this.$vsf.ct.auth.onTokenRemove();
}

export default apiClientMethodFactory(customerSignOut);
