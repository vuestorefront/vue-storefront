import {module} from './store'
import {StorefrontModule} from "core/lib/modules";
import {afterRegistration} from "../google-tag-manager/hooks/afterRegistration";

export const ProCCStore: StorefrontModule = function ({store, router, appConfig}) {

  store.registerModule('procc', module);

  afterRegistration(appConfig, store)
};
