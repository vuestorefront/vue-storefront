import { Store } from "vuex"

interface StorefrontModule {(
  app: any,
  store: any,
  router: any,
  config: any,
  appConfig: any
) : void }