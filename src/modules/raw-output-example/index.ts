import { routes } from './router/routes'
import { StorefrontModule } from '@vue-storefront/module';

export const RawOutputExampleModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  router.addRoutes(routes);
}
