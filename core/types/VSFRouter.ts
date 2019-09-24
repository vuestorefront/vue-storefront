import VueRouter, { RouteConfig } from 'vue-router'

export declare class VSFRouter extends VueRouter {
  // replace overload when override will be supported in ts https://github.com/microsoft/TypeScript/issues/2000
  /* eslint no-dupe-class-members: 0 */
  public addRoutes (routes: RouteConfig[]): void;
  public addRoutes (routes: RouteConfig[], useRouteQueue?: boolean, priority?: number): void;
}
