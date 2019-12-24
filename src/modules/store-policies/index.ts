import {StorefrontModule} from '@vue-storefront/core/lib/modules'
import {module} from './store'
import {afterRegistration} from "../google-tag-manager/hooks/afterRegistration";

export const StorePolicies: StorefrontModule = function ({store, router, appConfig}) {

  store.registerModule('policies', module);

  afterRegistration(appConfig, store)
};
