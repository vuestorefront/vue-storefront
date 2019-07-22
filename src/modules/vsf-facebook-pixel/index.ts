import { afterRegistration } from "./hooks/afterRegistration";
import {
  VueStorefrontModule,
  VueStorefrontModuleConfig
} from "@vue-storefront/core/lib/module";
import { afterEach } from "./router/afterEach";
import { beforeEach } from "./router/beforeEach";
import { plugin } from "./store/plugin";

// Overriding wishlist

export const KEY = "facebook-pixel";

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  afterRegistration,
  router: { afterEach, beforeEach },
  store: { modules: [], plugin }
};

export const FacebookPixel = new VueStorefrontModule(moduleConfig);
