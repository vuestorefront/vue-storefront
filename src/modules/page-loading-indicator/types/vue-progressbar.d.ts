declare module 'vue-progressbar' {
  import { PluginFunction } from 'vue';

  export const install: PluginFunction<{}>;

  interface ProgressMethods {
    start(): void,
    finish(): void,
    fail(): void,
    increase(percent: number): void
  }

  module 'vue/types/vue' {
    interface Vue {
      $Progress: ProgressMethods
    }
  }
}
