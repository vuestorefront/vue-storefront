declare module '*.vue' {
  import Vue from 'vue'

  interface CombinedVueInstance {
    $emitFilter: any
  }

  export default Vue
}
