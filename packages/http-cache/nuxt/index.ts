import renderRouteCallback from './renderRouteCallback';
import { HttpCacheModuleParams } from './types';

export default function httpCacheModule(params: HttpCacheModuleParams): void {
  this.nuxt.hook('render:route', renderRouteCallback(params));
}
