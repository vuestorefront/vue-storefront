import renderRouteCallback from './renderRouteCallback';
import { CacheControlModuleParams } from './types';

export default function cacheControlModule(params: CacheControlModuleParams): void {
  this.nuxt.hook('render:route', renderRouteCallback(params));
}
