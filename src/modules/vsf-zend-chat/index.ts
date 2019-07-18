import { beforeRegistration } from "./hooks/beforeRegistration";
import {
  VueStorefrontModule,
  VueStorefrontModuleConfig
} from "@vue-storefront/core/lib/module";

export const KEY = "zend-chat";

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  beforeRegistration
};

export const ZendChat = new VueStorefrontModule(moduleConfig);
