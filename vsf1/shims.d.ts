declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'vue-router' {
  import VueRouter, { RouteConfig } from 'node_modules/vue-router'
  export * from 'node_modules/vue-router'
  export default class extends VueRouter {
    public addRoutes (routes: RouteConfig[], useRouteQueue?: boolean, priority?: number): void;
  }
}
