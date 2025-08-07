import Vue from 'vue'

interface AdditionalContent { }

declare module 'vue/types/vue' {
  interface Vue {
    $additionalContent: AdditionalContent,
    _additionalContentRoot: Vue,
    _additionalContent?: AdditionalContent
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    additionalContent?: AdditionalContent
  }
}
