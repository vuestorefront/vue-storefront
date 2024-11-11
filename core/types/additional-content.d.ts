
import Vue from 'vue'
import { AdditionalContent } from './additional-content.interface';

declare module 'vue/types/vue' {
  interface Vue {
    $additionalContent: AdditionalContent;
    _additionalContent?: AdditionalContent;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    additionalContent?: AdditionalContent
  }
}