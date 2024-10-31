
import Vue from 'vue'
import { VueConstructor } from 'vue/types/umd'

declare module 'vue/types/vue' {
  interface Vue {
    $additionalContent: Record<string, VueConstructor<Vue>>;
    _additionalContent?: Record<string, VueConstructor<Vue>>;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    additionalContent?: Record<string, VueConstructor<Vue>>
  }
}