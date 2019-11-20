import VueRouter from 'vue-router/types/router';
import { RouteConfig } from 'vue-router';

declare module '*.vue' {
  import Vue from 'vue'

  interface CombinedVueInstance {
    $emitFilter: any
  }

  export default Vue
}

declare module 'vue-router' {

  export * from 'vue-router'
  export default class extends VueRouter {
    public addRoutes (routes: RouteConfig[], useRouteQueue?: boolean, priority?: number): void;
  }
}
