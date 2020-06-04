import Vue from 'vue';
import { Route } from 'vue-router';
import { Context } from '@vue-storefront/core/scripts/utils/types'

interface AsyncDataParameter {
  store: any,
  route: Route,
  context?: Context
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    asyncData?: ({ store, route, context }: AsyncDataParameter) => Promise<any>
  }
}
