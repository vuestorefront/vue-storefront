import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $extendedHead: {
      append: (value: string) => void,
      inject: () => string,
    }
  }
}